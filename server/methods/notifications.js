Meteor.methods({
    'newNotification': function(noti) {
        Notifications.insert({
            docId: noti._id,
            usuarioId: noti.usuarioId,
            descripcion: noti.allocatorName + " te ha assignado una tarea nueva.",
            allocator: noti.allocatorName,
            read: false
        });
    }
});