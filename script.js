let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " completed" : "");

    li.innerHTML = `
  <input type="checkbox" ${task.done ? "checked" : ""}
    onchange="toggleTask(${index})">
  <span>${task.text}</span>
  <small>${task.duration} min</small>
  <button onclick="removeTask(${index})">❌</button>
`;


    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const time = document.getElementById("timeInput").value;

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    duration: time,
    done: false
  });

  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();
let timer;
let timeLeft = 25 * 60; // 25 minutes
let running = false;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  document.getElementById("timerDisplay").textContent =
    `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (running) return;
  running = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      running = false;
      alert("Successful people are not gifted; they just work hard, then succeed on purpose.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  timeLeft = 25 * 60;
  updateTimerDisplay();
}

updateTimerDisplay();
