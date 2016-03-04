Tareas.after.insert (function (userId, doc){
    if(doc.usuarioId !== doc.allocatorId){
        //Notifications.insert({
        //    usuarioId: doc.usuarioId,
        //    descripcion: doc.allocatorName + " te ha asignado una tarea.",
        //    allocator: doc.allocatorName,
        //    read: false
        //});
        Meteor.call('newNotification', doc);
    }
});

Tareas.after.remove (function (userId, doc){

});