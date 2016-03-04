Meteor.publishComposite("proyectos", function() {
  if(this.userId){
    return {
      find: function() {
        return Proyectos.find({});
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