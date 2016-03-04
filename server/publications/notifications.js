Meteor.publishComposite("notifications", function() {
    if(this.userId){
        return {
            find: function() {
                return Notifications.find({usuarioId: this.userId});
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
