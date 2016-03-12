/* TODO: Automated Dummy data for testing purposes
// Seed Demo Data using Faker
if (Proyectos.find().count() < 10) {
    _.each(_.range(10), function () {
        var randomEmail = faker.internet.email();
        var randomName = faker.name.findName();
        var ticketId = faker.phone.phoneNumberFormat(4);
        var num = 1;
        Boletos.insert({
            nombre: 'Project ' + num++,
            descripcion: faker.lorem.paragraph(sentenceCount [15]),
            estado: faker.random.arrayElement(["En Proceso","Terminado","Cancelado"]),
            fechaEntrega: faker.date.between('2015-01-01', '2015-12-31'),
            ticketType: '5K Race',
            checkIn: false,
            horaChecado: null,
            checador: null,
            kitEntregado: false,
            kitHora: null
        });
    });
}
*/
