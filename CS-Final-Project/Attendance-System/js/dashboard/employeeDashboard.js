window.addEventListener("load", function () {
  let employeeData = {};
  insertEmployeeData();
  function insertEmployeeData() {
    const username = window.localStorage.getItem("username");
    const employees = JSON.parse(window.localStorage.getItem("employees"));
    employees.forEach((element) => {
      if (element.username === username) employeeData = element;
    });
  }

  const name = document.getElementById("name");
  name.innerText = employeeData.firstName.toUpperCase();
});
