app.controller("myCntrl", function ($scope, myService) {
    $scope.divAddUpdate = false;
    getAll();
    //To Get All Records  
    function getAll() {
       
        var getData = myService.getAllRecords();
      
        getData.then(function (prs) {
            $scope.personDetails = prs.data;
        },function () {
            alert('Error in getting records');
        });
    }

    $scope.editRecord = function (person) {
        debugger;
        console.log(person);

        var getData = myService.getRecordById(person.person_id);
        getData.then(function (prs) {
            $scope.personDetails = prs.data;
            $scope.person_id = person.person_id;
            $scope.name = person.name;
            $scope.phone_no = person.contact_detail.phone_no;
            $scope.mobile_no = person.contact_detail.mobile_no;
            $scope.address = person.contact_detail.address;
            $scope.email = person.contact_detail.email;
            $scope.Action = "Update";
            $scope.divEmployee = true;
        },

        function () {
            alert('Error in getting records');
        });
    }

    $scope.AddUpdate = function ()
    {
        var personDetails = {
            name: $scope.name,
            profession: $scope.profession,
            contact_detail: {
                phone_no: $scope.phone_no,
                mobile_no: $scope.mobile_no,
                email: $scope.email,
                address: $scope.address
            }
        };
        var getAction = $scope.Action;

        if (getAction == "Update") {
            Employee.Id = $scope.employeeId;
            var getData = myService.updateEmp(Employee);
            getData.then(function (msg) {
                getAll();
                alert(msg.data);
                $scope.divEmployee = false;
            }, function () {
                alert('Error in updating record');
            });
        }
        else {
            if (($scope.name || $scope.profession || $scope.phone_no || $scope.mobile_no || $scope.email || $scope.address) != null) {
                var getData = myService.AddRecord(personDetails);
                getData.then(function (msg) {
                    getAll();
                    console.log(personDetails);

                    alert(msg.data);
                    $scope.divAddUpdate = false;
                }, function () {
                    alert('Error in adding record');
                });
            }
            else {
                alert('Please check all the fields');
            }
        }
        debugger;
        getAll();
        //$scope.refresh();
    }

    //$scope.apply(function () {
    //    debugger;
    //    // update goes here
    //    GetAllEmployee();
    //});


    $scope.AddUpdateDiv=function()
    {
        ClearFields();
        $scope.Action = "Add";
        $scope.divAddUpdate = true;
    }
    $scope.cancel = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = false;
        $scope.divAddUpdate = false;
    }
    $scope.delete = function (person)
    {
        debugger;
        var result = confirm("Do you really want to delete " + person.name + "?");
        if (result) {
            var getData = myService.deleteRecord(person);
            getData.then(function (msg) {
                getAll();
                //alert(msg.data);
            }, function () {
                alert('Error in Deleting Record');
            });
        }
    }

    function ClearFields() {
        $scope.employeeId = "";
        $scope.employeeName = "";
        $scope.employeeEmail = "";
        $scope.employeeAge = "";
    }
});