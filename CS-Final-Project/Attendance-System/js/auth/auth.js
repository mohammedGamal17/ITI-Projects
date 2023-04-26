///////////////////////////
// Start Get Elements
///////////////////////////

const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let age = document.getElementById("age");
let signUpEmail = document.getElementById("signUpEmail");
let email = document.getElementById("email");

let button = document.getElementById("button");

///////////////////////////
// End Get Elements
///////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////
// Start Call Functions
///////////////////////////
signUpFormValidation(button, firstName, lastName, address, age, signUpEmail);
firstNameValidation(firstName);
lastNameValidation(lastName);
signUpEmailValidation(signUpEmail);
addressValidation(address);
ageValidation(age);

signInFormValidation(button, email);
emailValidation(email);

///////////////////////////
// End Call Functions
///////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////
// Start Auth Validations Functions
///////////////////////////

function signUpFormValidation(
  button,
  firstName,
  lastName,
  address,
  age,
  email
) {
  signUpForm.addEventListener("change", function () {
    let isFormValid =
      isName(firstName.value) &&
      isName(lastName.value) &&
      isAddress(address.value) &&
      isValidAge(age) &&
      isEmail(email.value);

    if (isFormValid) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
}

function signInFormValidation(button, email) {
  signInForm.addEventListener("change", function () {
    if (isEmail(email.value)) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
}

///////////////////////////
// End Auth Validations Functions
///////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////
// Start Name Validation
///////////////////////////

/*
 * Name Validation Function DOM*
 */
function firstNameValidation(firstName) {
  firstName.addEventListener("keyup", function () {
    if (isName(firstName.value)) {
      firstName.style.backgroundColor = "green";
    } else {
      firstName.style.backgroundColor = "red";
    }
  });
}

function lastNameValidation(lastName) {
  lastName.addEventListener("keyup", function () {
    if (isName(lastName.value)) {
      lastName.style.backgroundColor = "green";
    } else {
      lastName.style.backgroundColor = "red";
    }
  });
}

/*
 * Name Validation Function REGEX*
 */
function isName(string) {
  let regex = /^[a-zA-Z]{3,8}$/;
  if (string.match(regex)) return true;
  return false;
}

///////////////////////////
// End Name Validation
///////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////
// Start Address Validation
///////////////////////////

/*
 * Address Validation Function DOM*
 */
function addressValidation(address) {
  address.addEventListener("keyup", function () {
    if (isAddress(address.value)) {
      address.style.backgroundColor = "green";
    } else {
      address.style.backgroundColor = "red";
    }
  });
}

/*
 * Address Validation Function REGEX*
 */
function isAddress(address) {
  var regex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  if (address.match(regex)) return true;
  return false;
}

///////////////////////////
// End Address Validation
///////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////
// Start Age Validation
///////////////////////////

/*
 * Age Validation Function DOM*
 */
function ageValidation(age) {
  age.addEventListener("change", function () {
    if (isValidAge(age)) {
      age.style.backgroundColor = "green";
    } else {
      age.style.backgroundColor = "red";
    }
  });
}

function isValidAge(age) {
  if (age.value < 60 && age.value >= 18) return true;
  return false;
}
///////////////////////////
// End Age Validation
///////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////
// Start Email Validation
///////////////////////////

/*
 * Email Validation Function DOM*
 */
function signUpEmailValidation(email) {
  signUpEmail.addEventListener("keyup", function () {
    if (isEmail(email.value)) {
      signUpEmail.style.backgroundColor = "green";
    } else {
      signUpEmail.style.backgroundColor = "red";
    }
  });
}
function emailValidation(email) {
  email.addEventListener("keyup", function () {
    if (isEmail(email.value)) {
      email.style.backgroundColor = "green";
    } else {
      email.style.backgroundColor = "red";
    }
  });
}

/*
 * Email Validation Function REGEX*
 */
function isEmail(email) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.match(regex) || email == null) return true;
  return false;
}

///////////////////////////
// End Email Validation
///////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
