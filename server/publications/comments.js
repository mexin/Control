Meteor.publishComposite("comentarios", function(id) {
    if(this.userId){
        return {
            find: function() {
                return Comentarios.find({attachId: id});
            }
            //,
            //children: [
            //  {
            //    find: function(proyecto) {
            //      return Meteor.users.find(
            //          { _id: post.authorId },
            //          { limit: 1, fields: { profile: 1 } });
            //    }
            //  }
            //]
        }
    }
});