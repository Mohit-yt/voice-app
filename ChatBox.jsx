export default function ChatBox({ userText, aiText }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <p><strong>You:</strong> {userText}</p>
      <p><strong>AI:</strong> {aiText}</p>
    </div>
  );
}