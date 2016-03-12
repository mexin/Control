Meteor.startup(function () {
  smtp = {
    username: 'user@email.com',
    password: 'password',
    server: 'server',
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

  Accounts.config({
    sendVerificationEmail: true
  });

  //////////////////////////
  // Pretty Emails Settings
  //////////////////////////

  PrettyEmail.style = {
    fontFamily: 'Helvetica',
    textColor: '#151616',
    buttonColor: '#FFFFFF',
    buttonBgColor: '#151616'
  }

  PrettyEmail.options = {
    from: 'USER <user@email.com>',
    logoUrl: 'logo',
    companyName: 'Company Name',
    companyUrl: 'http://www.company.com',
    companyAddress: 'Address',
    companyTelephone: '',
    companyEmail: 'company@email.com',
    siteName: 'Control'
  }

  Accounts.emailTemplates.from = 'USER <user@email.com>';



});