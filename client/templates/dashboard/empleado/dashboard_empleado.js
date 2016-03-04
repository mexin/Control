Template.dashboardEmpleado.helpers({
    proyectos: function () {
        return Proyectos.find({'responsableId': Meteor.userId(), 'estado': 'En Proceso'}, {"sort": [['createdAt', 'desc']], "limit": 10});
    },
    fechaEntrega : function () {
        return {
            fecha: moment(this.fechaEntrega).format("DD MMM YYYY"),
            diasFaltantes: moment(this.fechaEntrega).fromNow()
        }
    },
    'estadoCss': function () {
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

Template.dashboardEmpleado.events({
    //add your events here
});

Template.dashboardEmpleado.onCreated(function () {
    //add your statement here
});

Template.dashboardEmpleado.onRendered(function () {
    //add your statement here
});

Template.dashboardEmpleado.onDestroyed(function () {
    //add your statement here
});

