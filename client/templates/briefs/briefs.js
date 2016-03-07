Template.briefs.helpers({
    briefs: function () {
        return Briefs.find({}, {"sort": [['createdAt', 'desc']]});
    }
});

Template.briefs.events({

});

Template.briefs.onCreated(function () {

});

Template.briefs.onRendered(function () {

});

Template.briefs.onDestroyed(function () {

});

