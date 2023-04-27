var pendingUsers = [];
var employeesEmail = [];
window.addEventListener("load", function () {
  ///* get requests from local storage

  getRequests();
  drawTableOfRegisterRequests();
  function getRequests() {
    const users = JSON.parse(window.localStorage.getItem("users"));
    pendingUsers.push(users);
  }
}); //end of window load

function drawTableOfRegisterRequests() {
  if (pendingUsers[0] != null) {
    pendingUsers.forEach((user) => {
      user.forEach((e, index) => {
        document.getElementById("tbody").innerHTML += `
          <tr>
            <td>${e.firstName}</td>
            <td>${e.lastName}</td>
            <td>${e.address}</td>
            <td>${e.email}</td>
            <td>${e.age}</td>
            <td>${e.role}</td>
            <td>
              <div class="container">
                <div class="row">
                  <div class="col-lg-6 mb-lg-0 mb-2">
                    <button class="btn btn-success" id="allowBtn" onclick="addEmployee(${index})">Allow</button>
                  </div>
                  <div class="col-lg-6">
                    <button class="btn btn-danger" id="denyBtn" onclick="deleteUser(${index})">Deny</button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        `;
      });
    });
  }
} //end of draw register requests

function deleteUser(userIndex) {
  pendingUsers[0].splice(userIndex, 1);
  document.getElementById("tbody").innerHTML = "";
  localStorage.setItem("users", JSON.stringify(pendingUsers[0]));
  drawTableOfRegisterRequests();
}

function addEmployee(userIndex) {
  const employees = window.localStorage.getItem("employees");
  var newEmp = pendingUsers[0][userIndex];
  if (employees === null) {
    window.localStorage.setItem("employees", JSON.stringify([newEmp]));
  } else {
    const currentEmp = JSON.parse(window.localStorage.getItem("employees"));
    if (!employeesEmail.includes(newEmp.email)) {
      currentEmp.push(newEmp);
      window.localStorage.setItem("employees", JSON.stringify(currentEmp));
    } else {
      alert("This email had Registered before\nTry sign in");
    }
  }
  deleteUser(userIndex);
}

getEmployees();
function getEmployees() {
  const oldInfo = JSON.parse(localStorage.getItem("employees"));
  if (oldInfo != null) {
    oldInfo.forEach((element) => {
      employeesEmail.push(element.email);
    });
  }
}
