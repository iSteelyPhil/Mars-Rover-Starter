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
                              if(message.commands[i].value === "LOW_POWER") {
                              this.mode = message.commands[i].value
                              response.results.push({
                              completed: false
                           
                           });
                              } else if(message.commands[i].value === "NORMAL"){
                                 this.mode = message.commands[i].value
                                 response.results.push({
                                 completed: true});
                           
                           }
                        }
                      if(message.commands[i].commandType === "MOVE") {
                           if(this.mode === 'LOW_POWER'){
                              response.results.push({
                                 completed: false});
                           }else{
                           this.position = message.commands[i].value
                           response.results.push({
                           completed: true
                        });
                       
                       
                     }
                  }
                     }
                 
               
      return response;
   
         }
   }   
  
module.exports = Rover;