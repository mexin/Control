Template.briefs.helpers({
    briefs: function () {
        return Briefs.find({}, {"sort": [['createdAt', 'desc']]});
    }
});

Template.briefs.events({
    //add your events here
});

Template.briefs.onCreated(function () {
    //add your statement here
});

Template.briefs.onRendered(function () {
    //add your statement here
});

Template.briefs.onDestroyed(function () {
    //add your statement here
});
