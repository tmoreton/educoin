pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';
import './Token.sol';

contract Authentication is Killable {

  struct User {
    bytes32 name;
    string about;
    string image;
    uint[] course;
    address userAddress;
  }

  mapping (address => User) private users;

  uint private id; // Stores user id temporarily

  modifier onlyExistingUser {
    // Check if user exists or terminate
    require(!(users[msg.sender].name == 0x0));
    _;
  }

  modifier onlyValidName(bytes32 name) {
    // Only valid names allowed
    require(!(name == 0x0));
    _;
  }

  function login() constant public onlyExistingUser returns (bytes32, string, string, address, uint[]) {
    return (users[msg.sender].name, users[msg.sender].about, users[msg.sender].image, users[msg.sender].userAddress, users[msg.sender].course);
  }

  function signup(bytes32 _name, string _about, string _image) public payable onlyValidName(_name) returns (bytes32, string, string, address) {
    users[msg.sender].name = _name;
    users[msg.sender].about = _about;
    users[msg.sender].image = _image;
    users[msg.sender].userAddress = msg.sender;
    return (users[msg.sender].name, users[msg.sender].about, users[msg.sender].image, users[msg.sender].userAddress);
  }

  function update(bytes32 _name, string _about, string _image) public payable onlyValidName(_name) onlyExistingUser returns (bytes32, string, string) {
    users[msg.sender].name = _name;
    users[msg.sender].about = _about;
    users[msg.sender].image = _image;
    return (users[msg.sender].name, users[msg.sender].about, users[msg.sender].image);
  }  

}
