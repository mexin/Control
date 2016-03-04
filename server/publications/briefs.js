Meteor.publishComposite("briefs", function() {
    if(this.userId){
        return {
            find: function() {
                return Briefs.find({});
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
