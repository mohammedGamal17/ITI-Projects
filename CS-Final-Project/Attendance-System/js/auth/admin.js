window.addEventListener("load", function () {
  ///////////////////////////
  ///* Start Init variables
  ///////////////////////////
  var emailV = "";
  var passwordV = "";
  ///////////////////////////
  ///* End Init variables
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Get Elements
  ///////////////////////////
  let adminSignInForm = document.getElementById("adminSignInForm");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let adminSignInButton = document.getElementById("adminSignInButton");
  adminSignInButton.disabled = true;
  ///////////////////////////
  ///* End Get Elements
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Call Functions
  ///////////////////////////
  signInFormValidation(adminSignInButton, email, password);
  signInEmailValidation(email);
  signInPasswordValidation(password);
  ///////////////////////////
  ///* End Call Functions
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Auth Validations Functions
  ///////////////////////////
  function signInFormValidation(adminSignInButton, email, password) {
    adminSignInForm.addEventListener("change", function () {
      if (isEmail(email.value) && isPassword(password.value)) {
        adminSignInButton.disabled = false;
        emailV = email.value;
        passwordV = password.value;
      } else {
        adminSignInButton.disabled = true;
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
  function signInEmailValidation(email) {
    email.addEventListener("keyup", function () {
      if (isEmail(email.value)) {
        email.style.backgroundColor = "green";
      } else {
        email.style.backgroundColor = "red";
      }
    });
  }

  function isEmail(email) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(regex) || email == null) return true;
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
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;

    if (password.match(regex) || password == null) return true;
    return false;
  }
  ///////////////////////////
  ///* End Password Validation
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Local Storage
  ///////////////////////////
  initDefaultAdmin();
  function initDefaultAdmin() {
    let admins = window.localStorage.getItem("admins");
    const admin = {
      email: "mohammed_gamal7@outlook.com",
      password: "MoMoMo!7",
    };
    if (admins === null) {
      window.localStorage.setItem("admins", JSON.stringify([admin]));
    }
  }
  function login(e) {
    let admins = JSON.parse(window.localStorage.getItem("admins"));
    admins.forEach((element) => {
      if (element.password !== passwordV || element.email !== emailV) {
        alert("Error Email or Password");
        e.preventDefault();
      }
    });
  }
  //   const users = JSON.parse(localStorage.getItem("users"));

  //   users.forEach((element) => {
  //     emailArr.push(element.email);
  //     console.log(element.email);
  //   });
  //   function saveForm() {
  //     var time = new Date();
  //     let user = {
  //       time: time.toLocaleString("en-EG"),
  //     };
  //     const users = window.localStorage.getItem("login");

  //     if (users === null) {
  //       window.localStorage.setItem("login", JSON.stringify([user]));
  //     } else {
  //       const getCurrentLogin = window.localStorage.getItem("login");
  //       const currentLogin = JSON.parse(getCurrentLogin);

  //       if (emailArr.includes(emailV)) {
  //         currentLogin.push(user);
  //         window.localStorage.setItem("login", JSON.stringify(currentLogin));
  //       } else {
  //         alert("There are no record like that \nPlease Register");
  //       }
  //     }
  //   } // end of set data

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  adminSignInButton.addEventListener("click", login);
  ///////////////////////////
  ///* End Local Storage
  ///////////////////////////
});
//End Of load
