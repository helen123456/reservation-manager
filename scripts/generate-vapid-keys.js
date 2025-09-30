const webpush = require('web-push');

// 生成 VAPID 密钥对
const vapidKeys = webpush.generateVAPIDKeys();

console.log('VAPID 密钥对已生成：');
console.log('');
console.log('公钥（添加到 app.json 的 notification.vapidPublicKey）：');
console.log(vapidKeys.publicKey);
console.log('');
console.log('私钥（保存在服务器端，不要公开）：');
console.log(vapidKeys.privateKey);
console.log('');
console.log('请将公钥添加到 app.json 中：');
console.log(`{
  "expo": {
    "notification": {
      "vapidPublicKey": "${vapidKeys.publicKey}"
    },
    "web": {
      "notification": {
        "vapidPublicKey": "${vapidKeys.publicKey}"
      }
    }
  }
}`);
