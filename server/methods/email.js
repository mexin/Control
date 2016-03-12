Meteor.methods({
    sendProyectoAsig: function (doc) {

        var data = Proyectos.findOne({_id: doc});
        var user = Meteor.users.findOne({_id: data.responsableId});

        this.unblock();

        var fecha = {
            num: function () {
                return moment(data.fechaEntrega).format("DD MMMM YYYY");
            },
            esc: function () {
                var localtime = moment.utc(data.fechaEntrega).format('YYYY-MM-DD HH:mm:ss');
                return moment(localtime).fromNow()
            }
        };

        PrettyEmail.send('call-to-action', {
            to: user.username,
            subject: 'Nuevo Proyecto Asignado',
            heading: data.nombre,
            buttonText: 'Ver proyecto',
            buttonUrl: 'http://controldemo.luismexin.me/proyectos/'+ data._id,
            message: "<b>Deadline: </b>" + fecha.num + "<b> En: </b>" + fecha.esc + "<br>" +
            "<b>Cuenta: </b>" + data.cuenta + "<br>" +
            "<b>Descripción: </b>" + data.descripcion + "<br>"
        });
    },
    sendTareaAsig: function (doc) {

        var tarea = Tareas.findOne({_id: doc});
        var proj = Proyectos.findOne({_id: tarea.proyectoId});
        var tareaUser = Meteor.users.findOne({_id: tarea.usuarioId});

        PrettyEmail.send('call-to-action', {
            to: tareaUser.username,
            subject: 'Nueva Tarea Asignada',
            heading: proj.nombre,
            buttonText: 'Ver tarea',
            buttonUrl: 'http://controldemo.luismexin.me/proyectos/'+ proj._id,
            message: "<b>Tarea: </b>" + tarea.tarea + "<br>" +
            "<b>Asignada Por: </b>" + tarea.allocatorName + "<br>"
        });

    }
});