/*eslint-env browser*/

var del_emp = [], i;

for (i = 0; i < 5; i += 1) {
    del_emp[i] = "<button class='del_emp" + String(i) + "'>Delete</button>";
}

var employee_list = [["Sally Smith", "Quality Assurance", 3423, del_emp[0]],
                    ["Mark Martin", "VP Sales", 3346, del_emp[1]],
                    ["John Johnson", "Marketing", 3232, del_emp[2]],
                    ["Maria Garcia", "Accountant", 3243, del_emp[3]],
                    ["Juan Carlos", "CEO", 3260, del_emp[4]]];

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

function showEmployees() {
    "use strict";
    var row, col, employeeinfo, tbody, table_attribute = "";
    
    employeeinfo = document.getElementsByTagName("table")[0];
    tbody = document.createElement('tbody');
    
    $("total_Emp").innerHTML = "Showing " + employee_list.length + " employees";
        
    for (row = 0; row < employee_list.length; row += 1) {
        table_attribute += "<tr>";
        for (col = 0; col < 4; col += 1) {
            table_attribute += "<td>" + employee_list[row][col] + "</td>";
        }
        table_attribute += "</tr>";
    }
    table_attribute += "</tbody>";
    employeeinfo.appendChild(tbody);
    $("displayEmp").innerHTML = table_attribute;
}

var addEmployee = function () {
    "use strict";
    var name, title, extension, employee = [];
       
    name = $("name").value;
    title = $("title").value;
    extension = $("extension").value;
       
    // BASIC VALIDATION
    if (name === "") {
        $("name_error").innerHTML = "**This field is required.";
        return;
    } else {
        $("name_error").innerHTML = "";
        employee.push(name);
    }
    
    if (title === "") {
        $("title_error").innerHTML = "**This field is required.";
        return;
    } else {
        $("title_error").innerHTML = "";
        employee.push(title);
    }
    
    if (extension === "") {
        $("ext_error").innerHTML = "**This field is required.";
        return;
    }
    
    if (isNaN(extension) || extension.length !== 4) {
        $("ext_error").innerHTML = "**The extension must be a 4-digit number";
        return;
    } else {
        $("ext_error").innerHTML = "";
        employee.push(extension);
        window.console.log(employee_list.length);
        del_emp[employee_list.length + 1] = "<button class='del_emp" + String(employee_list.length + 1) + "'>Delete</button>";
        employee.push(del_emp[employee_list.length + 1]);
    }
    
    if (employee.length > 0) {
        employee_list.push(employee);
    }
    showEmployees();
   
   
    $("empreg").reset();
    $("name").innerHTML = "";
    $("title").innerHTML = "";
    $("extension").innerHTML = "";
};

var deleteEmployee = function (index) {
    "use strict";
    
    employee_list.splice(index, 1);
    showEmployees();
};

window.addEventListener("load", function () {
    "use strict";

    showEmployees();

    $("add").addEventListener("click", addEmployee);
  
    $("displayEmp").addEventListener("click", function (e) {

        if (e.target.textContent.match(/Delete/)) {
            var i, index, displayEmp, btnElements;

            displayEmp = $("displayEmp");
            btnElements = displayEmp.getElementsByTagName("button");
            for (i = 0; i < btnElements.length; i += 1) {
                if (event.target.className === btnElements[i].className) {
                    index = i;
                }
            }

            deleteEmployee(index);
        }
    });
});