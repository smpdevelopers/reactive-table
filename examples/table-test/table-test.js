Players = new Meteor.Collection('players');

if (Meteor.isClient) {
    Template.table_test.players = function () {
        return Players.find({}, {sort: {score: -1, name: 1}});
    };

    Template.table_test.tableSettings = function () {
        return {
            fields: [
                { tmpl: Template.reactiveTableCheckbox, label: '', sortable: false },
                { key: 'name', tmpl: Template.table_test_name, label: 'Full Name' },
                { key: 'name', label: 'First Name', fn: function (name) { return name.split(' ')[0]; } },
                { key: 'score', label: 'Score', sortable: false }
            ],
            showFilter: false
            //useFontAwesome: true
        };
    };

    Template.table_test.events({
        'click tr': function(e) {
            var id = $(e.currentTarget).attr('data-id');
            ReactiveTable.showRowPrompt('', id, 'Hey dude!');
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Players.find().count() === 0) {
            var names = ["Ada Lovelace",
                "Grace Hopper",
                "Marie Curie",
                "Carl Friedrich Gauss",
                "Nikola Tesla",
                "Claude Shannon"];
            for (var i = 0; i < names.length; i++)
                Players.insert({name: names[i], score: Math.floor(Random.fraction()*10)*5});
        }
    });
}
