Template.userProfile.helpers({
    createdAt: function () {
        return moment(this.createdAt).format("DD MMMM YYYY");
    }
});

Template.userProfile.events({
    //add your events here
});

Template.userProfile.onCreated(function () {
    //add your statement here
});

Template.userProfile.onRendered(function () {
    //add your statement here
});

Template.userProfile.onDestroyed(function () {
    //add your statement here
});

