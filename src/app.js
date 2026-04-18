const { formatTime, getNextMode } = window.FocusFlowCore;

const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

const timerEl = document.getElementById("timer");
const modeLabelEl = document.getElementById("modeLabel");
const taskInputEl = document.getElementById("taskInput");
const taskListEl = document.getElementById("taskList");

const state = {
mode: "focus",
remaining: FOCUS_SECONDS,
timerId: null,
tasks: loadTasks()
};

function loadTasks() {
try {
return JSON.parse(localStorage.getItem("focusflow_tasks")) || [];
} catch {
return [];
}
}

function saveTasks() {
localStorage.setItem("focusflow_tasks", JSON.stringify(state.tasks));
}

function updateTimerUI() {
timerEl.textContent = formatTime(state.remaining);
modeLabelEl.textContent = state.mode === "focus" ? "Modo: Foco" : "Modo: Pausa";
}

function renderTasks() {
taskListEl.innerHTML = "";

if (state.tasks.length === 0) {
const empty = document.createElement("li");
empty.className = "task-item";
empty.textContent = "Nenhuma tarefa ainda.";
taskListEl.appendChild(empty);
return;
}

state.tasks.forEach((task) => {
const li = document.createElement("li");
li.className = "task-item";

const left = document.createElement("div");
left.className = "task-left";

const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.done;
checkbox.addEventListener("change", () => toggleTask(task.id));

const span = document.createElement("span");
span.textContent = task.text;
if (task.done) span.classList.add("task-done");

left.appendChild(checkbox);
left.appendChild(span);

const removeBtn = document.createElement("button");
removeBtn.textContent = "Excluir";
removeBtn.className = "delete-btn";
removeBtn.addEventListener("click", () => removeTask(task.id));

li.appendChild(left);
li.appendChild(removeBtn);
taskListEl.appendChild(li);

});
}

function addTask() {
const text = taskInputEl.value.trim();
if (!text) return;

state.tasks.push({
id: Date.now(),
text,
done: false
});

taskInputEl.value = "";
saveTasks();
renderTasks();
}

function toggleTask(id) {
state.tasks = state.tasks.map((task) =>
task.id === id ? { ...task, done: !task.done } : task
);
saveTasks();
renderTasks();
}

function removeTask(id) {
state.tasks = state.tasks.filter((task) => task.id !== id);
saveTasks();
renderTasks();
}

function tick() {
state.remaining -= 1;

if (state.remaining <= 0) {
switchMode();
return;
}

updateTimerUI();
}

function startTimer() {
if (state.timerId) return;
state.timerId = setInterval(tick, 1000);
}

function pauseTimer() {
if (!state.timerId) return;
clearInterval(state.timerId);
state.timerId = null;
}

function switchMode() {
pauseTimer();
state.mode = getNextMode(state.mode);
state.remaining = state.mode === "focus" ? FOCUS_SECONDS : BREAK_SECONDS;
updateTimerUI();
}

function resetTimer() {
pauseTimer();
state.remaining = state.mode === "focus" ? FOCUS_SECONDS : BREAK_SECONDS;
updateTimerUI();
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("switchBtn").addEventListener("click", switchMode);
document.getElementById("addTaskBtn").addEventListener("click", addTask);

taskInputEl.addEventListener("keydown", (event) => {
if (event.key === "Enter") addTask();
});

updateTimerUI();
renderTasks();
