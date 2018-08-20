var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var Educoin = artifacts.require("./Educoin.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Educoin);
  deployer.deploy(Educoin);
};
