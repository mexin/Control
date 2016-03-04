Meteor.startup(function () {
//Crear Usuarios con roles y demas
    if (Meteor.users.find().count() < 1) {
        var users = [
            //{name: 'Luis M', email: 'programacion@creativosrd.com', roles: ['empleado']},
            {name: 'Admin', email: 'programacion@creativosrd.com', roles: ['admin']}
        ];
        _.each(users, function (userData) {
            var userid = Accounts.createUser({
                email: userData.email,
                password: 'test1',
                username: userData.email,
                profile: {name: userData.name}
            });
            Meteor.users.update({_id: userid}, {$set: {'emails.0.verified': true}});
            Roles.addUsersToRoles(userid, userData.roles);
        })
    }
});