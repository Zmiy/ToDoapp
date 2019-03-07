app.factory("todoSrv", function ($log, $http, $q) {
    // function ToDo(date, todoText, isFinished) {
    //     this.creationDate = new Date(date);
    //     this.todoText = todoText;
    //     this.isFinished = isFinished;
    // }
    function ToDo(parseToDo) {
        this.id = parseToDo.id;
        //this.creationDate = parseToDo.get("creationDate");
        this.creationDate = parseToDo.get("createdAt"); 
        this.todoText = parseToDo.get("todoText");
        this.isFinished = parseToDo.get("isFinished");
    }

    ToDo.prototype.getFullText = function () {
        return this.id+" "+ formatDate(this.creationDate.toString()) + " " + this.todoText;
    }

    function formatDate(input) {
        var date = new Date(input);
        return [
            ("0" + date.getDate()).slice(-2),
            ("0" + (date.getMonth() + 1)).slice(-2),
            date.getFullYear(),

        ].join('/') + " " + [" ",
            ("0" + date.getHours()).slice(-2),
            ("0" + date.getMinutes()).slice(-2),].join(":");
    }

    let todoList = [];

    function getToDoList() {
        let async = $q.defer();
        const myToDoList = Parse.Object.extend('ToDoList');
        const query = new Parse.Query(myToDoList);
        // query.equalTo("myCustomKey1Name", "myCustomKey1Value");
        query.find().then((results) => {
            for (var i = 0; i < results.length; i++) {
                todoList.push(new ToDo(results[i]));
            }
            async.resolve(todoList);
        }, (error) => {
            $log.error('Error while fetching ParseObjects', error);
            async.reject(error);
        });
        return async.promise;
    }

    function makeNewToDo(todoText, isFinished) {
        let async = $q.defer();
        const myToDoList = Parse.Object.extend('ToDoList');
        const newToDo = new myToDoList();

        newToDo.set('creationDate', creationDate);
        newToDo.set('todoText', todoText);
        newToDo.set('isFinished', isFinished);

        newToDo.save().then(
            function (result) {
                $log.info('ToDo created', result);
                var newRecipe = new ToDo(result);
                async.resolve(newRecipe);
            }, function (error) {
                $log.error('Error while creating ToDo: ', error);
                async.reject(error);
            });

        return async.promise;
    }

    function saveToDoChange(currToDo)
    {
        let async = $q.defer();
        const myToDoList = Parse.Object.extend('ToDoList');
        const query = new Parse.Query(myToDoList);
        query.get(currToDo.id).then((object)=>{
            object.set("isFinished", currToDo.isFinished);
            object.save().then((response)=>{
                $log.info('ToDo updeted', response);
                var newRecipe = new ToDo(response);
                async.resolve(newRecipe);
            },(error)=>{
                $log.error('Error while updating ToDo: ', error);
                    async.reject(error);
                });
        
        });
        return async.promise;
    }

    return {
        getToDoList: getToDoList,
        makeNewToDo: makeNewToDo,
        saveToDoChange:saveToDoChange
    }

});