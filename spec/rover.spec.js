const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  //TEST 7
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(98382); 
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });
  //TEST 8
  it("response returned by receiveMessage contains name of the message", function() {
    let commands = [new Command('MOVE', 1000)];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover(19002);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);
  });
  //TEST 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
  //  console.log(response);
    expect(response.results.length).toEqual(commands.length);
  });
  //TEST 10
  it("responds correctly to the status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
  //  console.log(response);
  expect(response.results[0].roverStatus.mode).toEqual(rover.mode);
  expect(response.results[0].roverStatus.generatorWatts).toEqual(rover.generatorWatts);
  expect(response.results[0].roverStatus.position).toEqual(rover.position);
  });


    //TEST 11
    it("responds correctly to the mode change command NORMAL", function() {
      let commands = [new Command('MODE_CHANGE', 'NORMAL')];
      let message = new Message('MODE CHANGE Normal', commands);
      let rover = new Rover(98382);
      let response = rover.receiveMessage(message);
      expect(response.results[0].completed).toBe(true);
      expect(rover.mode).toEqual('NORMAL');
    });

    //TEST 12
    it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 100)];
      let message = new Message('Low Power, cannot move', commands);
      let rover = new Rover(100);
      let response = rover.receiveMessage(message);
      expect(response.results[1].completed).toEqual(false);
      expect(rover.mode).toEqual('LOW_POWER');
    });

    //TEST 13
    it("responds with the position for the move command", function() {
      let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 123)];
      let message = new Message('MOVING', commands);
      let rover = new Rover(123);
      let response = rover.receiveMessage(message);
      expect(response.results[0].completed).toBe(true);
      expect(response.results[1].completed).toBe(true);
      expect(rover.position).toEqual(message.commands[1].value);
    });

});




