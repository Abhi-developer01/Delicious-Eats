import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Create a test email account dynamically
async function createTestAccount() {
  try {
    // Generate test SMTP service account
    const testAccount = await nodemailer.createTestAccount();
    console.log('Created Ethereal test account:', testAccount.user);
    
    // Create reusable transporter with Ethereal credentials
    return nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    console.error('Error creating test account:', error);
    throw error;
  }
}

// Configure email transport
const getEmailTransporter = async (forceReal = false) => {
  // Check if we have real email credentials
  const hasRealConfig = process.env.EMAIL_SERVER && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;
  
  // If we don't have real credentials and aren't forcing real, use Ethereal
  if (!hasRealConfig && !forceReal) {
    console.log('Using Ethereal test email account - emails will not be delivered to actual recipients');
    return { 
      transporter: await createTestAccount(),
      isTest: true
    };
  }

  // If forcing real emails but no config, throw error
  if (forceReal && !hasRealConfig) {
    throw new Error('Real email delivery requested but email configuration is missing. Please check your .env.local file');
  }

  // Log the email configuration for debugging
  console.log('Email configuration:', {
    host: process.env.EMAIL_SERVER,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
  });

  try {
    // Use configured email credentials
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Only enable debug if specifically requested
      debug: process.env.EMAIL_DEBUG === 'true'
    });

    // Verify connection configuration
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection successful');
    
    return { 
      transporter, 
      isTest: false 
    };
  } catch (error) {
    console.error('Error setting up email transporter:', error);
    
    // If we're forcing real emails, rethrow the error
    if (forceReal) {
      throw error;
    }
    
    // Otherwise, fall back to Ethereal
    console.log('Email configuration failed, falling back to Ethereal test account');
    return { 
      transporter: await createTestAccount(),
      isTest: true
    };
  }
};

export async function POST(request: Request) {
  try {
    const { title, message, link, testMode = false, testEmail, forceRealEmail = false } = await request.json();
    
    console.log(`Processing email notification: Title=${title}, Test Mode=${testMode}, Force Real Email=${forceRealEmail}`);

    // Validate required fields
    if (!title || !message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Title and message are required',
      }, { status: 400 });
    }

    // Set up email transporter
    let transportInfo;
    try {
      transportInfo = await getEmailTransporter(forceRealEmail);
    } catch (error) {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to setup email transport: ' + (error instanceof Error ? error.message : 'Unknown error'),
        suggestion: 'Check your email credentials in .env.local'
      }, { status: 500 });
    }
    
    const { transporter, isTest } = transportInfo;

    // If test mode and test email provided, only send to test email
    if (testEmail) {
      console.log(`${testMode ? 'Test mode' : 'Order confirmation'}: Sending ${isTest ? 'test' : 'real'} email to: ${testEmail}`);
      
      try {
        const info = await transporter.sendMail({
          from: process.env.EMAIL_FROM || '"Food Ordering App" <test@example.com>',
          to: testEmail,
          subject: title,
          text: message,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f97316;">${title}</h2>
              <div style="font-size: 16px; line-height: 1.5;">${message}</div>
              ${link ? `<p><a href="${link}" style="background-color: #f97316; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 15px;">View Details</a></p>` : ''}
              <p style="color: #777; font-size: 12px; margin-top: 20px;">${testMode ? 'This is a test notification from the Food Ordering app.' : 'Thank you for ordering with Food Ordering app.'}</p>
            </div>
          `,
        });
        
        console.log('Email sent:', info.messageId);
        
        const response: any = { 
          success: true, 
          message: `${testMode ? 'Test email' : 'Order confirmation email'} ${isTest ? 'generated' : 'sent'} successfully`,
          testEmailTo: testEmail,
          messageId: info.messageId,
          isTest
        };
        
        // Add preview URL only for test emails
        if (isTest) {
          const previewUrl = nodemailer.getTestMessageUrl(info);
          console.log('Preview URL:', previewUrl);
          response.previewUrl = previewUrl;
        }
        
        return NextResponse.json(response);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        return NextResponse.json({ 
          success: false, 
          message: 'Error sending email: ' + (emailError instanceof Error ? emailError.message : 'Unknown error'),
          suggestion: isTest 
            ? "Using Ethereal for testing, check preview link"
            : "Check your email configuration and credentials"
        }, { status: 500 });
      }
    }

    // If not in test mode, get all users from the database
    console.log('Fetching users from Supabase...');
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .filter('email', 'not.is', null);

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return NextResponse.json({ 
        success: false, 
        message: 'Error fetching users from database: ' + usersError.message,
      }, { status: 500 });
    }

    console.log(`Fetched ${users.length} users with emails from Supabase`);

    // If no users with emails
    if (users.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No recipients with valid email addresses found',
        userCount: 0
      });
    }

    // If we're in test mode and using Ethereal, we should not attempt to send to all users
    if (isTest && !testMode) {
      return NextResponse.json({ 
        success: false, 
        message: 'Cannot send real emails to all users when using test transport.',
        suggestion: 'Configure email credentials in .env.local or use test mode with a single test email'
      }, { status: 400 });
    }

    // Send emails to all users
    const emailPromises = users.map(async (user) => {
      if (!user.email) return null;
      
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Food Ordering App" <notifications@foodapp.com>',
        to: user.email,
        subject: title,
        text: message,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f97316;">${title}</h2>
            <p style="font-size: 16px; line-height: 1.5;">${message}</p>
            ${link ? `<p><a href="${link}" style="background-color: #f97316; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 15px;">View Details</a></p>` : ''}
            <p style="color: #777; font-size: 12px; margin-top: 20px;">You are receiving this email because you are registered with the Food Ordering app.</p>
          </div>
        `,
      });
      
      return {
        userId: user.id,
        email: user.email,
        messageId: info.messageId
      };
    });
    
    try {
      const emailResults = await Promise.all(emailPromises);
      const sentCount = emailResults.filter(result => result !== null).length;
      
      console.log(`Successfully sent ${sentCount} emails`);
      
      return NextResponse.json({ 
        success: true, 
        message: `Email notifications ${isTest ? 'generated' : 'sent'} successfully`,
        userCount: sentCount,
        isTest
      });
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      return NextResponse.json({ 
        success: false, 
        message: 'Error sending email notifications: ' + (emailError instanceof Error ? emailError.message : 'Unknown error'),
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in email notifications API:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error processing email notification request: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
} 