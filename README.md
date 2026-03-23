voice-app/
└── web-starter-app/
    │
    ├── .env                     🔑 API key
    ├── package.json
    ├── index.html
    │
    └── src/
        │
        ├── App.tsx              ⭐ MAIN APP (you modified)
        ├── main.tsx             ⭐ entry point
        ├── runanywhere.ts       ⭐ SDK (DO NOT TOUCH much)
        │
        ├── components/          (optional UI)
        │   ├── MicButton.tsx    (optional)
        │   └── ChatBox.tsx      (optional)
        │
        ├── services/            ⭐ CORE LOGIC (YOU CREATED)
        │   ├── llm.ts           🧠 AI response (IMPORTANT)
        │   ├── stt.ts           🎤 speech → text
        │   └── tts.ts           🔊 text → speech
        │
        ├── utils/               (optional helpers)
        │   └── audio.ts
        │
        ├── hooks/               (already exists)
        ├── styles/              (already exists)
        ├── workers/             (already exists)
        │
        └── vite-env.d.ts
