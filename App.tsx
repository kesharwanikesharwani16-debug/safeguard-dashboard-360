@import "tailwindcss";

@theme {
  --color-norton-yellow: #FFD200;
  --color-norton-dark: #0A0A0A;
  --color-norton-gray: #1A1A1A;
}

@layer base {
  body {
    @apply bg-norton-dark text-white font-sans;
  }
}

.glass {
  @apply bg-white/5 backdrop-blur-md border border-white/10;
}

.norton-gradient {
  background: radial-gradient(circle at top right, rgba(255, 210, 0, 0.1), transparent);
}
