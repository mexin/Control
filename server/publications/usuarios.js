Meteor.publishComposite("usuarios", function() {
  if(this.userId){
    return {
      find: function() {
        return Meteor.users.find({});
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


