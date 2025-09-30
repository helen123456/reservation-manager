// Service Worker for handling push notifications in web browsers
// This file handles background push notifications when the app is not active

// Install event - set up the service worker
self.addEventListener('install', function(event) {
  console.log('Push notification service worker installing...');
  self.skipWaiting();
});

// Activate event - clean up old caches if needed
self.addEventListener('activate', function(event) {
  console.log('Push notification service worker activating...');
  event.waitUntil(self.clients.claim());
});

// Push event - handle incoming push notifications
self.addEventListener('push', function(event) {
  console.log('Push notification received:', event);
  
  // Default notification data
  let notificationData = {
    title: 'New Notification',
    body: 'You have a new notification',
    icon: '/icon.png',
    badge: '/icon.png',
    data: {}
  };

  // Parse push data if available
  if (event.data) {
    try {
      const pushData = event.data.json();
      console.log('Push data:', pushData);
      
      // Update notification data with push data
      if (pushData.title) notificationData.title = pushData.title;
      if (pushData.body) notificationData.body = pushData.body;
      if (pushData.icon) notificationData.icon = pushData.icon;
      if (pushData.badge) notificationData.badge = pushData.badge;
      if (pushData.data) notificationData.data = pushData.data;
      
      // Enhanced type-specific notification handling
      if (pushData.data && pushData.data.type) {
        const customizedData = customizeNotificationByType(pushData);
        notificationData = { ...notificationData, ...customizedData };
      }
    } catch (error) {
      console.error('Error parsing push data:', error);
    }
  }

  // Show the notification with enhanced options
  const promiseChain = self.registration.showNotification(
    notificationData.title,
    {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      data: notificationData.data,
      requireInteraction: true,
      tag: notificationData.data.type || 'default', // Group notifications by type
      renotify: true,
      actions: getNotificationActions(notificationData.data.type)
    }
  );

  event.waitUntil(promiseChain);
});

// Customize notification based on type
function customizeNotificationByType(pushData) {
  const notificationType = pushData.data.type;
  let customData = {
    title: pushData.title,
    body: pushData.body,
    icon: '/icon.png',
    badge: '/icon.png'
  };

  switch (notificationType) {
    case 'reservation':
      customData.title = pushData.title || '新预订通知';
      customData.body = pushData.body || '您有一个新的预订请求';
      customData.icon = '/icon.png';
      customData.badge = '/icon.png';
      break;
      
    case 'message':
      customData.title = pushData.title || '新消息';
      customData.body = pushData.body || '您有新的消息';
      customData.icon = '/icon.png';
      customData.badge = '/icon.png';
      break;
      
    case 'system':
      customData.title = pushData.title || '系统通知';
      customData.body = pushData.body || '系统有重要更新';
      customData.icon = '/icon.png';
      customData.badge = '/icon.png';
      break;
      
    case 'promotion':
      customData.title = pushData.title || '促销活动';
      customData.body = pushData.body || '有新的促销活动等待您';
      customData.icon = '/icon.png';
      customData.badge = '/icon.png';
      break;
      
    case 'reminder':
      customData.title = pushData.title || '提醒';
      customData.body = pushData.body || '您有一个重要提醒';
      customData.icon = '/icon.png';
      customData.badge = '/icon.png';
      break;
      
    default:
      customData.title = pushData.title || '通知';
      customData.body = pushData.body || '您有新的通知';
  }

  return customData;
}

// Get notification actions based on type
function getNotificationActions(type) {
  const baseActions = [
    {
      action: 'dismiss',
      title: '关闭',
      icon: '/icon.png'
    }
  ];

  switch (type) {
    case 'reservation':
      return [
        {
          action: 'view',
          title: '查看预订',
          icon: '/icon.png'
        },
        ...baseActions
      ];
      
    case 'message':
      return [
        {
          action: 'view',
          title: '查看消息',
          icon: '/icon.png'
        },
        ...baseActions
      ];
      
    case 'system':
      return [
        {
          action: 'view',
          title: '查看详情',
          icon: '/icon.png'
        },
        ...baseActions
      ];
      
    case 'promotion':
      return [
        {
          action: 'view',
          title: '查看优惠',
          icon: '/icon.png'
        },
        ...baseActions
      ];
      
    case 'reminder':
      return [
        {
          action: 'view',
          title: '查看提醒',
          icon: '/icon.png'
        },
        ...baseActions
      ];
      
    default:
      return [
        {
          action: 'view',
          title: '查看',
          icon: '/icon.png'
        },
        ...baseActions
      ];
  }
}

