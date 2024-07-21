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
      };

      
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
            }
         if(message.commands[i].commandType === "MODE_CHANGE") {
            this.mode = message.commands[i].value
            response.results.push({
            completed: true
            })
            }
         if(this.mode === 'LOW_POWER' && message.commands[i].commandType === 'MOVE') {
            response.results.push({completed: false});
            }               
         if(this.mode === 'NORMAL' && message.commands[i].commandType === 'MOVE') {
            response.results.push({completed: true});
            this.position = message.commands[i].value;
         };  
                                                  
                       
      }
      return response;
   
   }
}   
module.exports = Rover;