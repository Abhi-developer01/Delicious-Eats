import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // Build query
    let query = supabase
      .from('notifications')
      .select('*')
      .order('sent_at', { ascending: false })
      .limit(limit)
    
    // Filter by user_id if provided, include broadcast notifications (user_id is null)
    if (userId) {
      query = query.or(`user_id.eq.${userId},user_id.is.null`)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching notifications:', error)
      return NextResponse.json({ 
        success: false, 
        message: 'Error fetching notifications: ' + error.message 
      }, { status: 500 })
    }
    
    // Transform response to include a 'read' property based on read_at
    const transformedData = data.map(notification => ({
      ...notification,
      read: notification.read_at !== null
    }))
    
    return NextResponse.json({ 
      success: true, 
      data: transformedData
    })
  } catch (error) {
    console.error('Error in GET notifications:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching notifications: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, read = true } = await request.json()
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        message: 'Notification ID is required'
      }, { status: 400 })
    }
    
    // If marking as read, set read_at to current time
    // If marking as unread, set read_at to null
    const updateData = read 
      ? { read_at: new Date().toISOString() } 
      : { read_at: null }
    
    const { data, error } = await supabase
      .from('notifications')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating notification:', error)
      return NextResponse.json({ 
        success: false, 
        message: 'Error marking notification as read: ' + error.message 
      }, { status: 500 })
    }
    
    // Transform response to include read property
    const transformedData = {
      ...data,
      read: data.read_at !== null
    }
    
    return NextResponse.json({ 
      success: true, 
      data: transformedData
    })
  } catch (error) {
    console.error('Error in PATCH notifications:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error updating notification: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    )
  }
} 