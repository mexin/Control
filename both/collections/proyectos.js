Proyectos = new Mongo.Collection('proyectos');

Proyectos.attachSchema(new SimpleSchema({
    nombre: {
        type: String,
        label: "Nombre de Proyecto",
        max: 40,
        autoform: {
            autocomplete: 'off'
        },
        optional: false
    },
    descripcion: {
        type: String,
        label: "Descrición de Proyecto",
        autoform: {
            afFieldInput: {
                rows: 5,
                type: 'summernote',
                class: 'editor' // optional
            }
        },
        optional: false
    },
    estado: {
        type: String,
        label: "Estado",
        autoValue: function () {
            if (this.isInsert) {
                return "En Proceso";
            }
        },
        autoform: {
            type: "hidden",
            label: false
        },
        optional: true
    },
    fechaEntrega: {
        type: Date,
        label: "Fecha Entrega",
        optional: false
    },
    cuenta: {
        type: String,
        autoform: {
            autocomplete: 'off',
            afFieldInput: {
                type: 'autocomplete-input',
                label: 'Cuenta',
                settings: function () {
                    return {
                        position: "down",
                        limit: 5,
                        rules: [
                            {
                                collection: Clientes,
                                field: 'nombre',
                                matchAll: true,
                                template: Template.clientPill
                            }
                        ]
                    };
                }
            }
        },
        optional: false
    },
    cuentaId: {
        type: String,
        autoValue: function () {
            var cuenta = this.field('cuenta').value;
            var cuentaId = Clientes.findOne({'nombre': cuenta});

            if (this.isInsert) {
                return cuentaId._id;
            } else if (this.isUpsert) {
                return cuentaId._id;
                /*} else if (this.isUpdate) {
                 return cuentaId._id;*/
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
    responsable: {
        type: String,
        autoform: {
            autocomplete: 'off',
            afFieldInput: {
                type: 'autocomplete-input',
                label: 'Responsable',
                settings: function () {
                    return {
                        position: "down",
                        limit: 5,
                        rules: [
                            {
                                collection: Meteor.users,
                                field: 'profile.name',
                                matchAll: true,
                                template: Template.userPill
                            }
                        ]
                    };
                }
            }
        },
        optional: false
    },
    responsableId: {
        type: String,
        autoValue: function () {
            var usuario = this.field('responsable').value;
            var userId = Meteor.users.findOne({'profile.name': usuario});

            if (this.isInsert) {
                return userId._id;
            } else if (this.isUpsert) {
                return userId._id;
                /*} else if (this.isUpdate) {
                 return userId._id;*/
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