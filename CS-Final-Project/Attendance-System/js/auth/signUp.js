window.addEventListener("load", function () {
  ///////////////////////////
  ///* Start Init variables
  ///////////////////////////
  let firstNameV = "";
  let lastNameV = "";
  let addressV = "";
  let ageV = "";
  let emailV = "";
  ///////////////////////////
  ///* End Init variables
  ///////////////////////////

  ///////////////////////////
  ///* Start Get Elements
  ///////////////////////////
  const signUpForm = document.getElementById("signUpForm");

  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let address = document.getElementById("address");
  let age = document.getElementById("age");
  let signUpEmail = document.getElementById("signUpEmail");
  let signUpButton = document.getElementById("signUpButton");
  signUpButton.disabled = true;
  ///////////////////////////
  ///* End Get Elements
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Call Functions
  ///////////////////////////
  signUpFormValidation(
    signUpButton,
    firstName,
    lastName,
    address,
    age,
    signUpEmail
  );
  firstNameValidation(firstName);
  lastNameValidation(lastName);
  signUpEmailValidation(signUpEmail);
  addressValidation(address);
  ageValidation(age);

  ///////////////////////////
  ///* End Call Functions
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Auth Validations Functions
  ///////////////////////////

  function signUpFormValidation(
    signUpButton,
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
        signUpButton.disabled = false;
        firstNameV = firstName.value;
        lastNameV = lastName.value;
        addressV = address.value;
        ageV = age.value;
        emailV = email.value;
      } else {
        signUpButton.disabled = true;
      }
    });
  }

  ///////////////////////////
  ///* End Auth Validations Functions
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Name Validation
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
  ///* End Name Validation
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Address Validation
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
  ///* End Address Validation
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Age Validation
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
  ///* End Age Validation
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Email Validation
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

  /*
   * Email Validation Function REGEX*
   */
  function isEmail(email) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(regex) || email == null) return true;
    return false;
  }

  ///////////////////////////
  ///* End Email Validation
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////
  ///* Start Local Storage
  ///////////////////////////
  var emailArr = [];
  function saveForm() {
    let user = {
      firstName: firstNameV.toLowerCase(),
      lastName: lastNameV.toLowerCase(),
      address: addressV.toLowerCase(),
      age: ageV,
      email: emailV.toLowerCase(),
      role: "employee",
    };
    const users = window.localStorage.getItem("users");

    if (users === null) {
      window.localStorage.setItem("users", JSON.stringify([user]));
    } else {
      const getCurrentUsers = window.localStorage.getItem("users");
      const currentUsers = JSON.parse(getCurrentUsers);
      if (!emailArr.includes(user.email)) {
        currentUsers.push(user);
        window.localStorage.setItem("users", JSON.stringify(currentUsers));
      } else {
        alert("This email had Registered before\nTry sign in");
      }
    }
  } // end of set data

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  function getForm() {
    const oldInfo = JSON.parse(localStorage.getItem("users"));
    if (oldInfo != null) {
      oldInfo.forEach((element) => {
        emailArr.push(element.email);
        //console.log(element);
      });
    }
  }
  getForm();
  signUpButton.addEventListener("click", saveForm);

  ///////////////////////////
  ///* End Local Storage
  ///////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////
}); // End Of Load
