// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    console.log('To-Do List application loaded successfully!');
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');
    
    // Function to update task count
    function updateTaskCount() {
        const count = taskList.children.length;
        taskCount.textContent = `Total tasks: ${count}`;
        
        // Show empty state if no tasks
        if (count === 0) {
            const emptyState = document.createElement('li');
            emptyState.className = 'empty-state';
            emptyState.textContent = 'No tasks yet. Add a task to get started!';
            emptyState.id = 'empty-state';
            taskList.appendChild(emptyState);
        } else {
            const emptyState = document.getElementById('empty-state');
            if (emptyState) {
                emptyState.remove();
            }
        }
    }
    
    // Create the addTask Function
    function addTask() {
        // Retrieve and trim the task input value
        const taskText = taskInput.value.trim();
        
        // Check if task text is empty
        if (taskText === "") {
            alert('Please enter a task!');
            taskInput.focus();
            return;
        }
        
        // Create new list item
        const listItem = document.createElement('li');
        
        // Create task text span
        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = taskText;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-btn';
        removeButton.textContent = 'Remove';
        
        // Assign onclick event to remove button
        removeButton.onclick = function() {
            listItem.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                listItem.remove();
                updateTaskCount();
            }, 300);
        };
        
        // Add double-click to mark as complete
        listItem.ondblclick = function() {
            taskSpan.style.textDecoration = taskSpan.style.textDecoration === 'line-through' ? 'none' : 'line-through';
            taskSpan.style.opacity = taskSpan.style.opacity === '0.6' ? '1' : '0.6';
        };
        
        // Append elements to list item
        listItem.appendChild(taskSpan);
        listItem.appendChild(removeButton);
        
        // Append list item to task list
        taskList.appendChild(listItem);
        
        // Clear the input field
        taskInput.value = '';
        taskInput.focus();
        
        // Update task count
        updateTaskCount();
    }
    
    // Attach Event Listeners
    
    // Add task when button is clicked
    addButton.addEventListener('click', addTask);
    
    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    // Initialize task count
    updateTaskCount();
    
    // Add some sample tasks for demonstration
    const sampleTasks = [
        'Learn JavaScript DOM manipulation',
        'Build a To-Do List application',
        'Style with CSS gradients',
        'Add interactive features'
    ];
    
    // Uncomment the following lines to add sample tasks on load
    /*
    sampleTasks.forEach(task => {
        taskInput.value = task;
        addTask();
    });
    */
});
