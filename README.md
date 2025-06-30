
---

# 🎥 AI Short Video Generator

**AI Short Video Generator** is a full-stack web application that transforms text prompts into short, engaging videos using multiple AI services. It's ideal for content creators, educators, and marketers who want to automate the short-form video creation process.

---


## 📽️ What It Does

1. ✍️ **User enters a topic or script idea**
2. 🤖 **Gemini API** generates a detailed script
3. 🎙️ **Text-to-Speech (TTS)** conversion using Murf, ElevenLabs, or VoiceRSS
4. 🖼️ **Caption generation** and AI-generated image creation
5. 🎞️ **Video composition** by merging audio, captions, and visuals
6. 🔁 Final video is ready to watch or download!

---

## 🚀 Tech Stack

| Layer          | Technology / API                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| Framework      | [Next.js App Router](https://nextjs.org)                                                                 |
| Styling        | [Tailwind CSS](https://tailwindcss.com)                                                                  |
| Auth           | [Clerk](https://clerk.dev)                                                                               |
| Database       | [Neon PostgreSQL](https://neon.tech) with [Drizzle ORM](https://orm.drizzle.team)                        |
| Script Gen     | [Gemini API](https://ai.google.dev/gemini-api/docs)                                                      |
| Text-to-Speech | [Murf](https://murf.ai), [VoiceRSS](https://www.voicerss.org/), [ElevenLabs](https://www.elevenlabs.io/) |
| Caption API    | Custom/3rd-party captioning service                                                                      |
| Image/Media    | [Cloudinary](https://cloudinary.com)                                                                     |
| Hosting        | [Vercel](https://vercel.com)                                                                             |

---

## 🛠️ Features

* 🧠 AI-generated scripts using Gemini
* 🎤 Realistic voice-over generation
* 📄 Auto-generated captions
* 🖼️ AI-powered image generation for thumbnails or backgrounds
* 🎬 Merged final video for download or preview
* 🔐 Authenticated publishing via Clerk
* 📂 Saved video data using Drizzle ORM + Neon DB
* ⚡ Responsive and fast frontend using Tailwind and Next.js

---

## 📦 Environment Variables

Here are the key `.env` variables required:

```
NEXT_PUBLIC_DRIZZLE_DATABASE_URL=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_FRONTEND_API=...

GEMINI_API_KEY=...
MURF_TEXT_TO_SPEECH=...
VOICERSS_API_KEY=...
ELEVENLABS_API_KEY=...

NEXT_PUBLIC_FIREBASE_API_KEY=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

CAPTION_API_KEY=...
```

🔒 **Never expose your `.env` values publicly.** Make sure to use `.env.local` and add `.env*` to your `.gitignore`.

---

## 🧑‍💻 Getting Started

### 1. Clone the repo:

```bash
git clone https://github.com/your-username/ai-short-video-generator.git
cd ai-short-video-generator
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Set up environment variables:

Create a `.env.local` file and paste your keys.

### 4. Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🗂️ Project Structure

```
/app               → App router pages & routes
/components        → Reusable UI components
/lib               → API helpers & utilities (TTS, Gemini, Video logic)
/app/api           → Server Actions & API endpoints
/public            → Static assets
```

---

## 🚀 Deployment

This app is optimized for **Vercel**:

1. Push to GitHub
2. Import into Vercel
3. Add all env vars to Vercel's dashboard
4. Click **Deploy**

---

## 📚 Learn More

* [Next.js Docs](https://nextjs.org/docs)
* [Clerk Docs](https://clerk.dev/docs)
* [Drizzle ORM](https://orm.drizzle.team/docs)
* [Cloudinary API](https://cloudinary.com/documentation)
* [Gemini API](https://ai.google.dev/gemini-api/docs)

---

## 📄 License

MIT License. Feel free to use, modify, and contribute.

---


