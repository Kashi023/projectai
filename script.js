const chatBox = document.getElementById("chat-box");

async function sendMessage() {

    const input = document.getElementById("user-input");

    const message = input.value.trim();

    if (!message) return;

    chatBox.innerHTML += `
        <div class="user">
            ${message}
        </div>
    `;

    input.value = "";

    const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message }),
});

    if (!response.ok) {
    const text = await response.text();
    console.error("Server Error:", text);
    return;
}
 
 const data = await response.json();

    chatBox.innerHTML += `
        <div class="bot">
            ${data.reply}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}


document
    .getElementById("send-btn")
    .addEventListener("click", sendMessage);