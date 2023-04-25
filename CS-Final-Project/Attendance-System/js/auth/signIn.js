let email = document.getElementById("email");
let button = document.getElementById("button");
const form = document.getElementById("form");
formValidation(button, email);
emailValidation(email);

function formValidation(button, email) {
  form.addEventListener("change", function () {
    if (isEmail(email.value)) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
}
///////////////////////////
// Start Email Validation
///////////////////////////
/*
 * Name Validation Function DOM*
 */

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

///////////////////////////
// Start Email Validation
///////////////////////////

/*
 * Email Validation Function DOM*
 */
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
