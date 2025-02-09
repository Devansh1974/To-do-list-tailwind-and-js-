// DOM Elements
const taskInput = document.getElementById("task-input");
const categoryInput = document.getElementById("category-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const clearCompletedButton = document.getElementById("clear-completed");
const toggleDarkModeButton = document.getElementById("toggle-dark-mode");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <span onclick="toggleTask(${index})">
        ${task.text} <span class="category">(${task.category})</span>
      </span>
      <div >

       <button 
      onclick="editTask(${index})" 
      style="padding: 8px 12px; border: 1px solid #4CAF50; background-color: #dfffe0; color: #4CAF50; border-radius: 4px; margin-right: 5px; cursor: pointer;"
    >
      Edit
    </button>
    <button 
      onclick="deleteTask(${index})" 
      style="padding: 8px 12px; border: 1px solid #f44336; background-color: #ffe0e0; color: #f44336; border-radius: 4px; cursor: pointer;"
    >
      Delete
    </button>
      </div>
    `;
    taskList.appendChild(li);

  });

}

// Add task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const category = categoryInput.value;

  if (taskText) {
    tasks.push({ text: taskText, category, completed: false });
    taskInput.value = "";
    saveAndRender();
  }
});

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

// Edit task
function editTask(index) {
  const newTask = prompt("Edit your task:", tasks[index].text);
  if (newTask) {
    tasks[index].text = newTask.trim();
    saveAndRender();
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// Clear all completed tasks
clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);
  saveAndRender();
});


// Save tasks to localStorage and render
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Initial render
renderTasks();

