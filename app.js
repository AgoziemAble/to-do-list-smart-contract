// Import ethers.js
const { ethers } = require('ethers');

// Set up the provider (using a local network like Hardhat)
const provider = new ethers.JsonRpcProvider('http://localhost:8545'); // Assuming Hardhat local network
const signer = provider.getSigner(); // Get the first account

// Replace with your deployed contract address and ABI
const contractAddress = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'; 
const contractABI = [
    // Add the ABI of your contract here
    "function createTask(string memory _content) public",
    "function toggleTaskCompletion(uint _id) public",
    "function tasks(uint _id) public view returns (uint, string memory, bool)"
];

const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Interact with the contract
async function addTask() {
    const taskContent = document.getElementById('taskInput').value;
    if (taskContent) {
        const tx = await contract.createTask(taskContent);
        await tx.wait();
        loadTasks(); // Reload tasks after adding one
        document.getElementById('taskInput').value = ''; // Clear input
    }
}

// Toggle task completion
async function toggleTaskCompletion(taskId) {
    const tx = await contract.toggleTaskCompletion(taskId);
    await tx.wait();
    loadTasks(); // Reload tasks after toggling
}

// Load tasks from the contract
async function loadTasks() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = ''; // Clear existing tasks
    const taskCount = await contract.taskCount();

    for (let i = 1; i <= taskCount; i++) {
        const task = await contract.tasks(i);
        const taskElement = document.createElement('li');
        taskElement.innerHTML = `
            ${task.content} - ${task.completed ? 'Completed' : 'Not Completed'}
            <button onclick="toggleTaskCompletion(${task.id})">Toggle Completion</button>
        `;
        taskListElement.appendChild(taskElement);
    }
}

// Event listener for adding a task
document.getElementById('addTaskBtn').addEventListener('click', addTask);

// Load tasks when the page loads
loadTasks();
