const username = window.localStorage.getItem("username");
if (username == null) {
  window.location.replace("../../screens/auth/signIn.html");
} else {
  var att = [];
  var attendCountPerDay = 0;
  var employeeData = {};

  var now = new Date();

  var startDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    8,
    30
  );

  var forgivenessDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    8,
    45
  );
  var Departure = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    15,
    30
  );

  var nowParse = Date.parse(now);
  var startDateParse = Date.parse(startDate);
  var DepartureParse = Date.parse(Departure);

  window.addEventListener("load", function () {
    ///************************************************************************************** */
    ///************************ Start Attendance Section ************************************ */
    ///************************************************************************************** */

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
          attendCountPerDay < 2 &&
          now < DepartureParse
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

      ///* check if employee in forgiveness period
      if (startDateParse < now && now < forgivenessDate) {
        employees.map((emp) => {
          if (emp.username === username) {
            att.push(formatDate(d));
            emp.attendance = att;
            attendance = emp;
          }
        });
        window.localStorage.setItem("employees", JSON.stringify(employees));
      } else {
        employees.map((emp) => {
          if (emp.username === username) {
            var message;
            do {
              message = prompt("Type your reason for Delay");
            } while (message.length < 5);

            att.push(formatDate(d));
            if (emp.late == null) {
              emp.late = {
                count: 1,
                details: [{ date: formatDate(d), reason: message }],
              };
            } else {
              emp.late.count++;
              emp.late.details.push({ date: formatDate(d), reason: message });
            }
            emp.attendance = att;
            attendance = emp;
          }
        });
        window.localStorage.setItem("employees", JSON.stringify(employees));
      }

      window.location.replace("../../screens/dashboard/employeeDashboard.html");
    }

    confirmAttendance.addEventListener("click", setNewAttendance);

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
      const monthlyTbody = document.getElementById("monthly-table");
      att.map((e) => {
        let formed = e.split(" ").join(" , ");
        monthlyTbody.innerHTML += `
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

    ///********************************************************************************** */
    ///************************ Start Profile Section *********************************** */
    ///********************************************************************************** */
    displayProfileDate();
    function displayProfileDate() {
      const profileFrom = document.getElementById("profileFrom");
      profileFrom.innerHTML = `
                <label for="fname">First Name</label>
                <input
                class="form-control"
                type="text"
                placeholder="${employeeData.firstName}"
                name="firstName"
                id="firstName"
                disabled
              />
              <label for="fname">Last Name</label>
              <input
                class="form-control"
                type="text"
                placeholder="${employeeData.lastName}"
                name="lastName"
                id="lastName"
                disabled
              />
              <label for="fname">Email</label>
              <input
                class="form-control"
                type="text"
                placeholder="${employeeData.email}"
                name="email"
                id="email"
                disabled
              />
              <label for="fname">Username</label>
              <input
                class="form-control"
                type="text"
                placeholder="${employeeData.username}"
                name="username"
                id="username"
                disabled
              />
              <label for="fname">Address</label>
              <input
                class="form-control"
                type="text"
                placeholder="${employeeData.address}"
                name="address"
                id="address"
                disabled
              />
              <label for="fname">Age</label>
              <input
                class="form-control"
                type="text"
                placeholder="${employeeData.age}"
                name="age"
                id="age"
                disabled
              />
  `;
      console.log(employeeData.firstName);
    }
    ///********************************************************************************* */
    ///************************ End Profile Section ************************************ */
    ///********************************************************************************* */

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///********************************************************************************* */
    ///************************ Start Logout Section *********************************** */
    ///********************************************************************************* */

    logout();
    function logout() {
      const logout = document.getElementById("logout");
      logout.addEventListener("click", function () {
        localStorage.removeItem("username");

        window.location.replace("../../screens/auth/signIn.html");
      });
    }

    ///********************************************************************************* */
    ///************************ End Logout Section ************************************* */
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
}
