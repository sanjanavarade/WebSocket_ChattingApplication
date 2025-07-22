# WebSocket Chatting Application

A real-time chat application built with WebSockets using TypeScript (and some JavaScript). Enables bi-directional messaging between connected clients via a lightweight server.

---

## 📁 Project Structure

WebSocket_ChattingApplication/
├── App.tsx # React front-end (TypeScript)
├── index.ts # WebSocket server entry-point
├── index.js # Browser/client WebSocket entry (JS version)
├── package.json
└── tsconfig.json

## ScreenShot
<img width="1917" height="948" alt="Screenshot 2025-06-29 221943" src="https://github.com/user-attachments/assets/ffbefb4e-d121-4d32-a5df-c7ee1157522a" />
---

## 🛠️ Features

- Real-time message exchange between clients via WebSocket protocol  
- Lightweight server built in TypeScript/Node.js (`index.ts`)  
- Client-side app in React (`App.tsx`) for UI rendering  
- Fully-typed codebase with TypeScript support  

---

## ⚙️ Setup & Running

1. **Clone the repo**
    ```bash
    git clone https://github.com/sanjanavarade/WebSocket_ChattingApplication.git
    cd WebSocket_ChattingApplication
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Start the WebSocket server**
    ```bash
    npm run build     # if TypeScript build is needed
    node dist/index.js     # or ts-node index.ts
    ```

4. **Run the client**
    - If React:
      ```bash
      npm start         # opens React UI in browser
      ```
    - If basic HTML/JS:
      open `index.js` logic in browser environment

---

## ⏯️ Usage

- Launch multiple browser windows/tabs
- Each client connects to the same WebSocket server
- Type a message in one client → click “Send” → message appears instantly in all active clients

---

## 📦 Tech Stack

- **Backend**: Node.js, TypeScript, `ws` or WebSocket API  
- **Frontend**: React (TypeScript), plain JavaScript version  
- **Tools**: npm, TypeScript compiler (`tsc`)

---
## 👤 Author

**Sanjana Varade**  
[GitHub](https://github.com/sanjanavarade)

---
