importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

console.log("Service Worker: Initializing Firebase...");

try {
  firebase.initializeApp({
    apiKey: "AIzaSyA3NSvE9q5OX4SV39A-N4V2nNVCWJSffdM",
    authDomain: "email-notification-5816a.firebaseapp.com",
    projectId: "email-notification-5816a",
    storageBucket: "email-notification-5816a.firebasestorage.app",
    messagingSenderId: "477668175497",
    appId: "1:477668175497:web:1f25b7d92d70637402e058",
  });

  console.log("Service Worker: Firebase initialized successfully");

  const messaging = firebase.messaging();

  // Optional: Handle background messages
  messaging.onBackgroundMessage((payload) => {
    console.log("Service Worker: Received background message:", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/notification-icon.svg",
      badge: "/notification-badge.svg",
      data: payload.data,
      actions: [
        {
          action: "open",
          title: "Open",
        },
      ],
    };

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });

  console.log("Service Worker: Message handler registered");
} catch (error) {
  console.error("Service Worker: Error initializing Firebase:", error);
}
