export async function speakText(text: string) {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US"; // change if needed

    utterance.onend = () => {
      resolve(true);
    };

    utterance.onerror = (err) => {
      console.error("TTS error:", err);
      resolve(false);
    };

    // 🔥 IMPORTANT FIX
    window.speechSynthesis.cancel(); // clear previous speech
    window.speechSynthesis.speak(utterance);
  });
}