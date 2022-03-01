const TaskContract = artifacts.require("TasksContract");

contract("TasksContract", () => {
  before(async () => {
    this.tasksContract = await TaskContract.deployed();
  });

  it("migrate deployed successfully", async () => {
    const address = this.tasksContract.address;
    assert.notEqual(address, null);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, undefined);
    assert.notEqual(address, "");
  });

  it("get Task List", async () => {
    const tasksCounter = await this.tasksContract.taskCounter();
    const task = await this.tasksContract.tasks(tasksCounter);
    assert.equal(task.id.toNumber(), tasksCounter);
    assert.equal(task.title, "Task 1");
    assert.equal(task.description, "Description 1");
    assert.equal(task.done, false);
    assert.equal(tasksCounter, 1);
  });

  it("add new Task successfully", async () => {
    const result = await this.tasksContract.createTask("Task 2", "Description 2");
    const taskEvent = result.logs[0].args;
    assert.equal(taskEvent.id.toNumber(), 2);
  });
});
