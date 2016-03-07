Briefs = new Mongo.Collection('briefs');

Briefs.attachSchema(new SimpleSchema({
    camp: {
        type: String,
        label: "Campaña",
        max: 40
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
    infoCorporativa: {
        type: String,
        label: "Información corporativa de la empresa",
        autoform: {
            afFieldInput: {
                rows: 5,
                type: 'summernote',
                class: 'editor' // optional

            }
        }
    },
    situacionActual: {
        type: String,
        label: "Situación Actual",
        autoform: {
            afFieldInput: {
                rows: 5,
                type: 'summernote',
                class: 'editor' // optional

            }
        }
    },
    competencia: {
        type: String,
        label: "Competencia",
        autoform: {
            afFieldInput: {
                rows: 5,
                type: 'summernote',
                class: 'editor' // optional

            }
        }
    },
    descMarca: {
        type: String,
        label: "Descripción de la Marca",
        autoform: {
            afFieldInput: {
                rows: 5,
                type: 'summernote',
                class: 'editor' // optional

            }
        }
    },
    descProducto: {
        type: String,
        label: "Descripción del Producto o Servicio",
        autoform: {
            afFieldInput: {
                rows: 5,
                type: 'summernote',
                class: 'editor' // optional
            }
        }
    },
    slogan: {
        type: String,
        label: "Slogan"
    },
    descProyecto: {
        type: String,
        label: "Descripción del Proyecto",
        autoform: {
            afFieldInput: {
                rows: 5,
                type: 'summernote',
                class: 'editor' // optional

            }
        }
    },
    canalesPublicitarios: {
        type: String,
        label: "Canales publicitarios interesados en promocionar",
        autoform: {
            afFieldInput: {
                rows: 5,
                type: 'summernote',
                class: 'editor' // optional

            }
        }
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
