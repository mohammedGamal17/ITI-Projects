window.addEventListener("load", function () {
  ///////////////////////////
  ///* Start Init variables
  ///////////////////////////
  let emailV = "";
  ///////////////////////////
  ///* End Init variables
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Get Elements
  ///////////////////////////
  let signInForm = document.getElementById("signInForm");
  let email = document.getElementById("email");
  let signInButton = document.getElementById("signInButton");
  signInButton.disabled = true;
  ///////////////////////////
  ///* End Get Elements
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Call Functions
  ///////////////////////////
  signInFormValidation(signInButton, email);
  signInEmailValidation(email);
  ///////////////////////////
  ///* End Call Functions
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Auth Validations Functions
  ///////////////////////////
  function signInFormValidation(signInButton, email) {
    signInForm.addEventListener("change", function () {
      if (isEmail(email.value)) {
        signInButton.disabled = false;
        emailV = email.value;
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
  ///* Start Local Storage
  ///////////////////////////
  var emailArr = [];
  const users = JSON.parse(localStorage.getItem("users"));

  users.forEach((element) => {
    emailArr.push(element.email);
    console.log(element.email);
  });
  function saveForm() {
    var time = new Date();
    let user = {
      email: emailV,
      time: time.toLocaleString("en-EG"),
    };
    const users = window.localStorage.getItem("login");

    if (users === null) {
      window.localStorage.setItem("login", JSON.stringify([user]));
    } else {
      const getCurrentLogin = window.localStorage.getItem("login");
      const currentLogin = JSON.parse(getCurrentLogin);

      if (emailArr.includes(emailV)) {
        currentLogin.push(user);
        window.localStorage.setItem("login", JSON.stringify(currentLogin));
      } else {
        alert("There are no record like that \nPlease Register");
      }
    }
  } // end of set data

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // function getForm() {
  //   const oldInfo = JSON.parse(localStorage.getItem("login"));
  //   console.log(oldInfo);
  // }
  // getForm();
  signInButton.addEventListener("click", saveForm);

  ///////////////////////////
  ///* End Local Storage
  ///////////////////////////
});
//End Of load
