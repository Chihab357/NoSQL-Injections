# 🛡️ NoSQL Injection Demonstration 🚨  
**_Educational Purpose Only_**

---

## 📋 Project Overview

This project demonstrates the **vulnerability of NoSQL databases**, focusing on **MongoDB** when used with a **Node.js application**. It highlights how attackers can bypass authentication using improperly validated inputs.

### 💡 Key Learning Points:
- Exploit **NoSQL Injection** using special MongoDB operators like `$gt` and `$or`.
- Demonstrate how **unsecured queries** can alter logic.
- Showcase **mitigation strategies** to secure your app.

---

## 🚀 Tech Stack  
- **Backend:** Node.js  
- **Database:** MongoDB  
- **Testing Tool:** Postman  

---

## ⚙️ How It Works

1. **Setup**: Create a database `demo` with a `users` collection containing `username` and `password` fields.
2. **Attack**: Use Postman to send specially crafted JSON payloads with MongoDB operators like:  
   ```json
   { "username": { "$gt": "" }, "password": { "$gt": "" } }
