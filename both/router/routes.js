// Router.route('/', {
//   name: 'home',
//   layoutTemplate: 'publicLayout'
// });

Router.route('/', {
    name: 'dashboard',
    template: 'dashboard',
    waitOn: function () {
        Meteor.subscribe('clientes');
        Meteor.subscribe('proyectos');
        Meteor.subscribe('tareas');
        Meteor.subscribe('usuarios');
    }
});
//--------------->
// Rutas de Proyectos
Router.route('/proyectos', {
    name: 'proyectos',
    template: 'proyectos',
    waitOn: function () {
        Meteor.subscribe('proyectos');
        Meteor.subscribe('tareas');
        Meteor.subscribe('usuarios');
    }
});
Router.route('/proyectos/nuevo', {
    name: 'proyectoNuevo',
    template: 'proyectoNuevo',
    waitOn: function () {
        Meteor.subscribe('clientes')
    }
});
Router.route('/proyectos/edit/:_id', {
    name: 'proyectoEdit',
    template: 'proyectoNuevo',
    waitOn: function () {
        Meteor.subscribe('proyectos');
        Meteor.subscribe('clientes')
    },
    data: function () {
        return Proyectos.findOne(this.params._id);
    }

});
Router.route('/proyectos/:_id', {
    name: 'proyectosView',
    template: 'proyectosView',
    waitOn: function () {
        Meteor.subscribe('proyectos', this.params._id);
        Meteor.subscribe('clientes');
        Meteor.subscribe('tareas');
        Meteor.subscribe('comentarios', this.params._id);
    },
    data: function () {
        return Proyectos.findOne(this.params._id);
    }
});
//--------------->
// Rutas de Briefs
Router.route('/briefs', {
    name: 'briefs',
    template: 'briefs',
    waitOn: function () {
        Meteor.subscribe('briefs');
        Meteor.subscribe('clientes');
    }
});
Router.route('/briefs/nuevo', {
    name: 'briefNew',
    template: 'briefNew',
    waitOn: function () {
        Meteor.subscribe('clientes');
    }
});
Router.route('/briefs/edit/:_id', {
    name: 'briefsEdit',
    template: 'briefNew',
    waitOn: function () {
        Meteor.subscribe('briefs');
        Meteor.subscribe('clientes')
    },
    data: function () {
        return Briefs.findOne(this.params._id);
    }

});
Router.route('/briefs/:_id', {
   name: 'briefView',
    template: 'briefView',
    waitOn: function () {
        Meteor.subscribe('briefs', this.params._id);
        Meteor.subscribe('proyectos');
        Meteor.subscribe('clientes');
        Meteor.subscribe('comentarios', this.params._id);
    },
    data: function () {
        return Briefs.findOne(this.params._id);
    }
});

// -------------->
// Rutas de Cuentas y Clientes
Router.route('/clientes', {
    name: 'clientes',
    template: 'clientes',
    waitOn: function () {
        Meteor.subscribe('clientes')
    }
})
;
Router.route('/clientes/nuevo', {
    name: 'clientesNuevo',
    template: 'clientesNuevo'
});
Router.route('/clientes/edit/:_id', {
    name: 'clientesEdit',
    template: 'clientesNuevo',
    waitOn: function () {

    },
    data: function () {
        return Clientes.findOne(this.params._id);
    }
});

// -------------->
// Rutas de usuarios
Router.route('/usuarios', {
    name: 'usuarios',
    template: 'usuarios'
});

Router.route('/profile/:_id', {
    name: 'userProfile',
    template: 'userProfile',
    waitOn: function () {
        Meteor.subscribe('clientes');
        Meteor.subscribe('proyectos');
        Meteor.subscribe('tareas');
        Meteor.subscribe('usuarios');
    },
    data: function () {
        return Meteor.users.findOne(this.params._id);
    }
});

//acceso con login solamente
Router.plugin('ensureSignedIn', {
    only: ['dashboard', 'proyectos', 'briefs', 'briefNew', 'proyectoEdit', 'proyectosView', 'clientes', 'proyectoNuevo', 'clientesNuevo', 'usuarios']
});

var requireAdminRole = function () {
    user = Meteor.user();
    if (!Roles.userIsInRole(user, ['admin'])) {
        this.render('accessDenied');
    } else {
        this.next();
    }
}

var loggedRoute = function () {

}

//revisar roles para ruta
Router.onBeforeAction(requireAdminRole, {only: [
    'dashboardAdmin', 'proyectoNuevo', 'proyectoEdit', 'briefNew', 'briefsEdit', 'clientesNuevo', 'usuarios'
]});
