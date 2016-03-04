Template.projectComments.helpers({
    comments: function () {
        return Comentarios.find({}, {sort: {createdAt: -1}});
    },
    userComment: function () {
        return Meteor.users.findOne({_id: this.usuarioId});
    },
    createdAt: function () {
        var localtime = moment.utc(this.createdAt).format('YYYY-MM-DD HH:mm:ss');
        return {
            fecha: moment(this.createdAt).format("DD MMM YYYY hh:mm A"),
            momento: moment(this.createdAt).fromNow()
        }
    }
});

Template.projectComments.events({
    'submit .form-comment': function (e) {
        e.preventDefault();
        var comment = $('[name=comment]').val();

        Comentarios.insert({
            tipo: "Comentario Proyecto",
            attachId: this._id,
            comment: comment
        });
        $('[name=comment]').val('');
    }
});

Template.projectComments.onCreated(function () {
    //add your statement here
});

Template.projectComments.onRendered(function () {
    //add your statement here
});

Template.projectComments.onDestroyed(function () {
    //add your statement here
});

