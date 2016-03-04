Meteor.subscribe('notifications');

Template._appHeader.helpers({
    notifications: function () {
        return Notifications.find({usuarioId: Meteor.userId(), read: false});
    },
    notificationsTotal: function () {
        var total = Notifications.find({usuarioId: Meteor.userId(), read: false}).count();
        if (total > 1 || total == 0) {
            return {
                text: 'notificaciones',
                num: total
            }
        }
        return {
            text: 'notificación',
            num: total
        }
    },
    proyectos: function () {
        Meteor.subscribe('proyectos');
        return Proyectos.find({
            responsableId: Meteor.user()._id,
            estado: "En Proceso"
        }, {"sort": [['createdAt', 'desc']], "limit": 10});
    },
    proyectostTotal: function () {
        var total = Proyectos.find({responsableId: Meteor.user()._id, estado: "En Proceso"}).count();
        if (total > 1) {
            return {
                text: 'proyectos',
                num: total
            }
        }
        return {
            text: 'proyecto',
            num: total
        }
    },
    tareasTotal: function () {
        return Tareas.find({'usuarioId': Meteor.user()._id}).count();
    },
    porcentajeTareas: function () {
        var terminados = Tareas.find({'proyectoId': this._id, 'terminado': true}).count();
        var noTerminados = Tareas.find({'proyectoId': this._id, 'terminado': false}).count();
        if (terminados && noTerminados !== undefined) {
            var total = terminados + noTerminados;
            return Math.round(terminados * 100 / total);
        }
        return 0;
    },
    porcentaje: function () {
        return Math.round(this.porcentajeTareas);
    },
    createdAt: function () {
        return moment(this.createdAt).format("DD MMM YYYY");
    },
    onlineStatus: function () {
        var status = Session.get('status');
        switch (status) {
            case "success":
                return {
                    color: 'success',
                    text: 'Online'
                }
            case "warning":
                return {
                    color: 'warning',
                    text: 'Connecting...'
                }
            case "danger":
                return {
                    color: 'danger',
                    text: 'Offline'
                }
        }
    }
});

Template._appHeader.events({
    'click #usuariosNew': function (e) {
        e.preventDefault();
        ModalHelper.openModalFor(null);
    }
});