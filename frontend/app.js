const API = "https://golf-score-board-backend.onrender.com/api";
// ================= TOKEN =================
function getToken() {
  return localStorage.getItem("token");
}

// ================= REGISTER =================
async function register() {
  const res = await fetch(API + "/auth/register", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  alert(await res.text());
}

// ================= LOGIN =================
async function login() {
  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  const data = await res.json();

  if (!data.token) {
    alert("Login failed");
    return;
  }

  localStorage.setItem("token", data.token);
  window.location = "dashboard.html";
}

// ================= PASSWORD =================
function togglePassword() {
  const input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("token");
  window.location = "index.html";
}

// ================= PAYMENT =================
async function pay(plan) {
  await fetch(API + "/user/subscribe", {
    method: "POST",
    headers: { Authorization: getToken() }
  });

  alert(`Subscribed to ${plan}`);
  window.location = "dashboard.html";
}

// ================= ADD SCORE =================
async function addScore() {
  const res = await fetch(API + "/user/score", {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      Authorization: getToken()
    },
    body: JSON.stringify({
      score: document.getElementById("score").value,
      date: document.getElementById("date").value
    })
  });

  alert(await res.text());
  getScores();
}

// ================= DELETE SCORE =================
async function deleteScore(date) {
  await fetch(API + "/user/delete-score", {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      Authorization: getToken()
    },
    body: JSON.stringify({ date })
  });

  getScores();
}

// ================= GET SCORES =================
async function getScores() {
  const res = await fetch(API + "/user/scores", {
    headers: { Authorization: getToken() }
  });

  const data = await res.json();

  let html = "";

  data.forEach(s => {
    html += `
      <tr>
        <td>${s.score}</td>
        <td>${s.date}</td>
        <td>
          <button onclick="deleteScore('${s.date}')">Delete</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("scoresList").innerHTML = html;
}

// ================= DRAW =================
let drawDone = false;

// MANUAL DRAW (button)
async function runDraw() {
  const res = await fetch(API + "/draw/run");
  const data = await res.json();

  document.getElementById("drawNumbers").innerText =
    "Winning Numbers: " + data.numbers.join(", ");

  drawDone = true;
}

// AUTO DRAW (timer)
async function autoDraw() {
  if (drawDone) return;

  const res = await fetch(API + "/draw/run");
  const data = await res.json();

  document.getElementById("drawNumbers").innerText =
    "Winning Numbers: " + data.numbers.join(", ");

  drawDone = true;
}

// ================= TIMER =================
function startTimer() {
  setInterval(() => {
    const now = new Date();

    const drawTime = new Date();
    drawTime.setHours(23, 59, 0, 0); // change time here

    const diff = drawTime - now;

    if (diff <= 0) {
      document.getElementById("timer").innerText = "DRAW CLOSED";
      autoDraw();
      return;
    }

    const h = Math.floor(diff / 1000 / 60 / 60);
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    document.getElementById("timer").innerText =
      `${h}:${m}:${s}`;

  }, 1000);
}

// ================= LOAD =================
if (window.location.pathname.includes("dashboard.html")) {
  getScores();
  startTimer();
}