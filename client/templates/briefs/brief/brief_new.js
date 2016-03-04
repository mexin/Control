Template.briefNew.helpers({
    tipoOperacion: function () {
        if (_.isEmpty(this)) {
            return {
                heading: 'Crear Nuevo Brief',
                tipo: 'insert'
            }
        } else {
            return {
                heading: 'Editar Brief',
                tipo: 'update'
            }
        }
    }
});

Template.briefNew.events({
    //add your events here
});

Template.briefNew.onCreated(function () {
    //add your statement here
});

Template.briefNew.onRendered(function () {
    //add your statement here
});

Template.briefNew.onDestroyed(function () {
    //add your statement here
});
