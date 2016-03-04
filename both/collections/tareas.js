Tareas = new Mongo.Collection('tareas');

Tareas.attachSchema(new SimpleSchema({
    proyectoId: {
        type: String,
        max: 255
    },
    usuarioId: {
        type: String,
        max: 255
    },
    allocatorId: {
      type: String
    },
    allocatorName: {
      type: String
    },
    tarea: {
        type: String,
        label: "Descripción de Tarea",
        max: 140,
        autoform: {
            rows: 3
        }
    },
    terminado: {
        type: Boolean,
        label: "Terminado"
    },
    prioridad: {
        type: String,
        label: "Prioridad"
    },
    deadline: {
        type: Date,
        label: "Fecha de Entrega",
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
        }
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
