async function main() {
    const [owner] = await ethers.getSigners(); // Get the account
    console.log("Interacting with the contract using account:", owner.address);

    // Replace with the actual deployed contract address
    const toDoListAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; 
    const ToDoList = await ethers.getContractFactory("ToDoList");
    const toDoList = await ToDoList.attach(toDoListAddress);

    // Create a new task
    const taskContent = "Buy groceries"; 
    const tx = await toDoList.createTask(taskContent); // Call createTask instead of addTask
    console.log("Task created:", taskContent);

    // Wait for the transaction to be mined
    await tx.wait();

    // Toggle completion status of the task
    const taskId = 1; // Assuming this is the first task created
    const toggleTx = await toDoList.toggleTaskCompletion(taskId);
    console.log(`Toggled task ${taskId} completion`);

    await toggleTx.wait();

    // Retrieve and log the task (ID 1)
    const task = await toDoList.tasks(taskId); // Fetch task by ID
    console.log(`Task ID: ${task.id}, Content: ${task.content}, Completed: ${task.completed}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
