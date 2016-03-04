Meteor.methods({
    'tareaNueva': function(tarea) {
        Tareas.insert({
            proyectoId: tarea._id,
            usuarioId: tarea.usuarioid,
            tarea: 'Tarea Nueva, Click Aquí para editar.',
            terminado: false
        });
    }
});