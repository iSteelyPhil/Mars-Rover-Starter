class Message {
   // Write code here!
   constructor(name, commands){
      this.name = name;
      if (!name) {
         throw Error("Name must be passed.");
       }
      this.commands = commands
   }
}

module.exports = Message;