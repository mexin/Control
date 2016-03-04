Meteor.publishComposite("clientes", function() {
  if(this.userId){
    return {
      find: function() {
        return Clientes.find({});
      }
      // ,
      // children: [
      //   {
      //     find: function(item) {
      //       return [];
      //     }
      //   }
      // ]
    }
  }
});
