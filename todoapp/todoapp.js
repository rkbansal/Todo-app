    define(['jquery','jqueryui','bootstrap','knockout','modal'], function($, a, b, ko, task){

        var MyViewModel = function () {

            var self = this;

            self.position = 0;

            self.taskname = '';

            self.comment = '';

            self.date = '';

            self.currentData ;

            self.allData = ko.observableArray([]);

            var count = 0;

            self.edit = {

                position : ko.observable(),

                taskname : ko.observable(),

                comment : ko.observable(),

                date: ko.observable()

            };

            self.addTask = function (data) {

                count = self.allData().length+1;

                this.allData.push(new task(count, this.taskname, this.comment, this.date));
            };

            self.removeTask = function (data,e) {

                self.allData.remove(data);

                console.log(data.position()<=self.allData().length);

                if(data.position()<=self.allData().length)
                {
                    for(var i=data.position()-1; i<self.allData().length;i++){

                        self.allData()[i].position(self.allData()[i].position()-1);

                    }
                }
            };

            self.editTask = function(data){

                self.currentData = data.position();

                self.edit.position(data.position());

                self.edit.comment(data.comment());

                self.edit.taskname(data.taskname());

                self.edit.date(data.date());
            }

            self.submitChanges = function(data){

                for(var i=0; i<self.allData().length;i++){

                    if(self.currentData == self.allData()[i].position())
                    {
                        self.allData()[i].position(self.edit.position());

                        self.allData()[i].taskname(self.edit.taskname());

                        self.allData()[i].comment(self.edit.comment());

                        self.allData()[i].date(self.edit.date()) ;
                    }
                }
            }

            self.sorting = function(){

                var sort = false;

                for(var i=0; i<self.allData().length; i++){

                    for(var j=0;j<self.allData().length;j++){

                        //comparing years
                        if(self.allData()[i].date().split('/')[2]<self.allData()[j].date().split('/')[2])
                        {
                            sort = true;
                        }
                        //comparing months
                        else if(self.allData()[i].date().split('/')[0]<self.allData()[j].date().split('/')[0])
                        {
                            sort = true;
                        }
                        //comaparing dates
                        else if(self.allData()[i].date().split('/')[1]<self.allData()[j].date().split('/')[1])
                        {
                            sort = true;
                        }
                        //if any of the above conditions satisfies then sort variable will be true
                        if(sort)
                        {
                            // console.log(first, second);
                            //swap position
                            // temp = self.allData()[i].position();
                            // self.allData()[i].position(self.allData()[j].position());
                            // self.allData()[j].position(temp);
                            //swap taskname
                            temp = self.allData()[i].taskname();

                            self.allData()[i].taskname(self.allData()[j].taskname());

                            self.allData()[j].taskname(temp);

                            //swap comment
                            temp = self.allData()[i].comment();

                            self.allData()[i].comment(self.allData()[j].comment());

                            self.allData()[j].comment(temp);

                            //swap dates
                            temp = self.allData()[i].date();

                            self.allData()[i].date(self.allData()[j].date());

                            self.allData()[j].date(temp);

                        }
                        //setting the value of sort to false once the sorting is done
                        sort = false;
                    }

                }
            }
        };

        ko.applyBindings(new MyViewModel);

    });