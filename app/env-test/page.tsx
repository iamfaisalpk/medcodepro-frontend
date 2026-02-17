export default function EnvTest() {
  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Environment Variable Test</h1>
      <p>
        <strong>NEXT_PUBLIC_API_URL:</strong>{" "}
        {process.env.NEXT_PUBLIC_API_URL || "NOT SET"}
      </p>
      <p>
        <strong>Expected:</strong> https://medcodepro-backend.onrender.com/api
      </p>
    </div>
  );
}
