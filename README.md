# 🖼️ AI Image Generator App

A full-stack image generator app that uses AI to turn text prompts into images. Built with authentication (JWT + cookies), and powered by the OpenAI API via clipboard key.

> **Live Frontend:** [image-generator-uqik.vercel.app](https://image-generator-uqik.vercel.app)  
> **Live Backend:** [imagegenerator-fsrs.onrender.com](https://imagegenerator-fsrs.onrender.com)

---

## ✨ Features

- 🔐 JWT Authentication with HttpOnly cookies
- 🧠 Generate images from text prompts using AI
- 📋 Uses Clipboard API key (OpenAI) to create images
- 📥 Download generated images instantly
- 🌐 Fully deployed: Frontend on **Vercel**, Backend on **Render**

---

## 🛠️ Tech Stack

- **Frontend:** React,Typescript, Context API ( for State Management ), TailwindCSS
- **Backend:** Node.js, Express, JWT, Cookies, MongoDb Atlas
- **AI:** OpenAI (via Clipboard API Key)

---

## 🚀 How It Works

1. **Login / Register**  
   Secure login flow using JWT stored in HttpOnly cookies.

2. **Enter a Prompt**  
   Input any creative or descriptive text.

3. **AI Generates the Image**  
   Backend hits OpenAI’s API using your clipboard key.

4. **Download or Save**  
   Click to download your image. That’s it.

---

## 🧪 API Overview

### `POST /api/auth/register`

Registers a new user. Stores JWT in HttpOnly cookie.

### `POST /api/auth/login`

Logs in existing user. Returns JWT in cookie.

### `POST /api/generate`

Generates image from prompt.

**Body:**

```json
{
  "prompt": "a futuristic city floating in the sky"
}
