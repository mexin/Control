Meteor.autorun(function () {
    var stat;
    if (Meteor.status().status === "connected") {
        stat = 'success'
    }
    else if (Meteor.status().status === "connecting") {
        stat = 'warning'
    }
    else {
        stat = 'danger';
    }
    Session.set('status',stat);
});