var Educoin = artifacts.require("./Educoin.sol");

contract('Educoin', function(accounts) {

  const userObject = {
    name: "Tim",
    about: "This is about me",
    image: "https://ipfs.io/ipfs/QmQtR8DV8SwvrzRFSi3xjSc6iK4xma3SciFFYRzUEPFiFc",
    myCourses: [],
    myPurchases: [],
    userAddress: accounts[0],
    balance: accounts[0].balance
  };

  const course = {
    title: 'How to Build Tinder',
    description: 'course description here',
    image: 'https://ipfs.io/ipfs/QmVVgwMCnNfDxFp7opt7bSFHsAjMjtGLmFRdmagvGzTGdN',
    video: 'https://ipfs.io/ipfs/QmSWjRj5QbZf2o6N8suJ92HqovbURhiWwFe2fqrUrt1yHY',
    userAddress: accounts[0],
    lessons: ''
  }
  

  it("...should put 2100000000 Educoin in the first account", function() {
    return Educoin.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0])
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 2100000000, "2100000000 wasn't in the first account");
    });
  });


  it("...should sign up and log in a user.", function() {
    return Educoin.deployed().then(function(instance) {
      educoinInstance = instance;
      return educoinInstance.signup('name', 'about', 'image', {from: accounts[0]});

    }).then(function() {
      return educoinInstance.login.call();

    }).then(function(userObject) {
      assert.equal(web3.toUtf8(userObject[0]), 'name', 'The user was not signed up.');
      assert.equal(userObject[1], 'about', 'No about me');
      assert.equal(userObject[2], 'image', 'No image');
    });
  });


  it("...should assign 100 tokens to users on signup & 21000000 to owner", function() {
    return Educoin.deployed().then(function(instance) {
      educoinInstance = instance;
      return educoinInstance.signup('name', 'about', 'image', {from: accounts[1]});

    }).then(function() {
      return educoinInstance.login.call();

    }).then(function(userObject) {
      assert.equal(userObject[6].toNumber(), 2100000100, 'User doesnt get 100 tokens for signing up');
    });
  });


  it("...user can upload course and watch uploaded course.", function() {
    return Educoin.deployed().then(function(instance) {
      educoinInstance = instance;
      return educoinInstance.addCourse(course.title, course.description, course.image, course.video, course.lessons, {from: accounts[0]});

    }).then(function() {
      return educoinInstance.getCourse.call(0);

    }).then(function(course) {
      assert.equal(course[0], 'How to Build Tinder', 'No course title on upload');
      assert.equal(course[1], 'course description here', 'No course description on upload');
      assert.equal(course[2], 'https://ipfs.io/ipfs/QmVVgwMCnNfDxFp7opt7bSFHsAjMjtGLmFRdmagvGzTGdN', 'No course image on upload');
    });
  });



  it("...user can purchase a course and watch it later.", function() {
    return Educoin.deployed().then(function(instance) {
      educoinInstance = instance;
      
      return educoinInstance.transfer(accounts[1], 100, 0, {from: accounts[0]});

    }).then(function() {
      return educoinInstance.getCourse.call(0);

    }).then(function(course) {
      assert.equal(course[0], 'How to Build Tinder', 'No course title on upload');
    });
  });


  it("...should send coin correctly", function() {
    var educoinInstance;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 100;

    return Educoin.deployed().then(function(instance) {
      educoinInstance = instance;
      return educoinInstance.getBalance.call(account_one);

    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return educoinInstance.getBalance.call(account_two);

    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return educoinInstance.transfer(account_two, amount, 0, {from: account_one});

    }).then(function() {
      return educoinInstance.getBalance.call(account_one);

    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return educoinInstance.getBalance.call(account_two);

    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });


});
