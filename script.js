const form = document.getElementById("leadForm");
const responseBox = document.getElementById("response");
document.getElementById("year").textContent = new Date().getFullYear();

function sanitize(str) {
  return String(str || "").replace(/[<>]/g, "").trim();
}

function buildMessage({ name, service, time, newClient, budget, notes }) {
  const isToday = time.toLowerCase().includes("today");
  const s = service.toLowerCase();

  let msg = `Thanks ${name}.\n`;
  msg += `Request received: ${service}.\n\n`;

  msg += isToday
    ? `We’ll confirm availability within 15 minutes.\n`
    : `We’ll confirm your appointment and send details shortly.\n`;

  if (newClient === "Yes") {
    msg += `\nNew client: we’ll send a quick intake + what to expect.`;
  }

  msg += `\n\nNext steps: `;
  if (s.includes("botox") || s.includes("filler")) {
    msg += `We’ll text pre-care instructions and confirm your provider.`;
  } else if (s.includes("laser")) {
    msg += `We’ll ask 2 quick questions to confirm eligibility and prep guidance.`;
  } else if (s.includes("micro")) {
    msg += `We’ll confirm your skin goals and share aftercare notes.`;
  } else if (s.includes("facial")) {
    msg += `We’ll recommend the best facial based on your goals.`;
  } else if (s.includes("iv")) {
    msg += `We’ll confirm the IV option and any health notes.`;
  } else {
    msg += `We’ll clarify your goals and confirm the best next step.`;
  }

  if (budget) msg += `\n\nBudget noted: ${budget}.`;
  if (notes) msg += `\nNotes: ${notes}`;

  msg += `\n\nReply to the confirmation text if you have preferences.`;
  return msg;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = sanitize(document.getElementById("name").value);
  const phone = sanitize(document.getElementById("phone").value);
  const service = sanitize(document.getElementById("service").value);
  const time = sanitize(document.getElementById("time").value);
  const newClient = sanitize(document.getElementById("newClient").value);
  const budget = sanitize(document.getElementById("budget").value);
  const notes = sanitize(document.getElementById("notes").value);

  if (!name || !phone || !service || !time || !newClient) {
    responseBox.textContent = "Please complete the required fields.";
    return;
  }

  responseBox.textContent = buildMessage({ name, service, time, newClient, budget, notes });
  form.reset();
});

