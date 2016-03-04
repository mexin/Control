AutoForm.hooks({
    proyectosNU: {
        onSuccess: function(doc, result) {
            /*var existe = Tareas.findOne({'proyectoId': this.docId});
            if (existe){

            } else {
                Tareas.insert({
                    proyectoId: this.docId,
                    tareas: {}
                });
            }*/

            Router.go('proyectosView', {_id: this.docId});
            if (doc === 'insert'){
                Meteor.call('sendProyectoAsig', result);
            }

        }
    }
});