app.service("myService", function ($http) {

    //get All Eployee
    this.getAllRecords = function () {
      
        return $http.get("api/Test");
    };

    // get Employee By Id
    this.getRecordById = function (ID) {
        var response = $http({
            method: "GET",
            url: "api/Test",
            params: {
                id: JSON.stringify(ID)
            }
        });
        return response;
    }

    // Update Employee 
    this.updateEmp = function (employee) {
        var response = $http({
            method: "post",
            url: "Home/UpdateEmployee",
            data: JSON.stringify(employee),
            dataType: "json"
        });
        return response;
    }

    // Add Employee
    this.AddRecord = function (record) {
       
        var response = $http({
            method: "POST",
            url: "api/Test",
            data: JSON.stringify(record),
            dataType: "json"
        });
      
        return response;
    }

    //Delete Employee

    this.deleteRecord = function (person) {
        var response = $http({
            method: "POST",
            url: "api/Test/delete/"+person.person_id,
            data: JSON.stringify(person),
            dataType: "json"
            //params: {
            //    employeeId: JSON.stringify(employeeId)
           // }
        });
        return response;
    }
});