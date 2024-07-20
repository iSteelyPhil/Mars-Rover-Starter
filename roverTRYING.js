class Rover {
    constructor(position){
       this.position = position;
       this.mode = 'NORMAL';
       this.generatorWatts = 110;
    }
    receiveMessage(message) {
       let response = {
          message: message.name,
          results: []
       };
 
       for (let i = 0; i < message.commands.length; i++) {
          let command = message.commands[i];
 
          if (command.commandType === 'STATUS_CHECK') {
             response.results.push({
                completed: true,
                roverStatus: {
                   mode: this.mode,
                   generatorWatts: this.generatorWatts,
                   position: this.position
                }
             });
          } else if (command.commandType === 'MODE_CHANGE') {
             this.mode = command.value;
             response.results.push({
                completed: true
             });
          }
       }
 
       return response;  // Make sure to return the response object
    }
 }
 
 module.exports = Rover;