//Helper global para regresar fecha de entrega
Template.registerHelper("fechaEntregaG", function(fecha){
    if (fecha) {
        var localtime = moment.utc(fecha).format('YYYY-MM-DD HH:mm:ss');
        return {
            fecha: moment(localtime).format("DD MMM YYYY"),
            diasFaltantes: moment(localtime).fromNow()
        }
    } else {
        return 0;
    }


});