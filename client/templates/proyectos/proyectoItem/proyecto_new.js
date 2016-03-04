Template.proyectoNuevo.helpers({
    tipoOperacion: function () {
        if (_.isEmpty(this)) {
            return {
                heading: 'Crear Nuevo Proyecto',
                tipo: 'insert'
            }
        } else {
            return {
                heading: 'Editar Proyecto',
                tipo: 'update'
            }
        }
    }
});