pragma solidity ^0.4.6;

contract IpfsStorage {
  struct Course {
    string title;
    string description;
    string image;
    string video;
    address userAddress;
  }
  Course[] public courses;

  function addCourse(string _title, string _description, string _image, string _video) public returns(uint) {
    courses.length++;
    courses[courses.length-1].title = _title;
    courses[courses.length-1].description = _description;
    courses[courses.length-1].image = _image;
    courses[courses.length-1].video = _video;
    courses[courses.length-1].userAddress = msg.sender;
    return courses.length;
  }

  function getCount() public constant returns(uint) {
    return courses.length;
  }

  function getCourse(uint index) public constant returns( string, string, string, string, address, uint) {
    return ( courses[index].title, courses[index].description, courses[index].image, courses[index].video, courses[index].userAddress, index );
  }
}





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