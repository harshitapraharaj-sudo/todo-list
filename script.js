const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearAllBtn = document.getElementById("clearAllBtn");
const completedCount = document.getElementById("completedCount");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display saved tasks when page loads
displayTasks();


// Add Task
addTaskBtn.addEventListener("click", addTask);


function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
  
}


// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const li = document.createElement("li");
        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }


        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


        // Complete Button
        const completeBtn = document.createElement("button");

        completeBtn.className = "complete-btn";

        completeBtn.textContent = "✓";


        completeBtn.addEventListener("click", function() {

            task.completed = !task.completed;

            saveTasks();
            displayTasks();

        });


        // Delete Button
        const deleteBtn = document.createElement("button");

        deleteBtn.className = "delete-btn";

        deleteBtn.textContent = "✕";


        deleteBtn.addEventListener("click", function() {

            tasks = tasks.filter(function(item) {

                return item.id !== task.id;

            });

            saveTasks();
            displayTasks();

        });


        li.appendChild(span);

        li.appendChild(completeBtn);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });
    taskCount.textContent = `${tasks.length} tasks`;
    const completedTasks = tasks.filter(function(task) {
    return task.completed;
}).length;

completedCount.textContent =
    `${completedTasks} completed`;
}


// Save Tasks
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Add Task using Enter
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});
clearAllBtn.addEventListener("click", function() {

    if (tasks.length === 0) {
        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmClear) {

        tasks = [];

        saveTasks();

        displayTasks();
    }

});