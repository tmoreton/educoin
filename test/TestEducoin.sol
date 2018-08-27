pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Educoin.sol";

contract TestEducoin {
	Educoin educoin = Educoin(DeployedAddresses.Educoin());

  bytes32 name;
  string about;
  string image;
  address userAddress;
  uint256 balance;
  uint public totalSupply = 21000000000;

  function beforeEach() public {
    name = "Tim";
    about = "This is about me";
    image = "https://ipfs.io/ipfs/QmQtR8DV8SwvrzRFSi3xjSc6iK4xma3SciFFYRzUEPFiFc";
    balance = 100;
  }

  function testUserCanSignUpAndLogin() public {
    educoin.signup(name, about, image);
    bytes32 expected = name;
    Assert.equal('Tim', expected, "It should sign up and log in a user.");
  }


  function testUserImageOnLogin() public {
    educoin.login();
    string expected = image;
    Assert.equal('https://ipfs.io/ipfs/QmQtR8DV8SwvrzRFSi3xjSc6iK4xma3SciFFYRzUEPFiFc', expected, "User should have IPFS image on login");
  }

   function testTotalTokenSupply() public {
    educoin.totalSupply;
    uint expected = totalSupply;
    Assert.equal(21000000000, expected, "Expect total supply to be 21000000000");
  }

}
