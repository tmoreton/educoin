pragma solidity ^0.4.2;

contract Transfer {
  // The keyword "public" makes those variables readable from outside.
  address public recipient;
  mapping (address => uint256) public balances;

  function transfer(address _receiver, uint256 _amount) public payable {
    if (balances[msg.sender] < _amount) return;
    balances[msg.sender] -= _amount;
    balances[_receiver] += _amount;
  }

  function transferValue(address _receiver, uint256 _amount) public {
    if (balances[msg.sender] < _amount) return;
    balances[msg.sender] -= _amount;
    balances[_receiver] += _amount;
  }

}