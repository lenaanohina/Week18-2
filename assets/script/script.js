// Получаем элементы
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const noTasksMessage = document.getElementById("noTasksMessage");
const clearListButton = document.getElementById("clearListButton");

// Получаем список задач из Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Функция для обновления списка задач
function updateTaskList() {
  taskList.innerHTML = `<span class="task-list-title">Список задач</span>`;
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => toggleTaskCompleted(index));
    if (task.completed) {
      taskItem.classList.add("completed-task");
      checkbox.checked = true;
    }
    const taskText = document.createElement("span");
    taskText.innerText = task.text;
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskList.appendChild(taskItem);
  });

  updateNoTasksMessage();
  updateClearListButton();
}

// Функция для обновления сообщения об отсутствии задач
function updateNoTasksMessage() {
  if (tasks.length === 0) {
    noTasksMessage.style.display = "block";
  } else {
    noTasksMessage.style.display = "none";
  }
}

// Функция для обновления активности кнопки "Очистить список"
function updateClearListButton() {
  if (tasks.length === 0) {
    clearListButton.disabled = true;
  } else {
    clearListButton.disabled = false;
  }
}

// Функция для добавления новой задачи
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    updateTaskList();
  }
}

// Функция для переключения состояния выполнения задачи
function toggleTaskCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTaskList();
}

// Функция для очистки списка задач
function clearTaskList() {
  tasks = [];
  localStorage.removeItem("tasks");
  updateTaskList();
}

addTaskButton.addEventListener("click", addTask);
clearListButton.addEventListener("click", clearTaskList);

updateTaskList();
