self.addEventListener("install",function(e){self.skipWaiting();});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim());});
self.addEventListener("message",function(e){
  if(e.data&&e.data.type==="NOTIFY"){
    e.waitUntil(self.registration.showNotification("Family Hub",{
      body:e.data.body,
      tag:e.data.tag,
      requireInteraction:true,
      icon:"/icon.png"
    }));
  }
});
self.addEventListener("notificationclick",function(e){
  e.notification.close();
  e.waitUntil(clients.matchAll({type:"window"}).then(function(c){
    if(c.length>0)return c[0].focus();
    return clients.openWindow("https://familyhub.pages.dev");
  }));
});