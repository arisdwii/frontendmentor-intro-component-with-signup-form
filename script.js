// Select elements from the DOM for success message and countdown timer
const successForm = document.querySelector("aside.success-msg");
const secondsSuccess = document.querySelector(".seconds");

// Select input elements and corresponding error messages for form fields
const inputfname = document.querySelector(".inputfname");
const firstName = document.getElementById("first-name");
const firstnameMsg = document.querySelector(".firstname-msg");

const inputlname = document.querySelector(".inputlname");
const lastName = document.getElementById("last-name");
const lastnameMsg = document.querySelector(".lastname-msg");

const inputemail = document.querySelector(".inputemail");
const emailAddress = document.getElementById("email-address");
const emailMsg = document.querySelector(".email-msg");

const inputpassword = document.querySelector(".inputpassword");
const passwordInput = document.getElementById("password");
const eyeInput = document.querySelector(".eye");
const passwordMsg = document.querySelector(".password-msg");

// Event listener for form submission
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  // Regular expression to validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Array of inputs and their corresponding error messages
  const inputs = [
    {
      value: firstName.value,
      element: inputfname,
      elementError: firstnameMsg,
      errormsg: "First Name cannot be empty",
    },
    {
      value: lastName.value,
      element: inputlname,
      elementError: lastnameMsg,
      errormsg: "Last Name cannot be empty",
    },
    {
      value: emailAddress.value,
      element: inputemail,
      elementError: emailMsg,
      errormsg: "Email cannot be empty",
    },
    {
      value: passwordInput.value,
      element: inputpassword,
      elementError: passwordMsg,
      errormsg: "Password cannot be empty",
    },
  ];

  let allEmpty = true;
  let testEmail = false;

  // Check if any input is empty and add error messages
  inputs.forEach(({ value, element, elementError, errormsg }) => {
    if (!value) {
      element.classList.add("error");
      elementError.innerText = errormsg;
    } else {
      allEmpty = false;
    }
  });

  // If any field is empty, show error messages
  if (allEmpty) {
    inputs.forEach(({ element, elementError, errormsg }) => {
      element.classList.add("error");
      elementError.innerText = errormsg;
    });
  }

  // Check if the email is valid using regex
  if (emailRegex.test(emailAddress.value)) {
    testEmail = true;
  } else {
    testEmail = false;
    emailMsg.innerText = "Looks like this is not an email";
    inputemail.classList.add("error");
  }

  // If all inputs are valid, show success message and start countdown
  if (allEmpty === false && testEmail === true) {
    successForm.classList.remove("hidden");
    document.querySelector("article").style.display = "none"; // Hide form

    let countdown = parseInt(secondsSuccess.textContent); // Get initial countdown value

    // Countdown logic: decrement the timer every second and update the display
    const countDownInterval = setInterval(() => {
      countdown--;
      secondsSuccess.textContent = countdown;

      // When countdown reaches 0, redirect to home page
      if (countdown === 0) {
        clearInterval(countDownInterval);
        window.location.href = "/";
      }
    }, 1000);
  }
});

// Event listeners to remove error class and message on input changes
firstName.addEventListener("input", () => {
  inputfname.classList.remove("error");
  firstnameMsg.innerText = "";
});

lastName.addEventListener("input", () => {
  inputlname.classList.remove("error");
  lastnameMsg.innerText = "";
});

emailAddress.addEventListener("input", () => {
  inputemail.classList.remove("error");
  emailMsg.innerText = "";
});

// Check if password is empty, and toggle eye icon visibility
passwordInput.addEventListener("input", () => {
  passwordInput.value = passwordInput.value.trim(); // Remove leading/trailing spaces

  // If password is empty, hide the eye icon
  if (!passwordInput.value) {
    eyeInput.classList.add("hidden");
  } else {
    // Show eye icon if password input is not empty
    eyeInput.classList.remove("hidden");
    inputpassword.classList.remove("error");
    passwordMsg.innerText = "";
  }
});

// Event listener to toggle password visibility when eye icon is clicked
eyeInput.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password"; // Check current type
  passwordInput.type = isPassword ? "text" : "password"; // Toggle between password and text

  // Change eye icon based on the password visibility
  eyeInput.innerHTML = isPassword
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
         <path d="M17.94 17.94A10.11 10.11 0 0 1 12 20C5 20 1 12 1 12A19.2 19.2 0 0 1 4.22 7.37"/>
         <path d="M9.88 9.88A3 3 0 0 1 14.12 14.12"/>
         <line x1="1" y1="1" x2="23" y2="23"/>
     </svg>` // Closed eye icon (password visible)
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
         <circle cx="12" cy="12" r="3"/>
     </svg>`; // Open eye icon (password hidden)
});
