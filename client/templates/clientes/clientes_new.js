Template.clientesNuevo.helpers({

});

AutoForm.hooks({
    clientesNuevo: {
        onSuccess: function(doc, result) {

            Router.go('clientes');

        }
    }
});