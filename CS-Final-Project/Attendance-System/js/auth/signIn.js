var userPlusPass = [];
window.addEventListener("load", function () {
  ///////////////////////////
  ///* Start Init variables
  ///////////////////////////
  let usernameV = "";
  let passV = "";
  ///////////////////////////
  ///* End Init variables
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Get Elements
  ///////////////////////////
  let signInForm = document.getElementById("signInForm");
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let signInButton = document.getElementById("signInButton");
  signInButton.disabled = true;
  ///////////////////////////
  ///* End Get Elements
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Call Functions
  ///////////////////////////
  signInFormValidation(signInButton, username);
  signInEmailValidation(username);
  signInPasswordValidation(password);
  ///////////////////////////
  ///* End Call Functions
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Auth Validations Functions
  ///////////////////////////
  function signInFormValidation(signInButton, username) {
    signInForm.addEventListener("change", function () {
      if (isUserName(username.value) && isPassword(password.value)) {
        signInButton.disabled = false;
        usernameV = username.value;
        passV = password.value;
      } else {
        signInButton.disabled = true;
      }
    });
  }
  ///////////////////////////
  ///* End Auth Validations Functions
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Email Validation
  ///////////////////////////

  function signInEmailValidation(username) {
    username.addEventListener("keyup", function () {
      if (isUserName(username.value)) {
        username.style.backgroundColor = "green";
      } else {
        username.style.backgroundColor = "red";
      }
    });
  }
  // [!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+
  function isUserName(username) {
    "^[A-Za-z][A-Za-z0-9_]{7,29}$";
    let regex = /^[a-z0-9_.]{7,29}$/;

    if (username.match(regex) || username == null) return true;
    return false;
  }
  ///////////////////////////
  ///* End Email Validation
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Password Validation
  ///////////////////////////
  function signInPasswordValidation(password) {
    password.addEventListener("keyup", function () {
      if (isPassword(password.value)) {
        password.style.backgroundColor = "green";
      } else {
        password.style.backgroundColor = "red";
      }
    });
  }

  function isPassword(password) {
    let regex =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&?, "])[a-zA-Z0-9!#$%&,?]{8,9}$/;

    if (password.match(regex) || password == null) return true;
    return false;
  }
  ///////////////////////////
  ///* End Password Validation
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Local Storage
  ///////////////////////////
  const employees = JSON.parse(window.localStorage.getItem("employees"));
  employees.forEach((element) => {
    userPlusPass.push(element.username + element.password);
  });

  signInButton.addEventListener("click", login);
  function login(e) {
    if (!userPlusPass.includes(usernameV + passV)) {
      alert("Failed!!\nUsername or Password you entered is wrong");
      e.preventDefault();
    } else {
      window.localStorage.setItem("username", usernameV);
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* End Local Storage
  ///////////////////////////
});
//End Of load
