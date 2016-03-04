AccountsTemplates.configureRoute('signIn', {
    layoutTemplate: 'publicLayout',
    redirect: '/'
});
// AccountsTemplates.configureRoute('signUp', {
//     layoutTemplate: 'publicLayout',
//     redirect: '/'
// });
AccountsTemplates.configureRoute('ensureSignedIn', {
    layoutTemplate: 'publicLayout'
});

//Deshabilitar Registros en cliente
AccountsTemplates.configure({
    forbidClientAccountCreation: true
});
