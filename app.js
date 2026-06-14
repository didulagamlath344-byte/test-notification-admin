const BACKEND_URL = "https://dash.infinityfree.com/accounts/if0_42181664/send.php";

const sendBtn = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");

async function sendNotification() {
  const title = document.getElementById("title").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!title || !message) {
    statusEl.textContent = "Title සහ message දෙකම දාන්න.";
    return;
  }

  statusEl.textContent = "Sending...";

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message })
    });

    const data = await res.text();
    console.log(data);
    statusEl.textContent = "Sent successfully.";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Send error.";
  }
}

sendBtn.addEventListener("click", sendNotification);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(console.error);
}
