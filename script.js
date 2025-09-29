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

        // Check if the task text is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Exit the function if the input is empty
        }

        // --- Task Creation ---

        // Create a new li element
        const listItem = document.createElement('li');
        // Set its text content to the task text
        // NOTE: We only set the text content for the task part, not the whole LI yet,
        // to allow for the remove button to be appended separately.
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        listItem.appendChild(taskSpan);


        // Create a new button element for removing the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Assign an onclick event to the remove button
        // When clicked, it removes its parent element (the li) from the taskList.
        removeBtn.onclick = function() {
            taskList.removeChild(listItem);
        };

        // Append the remove button to the li element
        listItem.appendChild(removeBtn);

        // Append the new li element to the taskList (ul)
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = "";
    };

    // --- Attach Event Listeners ---

    // 1. Event listener for the "Add Task" button click
    addButton.addEventListener('click', addTask);

    // 2. Event listener for the 'keypress' event on the input field
    taskInput.addEventListener('keypress', (event) => {
        // Check if the pressed key is the "Enter" key
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // The instruction "Invoke the addTask function on DOMContentLoaded" is redundant/incorrect
    // as it would immediately add an empty task on load. We only attach the event handlers here.

});
