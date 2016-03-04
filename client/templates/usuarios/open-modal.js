ModalHelper = {};

ModalHelper.openModalFor = function(userId) {
    Session.set('selectedUserId', userId);
    Modal.show('usuariosModal')
}