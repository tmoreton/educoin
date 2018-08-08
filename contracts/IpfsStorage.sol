pragma solidity ^0.4.6;

// contract IpfsStorage {

//   struct MyStruct {
//     string[] structArray;
//   }

//   mapping(address => MyStruct) myStructs;

//   function appendString(string appendMe) public returns(uint length) {
//     return myStructs[msg.sender].structArray.push(appendMe);
//   }

//   function getCount() public constant returns(uint length) {
//     return myStructs[msg.sender].structArray.length;
//   }

//   function getStringAtIndex(uint index) public constant returns(string value) {
//     return myStructs[msg.sender].structArray[index];
//   }
// }


contract IpfsStorage {
  struct Course {
    string name;
    string hash;
    address userAddress;
  }
  Course[] public courses;

  function addCourse(string _name, string _hash) public returns(uint) {
    courses.length++;
    courses[courses.length-1].name = _name;
    courses[courses.length-1].hash = _hash;
    courses[courses.length-1].userAddress = msg.sender;
    return courses.length;
  }

  function getCount() public constant returns(uint) {
    return courses.length;
  }

  function getCourse(uint index) public constant returns( string, string, address) {
    return ( courses[index].name, courses[index].hash, courses[index].userAddress );
  }
}