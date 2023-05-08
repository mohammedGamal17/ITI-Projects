var pendingUsers = [];
var employeesEmail = [];
var att = [];
var today = formatDate(new Date()).slice(0, 10); ///* to get only Today date
///************************************************************************************** */
///************************ Start Email Register Requests Section *********************** */
///************************************************************************************** */
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

  let username = createRandomUserName(newEmp.email);
  let password = createRandomPassword();
  if (employees === null) {
    newEmp.username = username;
    newEmp.password = password;
    window.localStorage.setItem("employees", JSON.stringify([newEmp]));
    sendMail(newEmp.email, username, password);
  } else {
    const currentEmp = JSON.parse(window.localStorage.getItem("employees"));
    if (!employeesEmail.includes(newEmp.email)) {
      newEmp.username = username;
      newEmp.password = password;
      currentEmp.push(newEmp);
      window.localStorage.setItem("employees", JSON.stringify(currentEmp));
      sendMail(newEmp.email, username, password);
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

function sendMail(userEmail, username, password) {
  let emailBody = `
    <div id="mailForm" style="background-color: #007fff;color: #ffffff;width: 100%;display: flex;flex-direction: column;">
      <div id="header" style="padding: 1rem">
        <h3>Dear <span style="color: #ffffff; text-decoration: none; font-weight: bold">${userEmail}</span></h3>
      </div>
      <div
        id="body"
        style="
          background-color: #004c99;
          padding: 1rem;
          text-align: center;
        "
      >
        <p>Thanks for Register</p>
        <h4>
          Your username is :
          <span id="username" style="font-size: 1.5rem; font-weight: bold"> ${username} </span>
        </h4>
          <h4>
          Your password is :
          <span id="username" style="font-size: 1.5rem; font-weight: bold"> ${password} </span>
        </h4>
      </div>
      <div style="padding: 1rem">
        <p>
          Any question contact us :
          <span style="font-weight: bold">mohammed_gamal7@outlook.com</span>
        </p>
        <p>Best Regards,</p>
        <p>Eng: Mohammed Gamal Mahmoud</p>
      </div>
    </div>
    `;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "mohammed7.gamal.mg@gmail.com",
    Password: "964CEEB76B9C3FAFCE2E68E1905E95E2F9AD",
    To: userEmail,
    From: "mohammed7.gamal.mg@gmail.com",
    Subject: "Email Verification",
    Body: emailBody,
  }).then((message) => alert(message));
}

function createRandomUserName(userEmail) {
  let otp_val = Math.floor(Math.random() * 90000) + 10000;
  return userEmail.slice(0, userEmail.indexOf("@")) + otp_val;
}

function createRandomPassword() {
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  const calpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = "1234567890";
  const specials = ",.!@#$%^&*";
  const options = [alpha, alpha, alpha, calpha, calpha, num, num, specials];
  let opt, choose;
  let pass = "";
  for (let i = 0; i < 8; i++) {
    opt = Math.floor(Math.random() * options.length);
    choose = Math.floor(Math.random() * options[opt].length);
    pass = pass + options[opt][choose];
    options.splice(opt, 1);
  }
  return pass;
}
///************************************************************************************ */
///************************ End Email Register Requests Section *********************** */
///************************************************************************************ */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///*********************************************************************************** */
///************************ Start Reports Section ************************************ */
///*********************************************************************************** */
getAllAttendance();
function getAllAttendance() {
  let employees = JSON.parse(window.localStorage.getItem("employees"));
  const monthlyTbody = document.getElementById("monthly-table");
  employees.map((emp) => {
    if (emp.attendance != null) {
      var empFullName = emp.firstName + " " + emp.lastName;
      emp.attendance.map((e) => {
        let formed = e.split(" ").join(" , ");

        monthlyTbody.innerHTML += `
          <tr>
            <td>${emp.firstName} ${emp.lastName}</td>
            <td>${emp.email}</td>
            <td>${formed}</td>
          </tr>
        `;

        att.push({ name: empFullName, email: emp.email, attendance: formed });
      });
    }
  });
}

drawDailyTable();
function drawDailyTable() {
  const dailyTbody = document.getElementById("daily-tbody");

  att.map((e) => {
    if (e.attendance.includes(today)) {
      dailyTbody.innerHTML += `
          <tr>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>${e.attendance}</td>
          </tr>
        `;
    }
  });
}

///********************************************************************************* */
///************************ End Reports Section ************************************ */
///********************************************************************************* */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///********************************************************************************** */
///************************ Start Profile Section ******************************** */
///********************************************************************************** */
displayProfileDate();
function displayProfileDate() {
  const profileFrom = document.getElementById("profileFrom");

  let admins = JSON.parse(window.localStorage.getItem("admins"));

  admins.forEach((element) => {
    profileFrom.innerHTML = `
                <label for="fname">Email</label>
                <input
                class="form-control"
                type="text"
                placeholder="${element.email}"
                name="email"
                id="email"
                disabled
              />
              <label for="fname">Password</label>
              <input
                class="form-control"
                type="text"
                placeholder="${element.password}"
                name="password"
                id="password"
                disabled
              />
  `;
  });
}
///********************************************************************************* */
///************************ End Profile Section ************************************ */
///********************************************************************************* */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///********************************************************************************** */
///************************ Start Attendance Section ******************************** */
///********************************************************************************** */

function setAutoDeparture() {
  // let now = new Date();
  // let dateTimeStr = now.toLocaleString();
  // let time1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 30);
  // let time2 = Date.parse(dateTimeStr);
  // let time3 = Date.parse(time1);
  // let time4 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 20);
  // let time5 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 30);
  // let OnTime = Date.parse(time5);
  // let earlyTime = Date.parse(time4);

  // let diffInMinutes = (time3 - time2) / 60000;
  // let diffInMinutesForLeave = Math.round(Math.abs((time2 - earlyTime) / 60000));

  // let getMinutesLate = Math.round(Math.abs(diffInMinutes));

  const sevenAndHalfHours = 7.5 * 1000 * 3600;

  if (attendCountPerDay === 1) {
    setTimeout(setNewAttendance, sevenAndHalfHours);
  }
}
///************************************************************************************ */
///************************ End Attendance Section ************************************ */
///************************************************************************************ */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Math.random() // Generate random number, eg: 0.123456
//   .toString(36) // Convert  to base-36 : "0.4fzyo82mvyr"
//   .slice(-8); // Cut off last 8 characters : "yo82mvyr"
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return (
    [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear(),
    ].join("/") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}
