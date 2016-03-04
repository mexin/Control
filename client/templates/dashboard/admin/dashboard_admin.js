Template.dashboardAdmin.rendered = function () {
    $('[rel=tooltip]').tooltip(); //initialize all tooltips in this template
};
Template.dashboardAdmin.helpers({
    'proyectos': function () {
        return Proyectos.find({'estado': 'En Proceso'}, {"sort": [['createdAt', 'desc']], "limit": 10});
    },
    'staff': function () {
      return Meteor.users.find();
    },
    'createdAt': function () {
        return moment(this.createdAt).format("DD MMMM YYYY");
    },
    fechaEntrega : function () {
        var localtime = moment.utc(this.fechaEntrega).format('YYYY-MM-DD HH:mm:ss');
        return {
            fecha: moment(localtime).format("DD MMM YYYY"),
            diasFaltantes: moment(localtime).fromNow()
        }
    },
    'responsableUser': function () {
        return Meteor.users.findOne({'_id': this.responsableId});
    },
    'tareas': function () {
        return Tareas.find({'proyectoId': this._id}, {sort: {terminado: false, createdAt: -1}});
    },
    'todoEdit': function () {
        return Session.equals('todoItemId', this._id);
    },
    'tareaClass': function () {
        var status = this.terminado;
        if (status == true) {
            return 'terminado';
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

Template.dashboardAdmin.events({
    //add your events here
});

Template.dashboardAdmin.onCreated(function () {
    //add your statement here
});

Template.dashboardAdmin.onRendered(function () {
    //add your statement here
});

Template.dashboardAdmin.onDestroyed(function () {
    //add your statement here
});