// Notification click event - handle user interaction with notifications
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked:', event);
  
  // Close the notification
  event.notification.close();

  // Handle different actions
  if (event.action === 'dismiss') {
    console.log('User dismissed notification');
    return;
  }

  // Default action or 'view' action - open the app
  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    const notificationData = event.notification.data;
    
    console.log('Processing notification click with data:', notificationData);
    
    // Determine the URL to open based on notification data
    let urlToOpen = getNotificationTargetUrl(notificationData);
    
    console.log('Target URL:', urlToOpen);

    // Check if there's already a window/tab open
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i];
      if ('focus' in client) {
        // If we have a specific target and it matches current URL, focus it
        if (urlToOpen !== '/' && client.url.includes(urlToOpen.split('?')[0])) {
          console.log('Focusing existing tab with matching URL');
          return client.focus();
        }
        // If we're targeting the root and client is already on the app, focus it
        if (urlToOpen === '/' && (client.url.includes('localhost') || client.url.includes(self.location.origin))) {
          console.log('Focusing existing app tab');
          return client.focus();
        }
      }
    }

    // If no existing matching window/tab, open a new one
    if (clients.openWindow) {
      console.log('Opening new window:', urlToOpen);
      return clients.openWindow(urlToOpen);
    }
  }).catch(function(error) {
    console.error('Error handling notification click:', error);
    // Fallback: try to open the root URL
    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  });

  event.waitUntil(promiseChain);
});

// Get target URL based on notification data
function getNotificationTargetUrl(notificationData) {
  if (!notificationData || !notificationData.type) {
    console.log('No notification data or type, using default route');
    return '/';
  }

  switch (notificationData.type) {
    case 'reservation':
      if (notificationData.reservationId) {
        return `/(tabs)/reservation/detail?id=${notificationData.reservationId}`;
      } else if (notificationData.reservationData) {
        const params = new URLSearchParams({
          reservation: JSON.stringify(notificationData.reservationData)
        });
        return `/(tabs)/reservation/detail?${params.toString()}`;
      } else {
        return '/(tabs)/reservation';
      }
      
    case 'message':
      if (notificationData.messageId) {
        return `/notifications?messageId=${notificationData.messageId}`;
      } else {
        return '/notifications';
      }
      
    case 'system':
      if (notificationData.actionUrl) {
        return notificationData.actionUrl;
      } else {
        return '/settings';
      }
      
    case 'promotion':
      if (notificationData.promotionId) {
        return `/(tabs)/reservation?promotionId=${notificationData.promotionId}`;
      } else {
        return '/(tabs)/reservation';
      }
      
    case 'reminder':
      if (notificationData.reminderId) {
        return `/notifications?reminderId=${notificationData.reminderId}`;
      } else {
        return '/notifications';
      }
      
    default:
      console.log('Unknown notification type:', notificationData.type);
      return '/';
  }
}

// Background sync event - handle background sync if needed
self.addEventListener('sync', function(event) {
  console.log('Background sync event:', event);
  
  if (event.tag === 'background-sync') {
    // Handle background sync operations here
    event.waitUntil(doBackgroundSync());
  }
});

// Background sync function
function doBackgroundSync() {
  return new Promise(function(resolve) {
    console.log('Performing background sync...');
    // Add background sync logic here
    resolve();
  });
}

// Message event - handle messages from the main thread
self.addEventListener('message', function(event) {
  console.log('Service worker received message:', event.data);
  
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'GET_VERSION':
        event.ports[0].postMessage({ version: '1.0.0' });
        break;
    }
  }
});

console.log('Push notification service worker loaded successfully');
