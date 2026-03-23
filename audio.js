export function isSpeechSupported() {
  return !!(
    window.SpeechRecognition || window.webkitSpeechRecognition
  );
}
