Comentarios = new Mongo.Collection('comentarios');

Comentarios.attachSchema(new SimpleSchema({
    tipo: {
        type: String,
        label: "Tipo",
        max: 40,
        autoform: {
            autocomplete: 'off'
        },
        optional: false
    },
    attachId: {
        type: String,
        label: "Documento Anexo",
        optional: false
    },
    usuarioId: {
        type: String,
        autoValue: function () {
            return Meteor.userId();
        },
        autoform: {
            type: "hidden",
            label: false
        },
        optional: false
    },
    comment: {
        type: String,
        label: 'Comentario',
        autoform: {
            afFieldInput: {
                rows: 5,
                type: 'summernote',
                class: 'editor' // optional
            }
        },
        optional: false
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        },
        autoform: {
            type: "hidden",
            label: false
        },
        optional: true
    },
    updatedAt: {
        type: Date,
        autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        },
        autoform: {
            type: "hidden",
            label: false
        },
        denyInsert: true,
        optional: true
    }
}));