var att = [];
var attendCountPerDay = 0;
window.addEventListener("load", function () {
  ///************************************************************************************** */
  ///************************ Start Attendance Section ************************************ */
  ///************************************************************************************** */
  let employeeData = {};
  const confirmAttendance = document.getElementById("confirmAttendance");
  insertEmployeeData();
  displayName();
  getOldAttendance();
  checkUserNameValidation();
  setAutoDeparture();

  function insertEmployeeData() {
    const username = window.localStorage.getItem("username");
    const employees = JSON.parse(window.localStorage.getItem("employees"));
    employees.map((element) => {
      if (element.username === username) {
        employeeData = element;
      }
    });
  }
  function displayName() {
    const name = document.getElementById("name");
    name.innerText = employeeData.firstName + " " + employeeData.lastName;
  }
  function getOldAttendance() {
    const username = window.localStorage.getItem("username");
    let employees = JSON.parse(window.localStorage.getItem("employees"));
    employees.map((emp) => {
      if (emp.username === username) {
        if (emp.attendance != null) {
          emp.attendance.map((e) => {
            att.push(e);
          });

          let day = formatDate(new Date()).slice(0, 10); ///* to get only Today date

          emp.attendance.map((attend) => {
            const formate = attend.split(" "); ///* to split date and time
            formate.map((attend) => {
              if (attend == day) {
                attendCountPerDay++;
              }
            });
          });
        }
      }
    });
  }
  function checkUserNameValidation() {
    const usernameInput = document.getElementById("usernameInput");
    confirmAttendance.disabled = true;
    usernameInput.addEventListener("keyup", function () {
      if (
        usernameInput.value === employeeData.username &&
        attendCountPerDay < 2
      ) {
        confirmAttendance.disabled = false;
        usernameInput.style.backgroundColor = "green";
      } else {
        confirmAttendance.disabled = true;
        usernameInput.style.backgroundColor = "red";
      }
    });
  }

  function setNewAttendance() {
    const username = window.localStorage.getItem("username");
    let employees = JSON.parse(window.localStorage.getItem("employees"));
    let attendance;

    let d = new Date();
    employees.map((emp) => {
      if (emp.username === username) {
        att.push(formatDate(d));
        emp.attendance = att;
        attendance = emp;
      }
    });
    window.localStorage.setItem("employees", JSON.stringify(employees));
    window.location.replace("../../screens/dashboard/employeeDashboard.html");
  }

  confirmAttendance.addEventListener("click", setNewAttendance);

  function setAutoDeparture() {
    const sevenAndHalfHours = 7.5 * 1000 * 3600;

    if (attendCountPerDay === 1) {
      setTimeout(setNewAttendance, sevenAndHalfHours);
    }
  }
  ///************************************************************************************ */
  ///************************ End Attendance Section ************************************ */
  ///************************************************************************************ */

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///*********************************************************************************** */
  ///************************ Start Reports Section ************************************ */
  ///*********************************************************************************** */

  drawDailyTable();
  function drawDailyTable() {
    const dailyTbody = document.getElementById("daily-tbody");
    let today = formatDate(new Date()).slice(0, 10); ///* to get only Today date
    att.map((e, index) => {
      if (e.includes(today)) {
        dailyTbody.innerHTML += `
          <tr>
            <td>${today}</td>
            <td>${e}</td>
          </tr>
        `;
      }
    });
  }

  drawMonthlyTable();
  function drawMonthlyTable() {
    const dailyTbody = document.getElementById("monthly-table");
    att.map((e) => {
      let formed = e.split(" ").join(" , ");
      console.log(formed);
      dailyTbody.innerHTML += `
          <tr>
            <td>${formed}</td>
          </tr>
        `;
    });
  }

  ///********************************************************************************* */
  ///************************ End Reports Section ************************************ */
  ///********************************************************************************* */

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

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
