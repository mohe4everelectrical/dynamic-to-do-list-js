// Setup Event Listener for Page Load: Ensures the script runs after the HTML is fully parsed.
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements: Get references to the necessary elements.
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Define the addTask Function
    const addTask = () => {
        // Retrieve and trim the task text from the input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Exit the function if the input is empty
        }

        // --- Task Creation and Removal Logic ---

        // Create a new li element
        const listItem = document.createElement('li');
        
        // Set its textContent to taskText. This is for the display of the task itself.
        // The space will be handled by the flexbox CSS, so setting the whole textContent is fine.
        listItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        
        // Give it a class name of 'remove-btn' (Requirement: use className, not classList.add)
        removeBtn.className = 'remove-btn';

        // Assign an onclick event to the remove button
        // When triggered, it removes its parent element (the li) from the taskList.
        removeBtn.onclick = function() {
            // Remove the listItem (the parent of the button) from its parent (taskList)
            taskList.removeChild(listItem);
        };

        // Append the remove button to the li element
        listItem.appendChild(removeBtn);

        // Append the li to taskList
        taskList.appendChild(listItem);

        // Clear the task input field by setting taskInput.value to an empty string.
        taskInput.value = "";
    };

    // --- Attach Event Listeners ---

    // 1. Add an event listener to addButton that calls addTask when the button is clicked.
    addButton.addEventListener('click', addTask);

    // 2. Add an event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', (event) => {
        // Check if event.key is equal to 'Enter' before calling addTask.
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Initialize and Load Tasks
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false);
        });
    }
    
    // Update Task Addition Functionality
    function addTask(taskText, save = true) {
        if (typeof taskText === 'string') {
            taskText = taskText.trim();
        }
        
        if (taskText === "") {
            alert('Please enter a task!');
            return;
        }
        
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        
        removeButton.onclick = function() {
            // Implement Task Removal with Local Storage Update
            taskList.removeChild(listItem);
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const taskIndex = storedTasks.indexOf(taskText);
            if (taskIndex > -1) {
                storedTasks.splice(taskIndex, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };
        
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
        
        // Saving Tasks to Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
        
        taskInput.value = '';
    }
    
    // Event Listeners
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value;
        addTask(taskText, true);
    });
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value;
            addTask(taskText, true);
        }
    });
    
    // Load tasks when page loads
    loadTasks();
});
