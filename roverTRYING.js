class Rover {
    // Write code here!
    constructor(position){
       this.position = position;
       this.mode = 'NORMAL';
       this.generatorWatts = 110;
    }
    receiveMessage(message){
       let response = {
          message: message.name,
          results: []
       }
 
       
       for (let i = 0; i < message.commands.length; i++) {
          if(message.commands[i].commandType === 'STATUS_CHECK') {
            response.results.push({
              completed: true,
              roverStatus: {
                mode: this.mode, 
                generatorWatts: this.generatorWatts,                       position: this.position,
               },
            });
          } else if (message.commands[i].commandType === 'MODE_CHANGE') {
             response.results.push({
                completed: true,
             });
          }
       }
 
       return response;
    }
 }
 
 module.exports = Rover;



 it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with one command', commands);
    let rover = new Rover(19002);
    let response = rover.receiveMessage(message);
expect(response.results[0].roverStatus.mode).toEqual(rover.mode);
expect(response.results[0].roverStatus.generatorWatts).toEqual(rover.generatorWatts);
expect(response.results[0].roverStatus.position).toEqual(rover.position);
    
});






for (let i = 0; i < message.commands.length; i++) {
    if (message.commands[i].commandType === 'STATUS_CHECK') {
       response.results.push({
          completed: true,
          roverStatus: {
             mode: this.mode,
             generatorWatts: this.generatorWatts,
             position: this.position
          }
       });
    } else if(message.commands[i].commandType === "MODE_CHANGE") {
       if(message.commands[i].value === "NORMAL") {
         this.mode = message.commands[i].value
         response.results.push({
           completed: true
         });
       } else {
          this.mode = message.commands[i].value
         response.results.push({
           completed: false});
          
    }
 }

 return response;