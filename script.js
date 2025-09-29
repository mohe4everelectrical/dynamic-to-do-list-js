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
