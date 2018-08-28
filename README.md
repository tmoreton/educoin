# Educoin

## Try It Out on Ropsten

https://educoin.herokuapp.com/

[![Test Video](https://img.youtube.com/vi/mbeoibOt0eg/0.jpg)](https://www.youtube.com/watch?v=mbeoibOt0eg)

## A decentralized course platform built for the content creators

Educoin is a decentralized blockchain application which allows users that contribute valuable content to the platform to be rewarded with Educoin tokens. There are so many online course platforms in which users can upload courses and get paid through the platform but as a result, the platform takes 75% and sometimes even more of the profit from the creator. The idea behind Educoin is to give the power back to the creators. Youtube, Udemy, Skillshare and many other companies are only as valuable as the content their users upload to their site so as a result those users should be rewarded. 

I created a token system which rewards users who contribute the most to the platform and can even redeem those tokens for other courses they can then take. The creators get 100% of the profits and a stake in the success of the overall ecosystem as a reward.


## Educoin Functionality

In the first iteration of the proof of concept platform, users with an ethereum enabled wallet browser like Mist of browser extension Metamask can view current courses available for purchase on the dapp. Users can also signup/login with their ETH address on the Educoin contract to receive 100 free tokens for the ability to buy one course. Users can then earn more tokens by creating and uploading their own courses providing incentive to contribute to the platform. They will also be paid 100% of the profits (100 tokens per transaction) which they can then use to purchase other courses on the platform.

All of the content uploaded is using IPFS (Interplanetary File System) to provide a new way of storing content without the use of AWS or any other centralized storage system. 


## How To Use

### Ropsten (test network)

* Step 1 - Download Metamask Browser Extension
* Step 2 - Select Ropsten Test Network from dropdown
* Step 3 - Request test ether from metamask faucet https://faucet.metamask.io/
* Step 4 - Visit heroku instance of Educoin App https://educoin.herokuapp.com/
* Step 5 - Browse courses on test blockchain and create user account with test funds to receive 100 free tokens (each course costs 100 EDU tokens plus ether transaction fees)
* Step 6 - Watch purchased and created courses from profile page
* Step 7 - Test course creation upload to receive 1000 tokens from contract escrow account

### Localhost

* Step 1 - Download Metamask Browser Extension
* Step 2 - Select Private Network http://127.0.0.1:7545
* Step 3 - Download Code from Github https://github.com/tmoreton/educoin
* Step 4 - cd into folder and npm install
* Step 5 - Download & Run Gnache https://truffleframework.com/ganache 
* Step 6 - run 'truffle compile' to compile contract into build folder
* Step 7 - run 'truffle migrate' to migrate build contract to Gnache
* Step 8 - run 'truffle test' to run tests
* Step 9 - run 'npm start' to view dev env 
* Step 10 - Browse courses on test blockchain and create user account with test funds to receive 100 free tokens (each course costs 100 EDU tokens plus ether transaction fees)
* Step 11 - Watch purchased and created courses from profile page
* Step 12 - Test course creation upload to receive 1000 tokens from contract escrow account


