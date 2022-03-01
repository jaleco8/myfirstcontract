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

  it("get Task successfully", async () => {
    const tasksCounter = await this.tasksContract.taskCounter();
    const task = await this.tasksContract.tasks(tasksCounter);
    assert.equal(task.id.toNumber(), tasksCounter);
    assert.equal(task.title, "Task 1");
    assert.equal(task.description, "Description 1");
    assert.equal(task.done, false);
    assert.equal(tasksCounter, 1);
  });

  it("add new Task successfully", async () => {
    const result = await this.tasksContract.createTask(
      "Task 2",
      "Description 2"
    );
    const taskEvent = result.logs[0].args;
    const tasksCounter = await this.tasksContract.taskCounter();
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, "Task 2");
    assert.equal(taskEvent.description, "Description 2");
    assert.equal(taskEvent.done, false);
    assert.equal(tasksCounter, 2);
  });

  it("update Task successfully", async () => {
    const result = await this.tasksContract.toggleDone(1);
    const taskEvent = result.logs[0].args;
    const task = await this.tasksContract.tasks(1);

    assert.equal(taskEvent.id.toNumber(), 1);
    assert.equal(taskEvent.done, true);
    assert.equal(task.done, true);
  });
});
