AutoForm.hooks({
    briefsNU: {
        onSuccess: function(doc, result) {
            /*var existe = Tareas.findOne({'proyectoId': this.docId});
             if (existe){

             } else {
             Tareas.insert({
             proyectoId: this.docId,
             tareas: {}
             });
             }*/

            Router.go('briefView', {_id: this.docId});
            if (doc === 'insert'){

            }

        }
    }
});