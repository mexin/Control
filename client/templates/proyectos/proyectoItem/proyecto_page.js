

Template.proyectosView.rendered = function () {
    $('[rel=tooltip]').tooltip(); //initialize all tooltips in this template
};

Template.proyectosView.helpers({
    createdAt: function () {
        return moment(this.createdAt).format("DD MMMM YYYY");
    },
    fechaEntrega: function () {
        var localtime = moment.utc(this.fechaEntrega).format('YYYY-MM-DD HH:mm:ss');
        return {
            fecha: moment(localtime).format("DD MMMM YYYY"),
            diasFaltantes: moment(localtime).fromNow()
        }
    },
    responsableUser: function () {
        return Meteor.users.findOne({'_id': this.responsableId});
    },
    tareas: function () {
        return Tareas.find({'proyectoId': this._id, terminado: false}, {sort: {terminado: false, createdAt: -1}});
    },
    tareasTerminadasView: function () {
        return Tareas.find({'proyectoId': this._id, terminado: true}, {sort: {terminado: false, createdAt: -1}});
    },
    todoEdit: function () {
        return Session.equals('todoItemId', this._id);
    },
    estadoEditHelper: function () {
        return Session.equals('estadoEdit', true);
    },
    prioridadEditHelper: function () {
        return Session.equals('prioridadEdit', this._id);
    },
    fechaEntregaHelper: function () {
        return Session.equals('fechaEntregaEdit', this._id);
    },
    selectedEdo: function (key) {
        if (key === this.estado) {
            return 'selected'
        }
    },
    selectedPrioridad: function (key) {
        if (key === this.prioridad) {
            return 'selected'
        }
    },
    tareaClass: function () {
        var status = this.terminado;
        if (status == true) {
            return 'terminado';
        }
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
    prioridadValores: function () {
        switch (this.prioridad) {
            case '1':
                return {
                    css: "label-danger",
                    text: " Urgeeee!!!"
                }
            case '2':
                return {
                    css: "label-success",
                    text: " Normal"
                }
            case '3':
                return {
                    css: "label-info",
                    text: " Baja"
                }
        }
    },
    userTareasTermindas: function () {
        return Tareas.find({'usuarioId': this.responsableId, 'terminado': true}).count();
    },
    userTareasPendientes: function () {
        return Tareas.find({'usuarioId': this.responsableId, 'terminado': false}).count();
    },
    'tareasTerminadas': function () {
        return Tareas.find({'proyectoId': this._id, 'terminado': true}).count();
    },
    'tareasNoTerminadas': function () {
        return Tareas.find({'proyectoId': this._id, 'terminado': false}).count();
    },
    'porcentajeTareas': function (tareasTerminadas, tareasNoTerminadas) {
        var terminados = Tareas.find({'proyectoId': this._id, 'terminado': true}).count();
        var noTerminados = Tareas.find({'proyectoId': this._id, 'terminado': false}).count();
        var total = terminados + noTerminados;

        return terminados * 100 / total;
    },
    allocator: function () {
        return {
            label: this.allocatorId === this.usuarioId ? " " : " " + this.allocatorName,
            tooltip: this.allocatorId === this.usuarioId ? "Yo" : " " + this.allocatorName
        }
    }
});

var saveTarea = function () {
    var editItem = {
        tarea: $("#tareaTexEdit").val()
    }

    var tareaID = Session.get('todoItemId');
    var tarea = Tareas.findOne({_id: tareaID});

    if (editItem.tarea !== tarea.tarea) {
        Tareas.update(Session.get('todoItemId'), {$set: editItem}, function (error, result) {
            if (error) console.log(error);
            if (result) {
                console.log(tareaID);
                if (tarea.allocatorId !== tarea.usuarioId) {
                    Meteor.call('sendTareaAsig', tareaID); //Enviamos notificacion de tarea asignada por allocatorName
                    console.log('Se supone que se envio la notificacion')
                }
            }
        });
    }
    Session.set('todoItemId', null);
}

var savePrioridad = function () {
    var editItem = {
        prioridad: $("#inputPrioridad").val()
    }

    Tareas.update(Session.get('prioridadEdit'), {$set: editItem});
}

var saveFechaEntrega = function () {
    var dayFormat = $("#inputFechaEntrega").val();
    var editItem = {
        deadline: dayFormat
    }
    Tareas.update(Session.get('fechaEntregaEdit'), {$set: editItem});
}

Template.proyectosView.events({
    'click #crearTarea': function (e) {
        e.preventDefault();
        var tarea = {
            _id: this._id,
            uId: this.responsableId,
            allocatorId: Meteor.user()._id,
            allocatorName: Meteor.user().profile.name
        }
        Tareas.insert({
            proyectoId: tarea._id,
            usuarioId: tarea.uId,
            allocatorId: tarea.allocatorId,
            allocatorName: tarea.allocatorName,
            tarea: 'Tarea Nueva, Click Aquí para editar.',
            terminado: false,
            prioridad: 2
        });
    },
    'click .toggle-checked': function (e) {
        e.preventDefault();
        Tareas.update(this._id, {
            $set: {terminado: !this.terminado}
        });
    },
    'click .delete': function (e) {
        e.preventDefault();
        Tareas.remove(this._id);
    },
    'click #tareaText': function (e) {
        e.preventDefault();
        Session.set('todoItemId', this._id);
    },
    'change #tareaTexEdit': function (e) {
        e.preventDefault();
        saveTarea();
        Session.set('todoItemId', null);
    },
    'blur #tareaTexEdit': function (e) {
        e.preventDefault();
        Session.set('todoItemId', null);
    },
    'keypress #tareaTexEdit': function (e) {
        if (e.keyCode === 13) {
            saveTarea();
        }
        else if (e.keyCode === 27) {
            Session.set('todoItemId', null);
        }
    },
    'click #estadoProyecto': function (e) {
        e.preventDefault();
        Session.set('estadoEdit', true);

    },
    'click #estadoSave': function (e) {
        e.preventDefault();
        var estado = $("#inputEdo").val();
        Proyectos.update({_id: this._id}, {
            $set: {estado: estado}
        });
        Session.set('estadoEdit', null);
    },
    'click #estadoCancel': function (e) {
        e.preventDefault();
        Session.set('estadoEdit', null);
    },
    'click #prioridadEdit': function (e) {
        e.preventDefault();
        Session.set('prioridadEdit', this._id);
    },
    'change #inputPrioridad': function (e) {
        e.preventDefault();
        savePrioridad();
        Session.set('prioridadEdit', null);
    },
    'blur #inputPrioridad': function (e) {
        e.preventDefault();
        Session.set('prioridadEdit', null);
    },
    'keypress #inputPrioridad': function (e) {
        if (e.keyCode === 13) {
            savePrioridad();
        }
        else if (e.keyCode === 27) {
            Session.set('prioridadEdit', null);
        }
    },
    'click #fechaEntregaEdit': function (e) {
        e.preventDefault();
        Session.set('fechaEntregaEdit', this._id);
    },
    'change #inputFechaEntrega': function (e) {
        e.preventDefault();
        console.log($("#inputFechaEntrega").val());
        saveFechaEntrega();
        Session.set('fechaEntregaEdit', null);
    },
    'blur #inputFechaEntrega': function (e) {
        e.preventDefault();
        Session.set('fechaEntregaEdit', null);
    }
});

Tracker.autorun(function () {
    var todoItem = Session.get('todoItemId');

    if (todoItem) {
        Tracker.afterFlush(function () {
            $('#tareaTexEdit').focus().select();
        });
    }

    Tracker.afterFlush(function () {
        $('[rel=tooltip]').tooltip(); // we call again .tooltip() so it will show on the new created items.
    });
});
