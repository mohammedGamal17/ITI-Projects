let email = document.getElementById("email");
let button = document.getElementById("button");
emailValidation(button, email);

///////////////////////////
// Start Email Validation
///////////////////////////
/*
 * Email Validation Function DOM*
 */
function emailValidation(button, email) {
  button.disabled = true;

  email.addEventListener("keyup", function () {
    if (isEmail(email.value)) {
      email.style.backgroundColor = "green";
      button.disabled = false;
    } else {
      email.style.backgroundColor = "red";
      button.disabled = true;
    }
    console.log(isEmail(email.value));
  });
}

/*
 * Email Validation Function REGEX*
 */
function isEmail(emailAddress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAddress.match(regex) || emailAddress == null) return true;
  return false;
}
///////////////////////////
// End Validation
///////////////////////////
