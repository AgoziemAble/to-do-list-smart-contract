// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ToDoList {
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;
    uint public taskCount;

    event TaskCreated(uint id, string content);
    event TaskCompleted(uint id, bool completed);

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content);
    }

    function toggleTaskCompletion(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }
}
