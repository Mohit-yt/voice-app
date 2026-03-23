import { speechToText } from "../services/stt";

export default function MicButton({ onText }) {
  const handleClick = async () => {
    try {
      const text = await speechToText();
      onText(text);
    } catch (err) {
      console.error(err);
      alert("Speech recognition failed");
    }
  };

  return (
    <button onClick={handleClick} style={{ padding: "10px", fontSize: "16px" }}>
      🎤 Speak
    </button>
  );
}