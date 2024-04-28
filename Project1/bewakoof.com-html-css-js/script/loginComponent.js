import { dataFetch } from "../script/dataFetch.js";

function loginComponent() {
  const loginComp = document.createElement("div");
  loginComp.id = "login-Comp";

  const loginDivLeft = createLoginDivLeft();
  const loginDivRight = createLoginDivRight();
  const otpForm = openOTPPopup();

  displayLoginForm(true);

  return loginComp;

  function displayLoginForm(showLoginForm) {
    if (showLoginForm) {
        loginComp.innerHTML = "";
        loginComp.append(loginDivLeft, loginDivRight);
    } else {
        loginComp.innerHTML = "";
        loginComp.appendChild(otpForm);
    }
  };
}

function createLoginDivLeft() {
  const loginDivLeft = document.createElement("div");
  loginDivLeft.id = "loginDivLeft";

  loginDivLeft.innerHTML = `
        <h2>Welcome to the world of Bewakoof®!</h2>
        <img src="https://images.bewakoof.com/web/group-19-1617704502.png" alt="Bewakoof logo">
    `;

  return loginDivLeft;
}

function createLoginDivRight() {
  const loginDivRight = document.createElement("div");
  loginDivRight.id = "loginDivRight";

  loginDivRight.innerHTML = `
        <h1>Log in / Sign up</h1>
        <p>for Latest trends, exciting offers and everything Bewakoof®!</p>
        <form id="loginForm">
            <div>
                <div>
                    <img src="https://images.bewakoof.com/web/india-flag-round-1639566913.png" alt="India flag">
                    <span>+91</span>
                </div>
                <input type="text" id="mobileNumberInput" placeholder="Enter Mobile Number">
            </div>
            <button type="submit">CONTINUE</button>
            <p>By creating an account or logging in, you agree with Bewakoof®'s Terms and Conditions and Privacy Policy.</p>
        </form>
    `;

  const loginForm = loginDivRight.querySelector("#loginForm");
  loginForm.addEventListener("submit", handleLoginSubmit);

  return loginDivRight;
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const mobileNumberInput = document.getElementById("mobileNumberInput");
  const mobileNumber = mobileNumberInput.value;

  const userData = await userDataFetch();

  const userExists = userData.some((user) => user.mobileNo === mobileNumber);

  if (userExists) {
    alert("Mobile number exists");
    displayLoginForm(false);
    openOTPPopup(mobileNumber);
  } else {
    alert("Mobile number dose not exists");
  }
}

async function openOTPPopup(number) {
  const otpForm = document.createElement("div");
  otpForm.id = "otpForm";
  otpForm.innerHTML = `
        <h2>Verify with OTP</h2>
        <form>
            <label>Sent to</label>
            <input type="text" placeholder=${number} disabled>
        </form>
        <div>
            <p>Enter OTP</p>
            <form>
                <div class="otp-box">
                    <input name="otp1" type="tel" autocomplete="off" class="otpInput undefined " tabindex="1" maxlength="1" placeholder="" value="">
                    <input name="otp2" type="tel" autocomplete="off" class="otpInput undefined " tabindex="2" maxlength="1" placeholder="" value="">
                    <input name="otp3" type="tel" autocomplete="off" class="otpInput undefined " tabindex="3" maxlength="1" placeholder="" value="">
                    <input name="otp4" type="tel" autocomplete="off" class="otpInput undefined " tabindex="4" maxlength="1" placeholder="" value="">
                </div>
                <div>
                    <button>
                        RESEND OTP
                    </button>
                </div>
                <button disabled type="submit">Login</button>
            </form>
        </div>
        `;
  document.body.appendChild(otpForm);

  return otpForm;
}

async function userDataFetch() {
  const response = await fetch("http://localhost:3000/user");
  const data = await response.json();
  return data;
}

export { loginComponent };
