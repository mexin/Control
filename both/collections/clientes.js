Clientes = new Mongo.Collection('clientes');

Clientes.attachSchema(new SimpleSchema({
    nombre: {
        type: String,
        label: "Nombre",
        max: 40
    },
    direccionFisica: {
        type: String,
        label: "Dirección Fisica",
    },
    telefono: {
        type: Number,
        label: "Teléfono",
        autoform: {
            afFieldInput: {
                type: "tel"
            },
            optional: true
        }
    },
    email: {
        type: String,
        label: "E-Mail",
    },
    personaContacto: {
        type: String,
        label: "Persona de Contacto",
    },
    personaEmail: {
        type: String,
        label: "E-mail de Persona",
    },
    rfc: {
        type: String,
        label: "RFC",
        max: 15
    },
    razonSocial: {
        type: String,
        label: "Razón Social",
    },
    direccionFiscal: {
        type: String,
        label: "Dirección Fiscal",
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
        denyInsert: true,
        optional: true
    }

}))
