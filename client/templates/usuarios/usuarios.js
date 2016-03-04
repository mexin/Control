Meteor.subscribe('usuarios');

Template.usuarios.helpers({
    usuarios: function(){
        return Meteor.users.find({}, {"sort" : [['createdAt', 'desc']]});
    },
    createdAt: function(){
        return moment(this.createdAt).format("DD MMM YYYY");
    }
});

Template.usuarios.events({
    'click #editUsuario': function(e) {
        e.preventDefault();
        //var usuarioId = $(e.target).closest('tr').find('td').attr('data-id');

        ModalHelper.openModalFor(this._id);
    },
    'click #deleteUsuario': function(e) {
        e.preventDefault();
        Meteor.call('deleteUsuario', this._id, function (error, result) {
            if (error) {
                console.log(error);
            }
        });
    }
});