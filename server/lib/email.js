Meteor.startup(function () {
  smtp = {
    username: 'control@creativosrdmx.com',
    password: 'Contr0l@31975264',
    server: 'mail.creativosrdmx.com',
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
    from: 'ControlCRD <control@creativosrdmx.com>',
    logoUrl: 'http://www.creativosrd.com/Logo/CreativosRD.png',
    companyName: 'Creativos RD',
    companyUrl: 'http://www.creativosrd.com',
    companyAddress: 'Guadalajara, México',
    companyTelephone: '',
    companyEmail: 'info@creativosrd.com',
    siteName: 'Control CRD'
  }

  Accounts.emailTemplates.from = 'ControlCRD <control@creativosrdmx.com>';

  //Accounts.emailTemplates = {
  //    from: 'Quiero Reviews <promo@quiero-recordings.com>',
  //    siteName: 'QuieroReviews',
  //    verifyEmail: {
  //        subject: function (user) {
  //            return 'Verification email from Quiero Reviews';
  //        },
  //        text: function (user, url) {
  //            return 'Hi,\n' +
  //                'Please open the link below to verify your account on our Platform:\n' + url;
  //        }
  //    }
  //}


});