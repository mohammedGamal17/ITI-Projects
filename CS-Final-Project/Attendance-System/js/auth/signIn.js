window.addEventListener("load", function () {
  ///////////////////////////
  ///* Start Get Elements
  ///////////////////////////
  const signInForm = document.getElementById("signInForm");
  let email = document.getElementById("email");
  let signInButton = document.getElementById("signInButton");
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

  ///////////////////////////
  ///* End Local Storage
  ///////////////////////////
});
