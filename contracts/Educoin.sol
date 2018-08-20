pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) external; }

contract Educoin is Killable {
  string public name;
  string public symbol;
  uint8 public decimals = 18;
  uint256 public totalSupply;   // 18 decimals is the strongly suggested default, avoid changing it
  uint private id; // Stores user id temporarily
  
  /**
   * Constructor function
   *
   * Initializes contract with initial supply tokens to the creator of the contract
   */
  constructor() public {
    totalSupply = 21000000000;              // Update total supply with the decimal amount
    users[msg.sender].balance = 2100000000;    // Give the creator all initial tokens
    name = 'EduCoin';                       // Set the name for display purposes
    symbol = 'EDU';                         // Set the symbol for display purposes
    escrow.contractAddress = address(this);
    escrow.contractBalance = 18900000000;
  }

  struct Escrow {
    address contractAddress;
    uint256 contractBalance;
  }

  struct User {
    bytes32 name;
    string about;
    string image;
    uint[] myCourses;
    uint[] myPurchases;
    address userAddress;
    uint256 balance;
  }

  struct Course {
    string title;
    string description;
    string image;
    string video;
    address userAddress;
    string lessons;
  }

  Course[] public courses;
  Escrow public escrow;
  mapping (address => User) private users;

  // This creates an array with all balances
  mapping (address => mapping (address => uint256)) public allowance;

  // This generates a public event on the blockchain that will notify clients
  event Transfer(address indexed from, address indexed to, uint256 value);
  
  // This generates a public event on the blockchain that will notify clients
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  // This notifies clients about the amount burnt
  event Burn(address indexed from, uint256 value);

  modifier onlyExistingUser {
    // Check if user exists or terminate
    require(!(users[msg.sender].name == 0x0));
    _;
  }






  // Authentication Function Calls
  function login() constant public onlyExistingUser returns (bytes32, string, string, address, uint[], uint[], uint256) {
    return (users[msg.sender].name, users[msg.sender].about, users[msg.sender].image, users[msg.sender].userAddress, users[msg.sender].myCourses, users[msg.sender].myPurchases,users[msg.sender].balance);
  }

  // Right now a user can keep signing up for freee tokens, need to check if user already exists

  function signup(bytes32 _name, string _about, string _image) public payable returns (bytes32, string, string, address, uint256) {
    users[msg.sender].name = _name;
    users[msg.sender].about = _about;
    users[msg.sender].image = _image;
    users[msg.sender].userAddress = msg.sender;
    escrow.contractBalance -= 100;
    users[msg.sender].balance += 100;
    return (users[msg.sender].name, users[msg.sender].about, users[msg.sender].image, users[msg.sender].userAddress, users[msg.sender].balance);
  }

  function update(bytes32 _name, string _about, string _image) public payable onlyExistingUser returns (bytes32, string, string) {
    users[msg.sender].name = _name;
    users[msg.sender].about = _about;
    users[msg.sender].image = _image;
    return (users[msg.sender].name, users[msg.sender].about, users[msg.sender].image);
  }  








  // Course Function Calls
  function addCourse(string _title, string _description, string _image, string _video, string _lessons) public returns(uint) {
    courses.length++;
    courses[courses.length-1].title = _title;
    courses[courses.length-1].description = _description;
    courses[courses.length-1].image = _image;
    courses[courses.length-1].video = _video;
    courses[courses.length-1].userAddress = msg.sender;
    courses[courses.length-1].lessons = _lessons;
    users[msg.sender].myCourses.push(courses.length-1);
    escrow.contractBalance -= 1000;
    users[msg.sender].balance += 1000;
    return courses.length;
  }

  function getCount() public constant returns(uint) {
    return courses.length;
  }

  function getCourse(uint index) public constant returns( string, string, string, address, uint ) {
    return ( courses[index].title, courses[index].description, courses[index].image, courses[index].userAddress, index );
  }

  function watchCourse(uint index) public constant returns( string, string, string, string, address, uint, string) {
    return ( courses[index].title, courses[index].description, courses[index].image, courses[index].video, courses[index].userAddress, index, courses[index].lessons );
  }

  function getPurchaseCount() public constant returns(uint length) {
    return users[msg.sender].myPurchases.length;
  }

  function getPurchaseId(uint index) public constant returns(uint) {
    return users[msg.sender].myPurchases[index];
  }






  // Token Function Calls

  /**
   * Internal transfer, only can be called by this contract
   */
  function _transfer(address _from, address _to, uint _value) internal {
      // Prevent transfer to 0x0 address. Use burn() instead
      require(_to != 0x0);
      // Check if the sender has enough
      require(users[_from].balance >= _value);
      // Check for overflows
      require(users[_to].balance + _value >= users[_to].balance);
      // Save this for an assertion in the future
      uint previousBalances = users[_from].balance + users[_to].balance;
      // Subtract from the sender
      users[_from].balance -= _value;
      // Add the same to the recipient
      users[_to].balance += _value;
      emit Transfer(_from, _to, _value);
      // Asserts are used to use static analysis to find bugs in your code. They should never fail
      assert(users[_from].balance + users[_to].balance == previousBalances);
  }

  /**
   * Transfer tokens
   *
   * Send `_value` tokens to `_to` from your account
   *
   * @param _to The address of the recipient
   * @param _value the amount to send
   */
  function transfer(address _to, uint256 _value, uint courseId ) public payable returns (uint) {
      users[msg.sender].myPurchases.push(courseId);
      _transfer(msg.sender, _to, _value);
      return users[msg.sender].myPurchases.length;
  }

  /**
   * Transfer tokens from other address
   *
   * Send `_value` tokens to `_to` on behalf of `_from`
   *
   * @param _from The address of the sender
   * @param _to The address of the recipient
   * @param _value the amount to send
   */
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
      require(_value <= allowance[_from][msg.sender]);     // Check allowance
      allowance[_from][msg.sender] -= _value;
      _transfer(_from, _to, _value);
      return true;
  }

  /**
   * Set allowance for other address
   *
   * Allows `_spender` to spend no more than `_value` tokens on your behalf
   *
   * @param _spender The address authorized to spend
   * @param _value the max amount they can spend
   */
  function approve(address _spender, uint256 _value) public
      returns (bool success) {
      allowance[msg.sender][_spender] = _value;
      emit Approval(msg.sender, _spender, _value);
      return true;
  }

  /**
   * Set allowance for other address and notify
   *
   * Allows `_spender` to spend no more than `_value` tokens on your behalf, and then ping the contract about it
   *
   * @param _spender The address authorized to spend
   * @param _value the max amount they can spend
   * @param _extraData some extra information to send to the approved contract
   */
  function approveAndCall(address _spender, uint256 _value, bytes _extraData)
      public
      returns (bool success) {
      tokenRecipient spender = tokenRecipient(_spender);
      if (approve(_spender, _value)) {
          spender.receiveApproval(msg.sender, _value, this, _extraData);
          return true;
      }
  }

  /**
   * Destroy tokens
   *
   * Remove `_value` tokens from the system irreversibly
   *
   * @param _value the amount of money to burn
   */
  function burn(uint256 _value) public returns (bool success) {
      require(users[msg.sender].balance >= _value);   // Check if the sender has enough
      users[msg.sender].balance -= _value;            // Subtract from the sender
      totalSupply -= _value;                      // Updates totalSupply
      emit Burn(msg.sender, _value);
      return true;
  }

  /**
   * Destroy tokens from other account
   *
   * Remove `_value` tokens from the system irreversibly on behalf of `_from`.
   *
   * @param _from the address of the sender
   * @param _value the amount of money to burn
   */
  function burnFrom(address _from, uint256 _value) public returns (bool success) {
      require(users[_from].balance >= _value);                // Check if the targeted balance is enough
      require(_value <= allowance[_from][msg.sender]);    // Check allowance
      users[_from].balance -= _value;                         // Subtract from the targeted balance
      allowance[_from][msg.sender] -= _value;             // Subtract from the sender's allowance
      totalSupply -= _value;                              // Update totalSupply
      emit Burn(_from, _value);
      return true;
  }

}
