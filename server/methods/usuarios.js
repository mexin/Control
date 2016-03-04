Meteor.methods({
    'createUsuario': function (usuario) {
        var userId = Accounts.createUser({
            username: usuario.email,
            email: usuario.email,
            password: usuario.password,
            profile: {
                name: usuario.nombre,
                departamento: usuario.depto
            }
        });
        Meteor.users.update({_id: userId}, {$set: {'emails.0.verified': true}});
        Roles.addUsersToRoles(userId, usuario.rol);
    },
    'editUsuario': function (usuario) {
        Meteor.users.update({_id: usuario.id}, {
            $set: {
                'username': usuario.email,
                'emails': {
                    'address': usuario.email,
                    'verified': true
                },
                'profile': {
                    'name': usuario.nombre,
                    'departamento': usuario.depto
                }
            }
        });
        Accounts.setPassword(usuario.id,usuario.password);
        Roles.setUserRoles(usuario.id, usuario.rol);

    },
    'deleteUsuario': function (usuarioid) {
        Meteor.users.remove(usuarioid);
        //Tareas.find({'usuarioId':usuarioId})   // TODO: Buscar Tareas, Proyectos y briefs que contengan al usuario, borrar tareas, borrar proyectos? quitar usuario? revisar esto
    }

});