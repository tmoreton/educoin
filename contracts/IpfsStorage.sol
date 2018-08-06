pragma solidity ^0.4.6;

contract IpfsStorage {

  struct MyStruct {
    string[] structArray;
  }

  mapping(address => MyStruct) myStructs;

  function appendString(string appendMe) public returns(uint length) {
    return myStructs[msg.sender].structArray.push(appendMe);
  }

  function getCount() public constant returns(uint length) {
    return myStructs[msg.sender].structArray.length;
  }

  function getStringAtIndex(uint index) public constant returns(string value) {
    return myStructs[msg.sender].structArray[index];
  }
}