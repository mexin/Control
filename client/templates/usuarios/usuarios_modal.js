var usuarioFetch = function () {
    var usuarioId = Session.get('selectedUserId');
    return Meteor.users.findOne(usuarioId);
}

Template.usuariosModal.helpers({
    usuario: function () {
        var usuarioId = Session.get('selectedUserId');
        if (typeof usuarioId !== "undefined") {
            var usuario = Meteor.users.findOne(usuarioId);
            return usuario;
        } else {
            return {
                username: '',
                email: '',
                password: '',
                profile: {
                    name: '',
                    departamento: ''
                },
            }
        }
    },
    selectedDepto: function (key) {
        if(key === usuarioFetch().profile.departamento ){
            return 'selected'
        }
    },
    selectedRol: function (key) {
        if(key === usuarioFetch().roles[0]){
            return 'selected'
        }
    },
    checkPassMatch: function () {
        var pass = $('[id=inputPassword]').val();
        var passCheck = $('[id=inputPasswordCheck]').val();

        if (pass != passCheck) {
            return "Password don't match.";
        } else {
            return "Password OK";
        }
    }
});

Template.usuariosModal.events({
    "click #usuarioGuardar": function (e) {
        e.preventDefault();

        var usuarioId = Session.get('selectedUserId');
        //create object usuario with form data
        var usuario = {
            nombre: $('[id=inputNombre]').val(),
            email: $('[id=inputEmail]').val(),
            password: $('[id=inputPassword]').val(),
            depto: $('[id=inputDepto]').val(),
            rol: $('[id=inputRol]').val()
        }
        if (usuarioId === null || undefined) {
            Meteor.call('createUsuario', usuario, function (error, result) {
                if (error) {
                    console.log(error);
                }
            });
        } else {
            // Add usuarioId to usuario Object
            _.extend(usuario, {id: usuarioId});
            Meteor.call('editUsuario', usuario, function (error, result) {
                if (error) {
                    console.log(error);
                }
            });
        }

        Modal.hide('usuariosModal');

    }
});
