define(['jquery','knockout'], function($, ko){

    var task = function (position, taskname, comment, date) {

        this.position = ko.observable(position);

        this.taskname = ko.observable(taskname);

        this.comment = ko.observable(comment);

        this.date = ko.observable(date);
    };

    return task;

});