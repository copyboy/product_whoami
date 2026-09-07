// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;                    // 状态变量，永久存在链上
    address public owner;                    // 部署者，构造时记录

    event CountChanged(address indexed who, uint256 newValue);

    constructor() {
        owner = msg.sender;
        count = 0;
    }

    function increment() public {
        count = count + 1;                   // 0.8.x 内置溢出检查兜底
        emit CountChanged(msg.sender, count);
    }

    function decrement() public {
        require(count > 0, "count is zero"); // 别减到负数（uint 存不了）
        count = count - 1;
        emit CountChanged(msg.sender, count);
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
