self.onnotificationclick = (event) => (
  event.notification.close(),
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        if (clients.length > 0) return clients[0].focus();
        else return self.clients.openWindow("/");
      })
  )
);

self.onpush = (event) =>
  event.waitUntil(
    self.registration.showNotification("WindowClient focus test", {
      body: "Click this to focus the client",
    })
  );
