Notifications = new Mongo.Collection('notifications');

Notifications.attachSchema(new SimpleSchema({
    docId: {
        type: String
    },
    usuarioId: {
        type: String,
        max: 255
    },
    allocator: {
        type: String
    },
    descripcion: {
        type: String
    },
    read: {
        type: Boolean
    }
}));
