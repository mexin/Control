

Template.proyectos.helpers({
    proyectos: function () {
        user = Meteor.user();
        if (Roles.userIsInRole(user, ['admin'])) {
            return Proyectos.find({}, {"sort": [['createdAt', 'desc']]});
        } else {
            return Proyectos.find({responsableId: Meteor.userId()}, {"sort": [['createdAt', 'desc']]});
        }
    },
    createdAt: function () {
        return moment(this.createdAt).format("DD MMM YYYY");
    },
    fechaEntrega : function () {
        return {
            fecha: moment(this.fechaEntrega).format("DD MMM YYYY"),
            diasFaltantes: moment(this.fechaEntrega).fromNow()
        }
    },
    cliente: function () {
        return Clientes.findOne({_id: this.cliente});

    },
    estadoCss: function () {
        switch (this.estado) {
            case 'En Proceso':
                return "label-info";
            case 'Terminado':
                return "label-success";
            case 'Cancelado':
                return "label-danger";
        }
    },
    'tareasTerminadas': function () {
        return Tareas.find({'proyectoId': this._id, 'terminado': true}).count();
    },
    'tareasNoTerminadas': function () {
        return Tareas.find({'proyectoId': this._id, 'terminado': false}).count();
    },
    'porcentajeTareas': function () {
        var terminados = Tareas.find({'proyectoId': this._id, 'terminado': true}).count();
        var noTerminados = Tareas.find({'proyectoId': this._id, 'terminado': false}).count();
        var total = terminados + noTerminados;

        return terminados * 100 / total;
    }
});

Template.proyectos.events({
    'click #editProyecto': function (e) {
        e.preventDefault();
        ModalHelperProyecto.openModalFor(this._id);
    },
});