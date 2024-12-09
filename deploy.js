async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const ToDoList = await ethers.getContractFactory("ToDoList");
    const toDoList = await ToDoList.deploy();
  
    console.log("ToDoList contract deployed to:", toDoList.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  