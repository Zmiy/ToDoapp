app.controller("todoCtrl",function($scope){
    function ToDo(date, todoText, isFinished)
    {
        this.creationDate = new Date(date);
        this.todoText = todoText;
        this.isFinished = isFinished;
    }
    
    ToDo.prototype.getFullText = function(){
        return formatDate(this.creationDate.toString()) +" " + this.todoText;
    }

    function formatDate(input) {
        var date = new Date(input);
        return [
           ("0" + date.getDate()).slice(-2),
           ("0" + (date.getMonth()+1)).slice(-2),
           date.getFullYear(),
           
        ].join('/') + " " +[ " ",
        ("0" + date.getHours()).slice(-2),
        ("0" + date.getMinutes()).slice(-2),].join(":");
    }

    $scope.todoList=[];

    $scope.onEnter = function(keyEvent)
    {
    
        if (keyEvent.which === 13 && Boolean($scope.nextToDo))
        {
            $scope.todoList.unshift(new ToDo(new Date(),$scope.nextToDo, false));
            $scope.nextToDo="";

        }
    }
    
    $scope.countOfNotFinished=function()
    {
        var arr = $scope.todoList.filter(element => {
            return !element.isFinished;
        });
        return arr.length;
    }

    $scope.filterBy = "All";
    $scope.btnFilterClick=function(filter, obj)
    {
        $scope.filterBy=filter;
        alert(obj.target.id);
    }
    $scope.filterByFinished=function(todoItem)
    {
        switch($scope.filterBy)
        {
            case "All":
              return true;
            case "Active":
                if (!todoItem.isFinished)
                    return true;
                else
                    return false;
            case "Complited":
                if(todoItem.isFinished)
                    return true;
                else 
                    return false;

        } 
    }
    $scope.remove=function(index)
    {
        $scope.todoList.splice(index,1);
    }
    // function Actor(fname, lname, birthday, photoUrl, imdbUrl)
    // {
    //     this.fname = fname;
    //     this.lname=lname;
    //     this.birthday=new Date(birthday);
    //     this.photoUrl=photoUrl;
    //     this.imdbUrl=imdbUrl;
    // }
    
    // Actor.prototype.getFullName = function () {
    //     return this.fname +" " + this.lname;
    // };
    
    // $scope.actors=[];
    
    // $scope.actors.push(new Actor(
    //     "Keanu","Reeves","1964-09-02","https://m.media-amazon.com/images/M/MV5BNjUxNDcwMTg4Ml5BMl5BanBnXkFtZTcwMjU4NDYyOA@@._V1_SY1000_CR0,0,771,1000_AL_.jpg", "https://www.imdb.com/name/nm0000206/?ref_=tt_cl_t1")
    //     );
    
    // $scope.actors.push(new Actor(
    //     "Jim", "Carrey", "1962-01-17","https://m.media-amazon.com/images/M/MV5BMTQwMjAwNzI0M15BMl5BanBnXkFtZTcwOTY1MTMyOQ@@._V1_SY1000_CR0,0,812,1000_AL_.jpg", "https://www.imdb.com/name/nm0000120/?ref_=tt_cl_t1") 
    //     );

    // $scope.actors.push(new Actor(
    //     "Uma", "Thurman", "1970-04-29","https://m.media-amazon.com/images/M/MV5BMjMxNzk1MTQyMl5BMl5BanBnXkFtZTgwMDIzMDEyMTE@._V1_SY1000_CR0,0,665,1000_AL_.jpg","https://www.imdb.com/name/nm0000235/?ref_=tt_cl_t1")
    // );

});