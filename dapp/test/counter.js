const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  let counter;
  let sender;

  beforeEach(async function () {
    [sender] = await ethers.getSigners();
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    await counter.waitForDeployment();
  });

  it("正常路径：部署后初始 count == 0", async function () {
    expect(await counter.getCount()).to.equal(0n);
    expect(await counter.count()).to.equal(0n);
  });

  it("正常路径：increment() 后 count == 1，getCount() 返回一致", async function () {
    await counter.increment();
    expect(await counter.getCount()).to.equal(1n);
    expect(await counter.count()).to.equal(1n);
  });

  it("revert 断言：初始状态调 decrement() 被 revert，错误信息 count is zero", async function () {
    await expect(counter.decrement()).to.be.revertedWith("count is zero");
  });

  it("事件断言：increment() emit CountChanged(调用者, 新值)", async function () {
    await expect(counter.increment())
      .to.emit(counter, "CountChanged")
      .withArgs(sender.address, 1n);
  });
});
