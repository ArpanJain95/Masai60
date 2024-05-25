import { signUpCont } from "./signUpForm.js";

function loginComponent() {
  const loginComp = document.createElement("div");
  loginComp.id = "login-Comp";

  const loginDivLeft = createLoginDivLeft();
  const loginDivRight = createLoginDivRight();
  
  loginComp.append(loginDivLeft, loginDivRight);
  
  const loginForm = loginDivRight.querySelector("#loginForm");
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const mobileNumberInput = document.getElementById("mobileNumberInput");
    const mobileNumber = mobileNumberInput.value;
    
    const userData = await userDataFetch();
    
    const userExists = userData.find((user) => user.mobileNo === mobileNumber);
    
    if (userExists) {
      alert("Mobile number exists");
      loginDivLeft.remove();
      loginDivRight.remove();
      setTimeout(genrateOTP, 6000)
      const otpForm = openOTPPopup(userExists);
      loginComp.appendChild(otpForm);
    } else {
      loginDivLeft.remove();
      loginDivRight.remove();
      const signUpForm = signUpCont(mobileNumber)
      loginComp.append(signUpForm);
    }
  });

  return loginComp;
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
                <input type="tel" id="mobileNumberInput" placeholder="Enter Mobile Number" maxlength="10">
            </div>
            <button type="submit">CONTINUE</button>
            <p>By creating an account or logging in, you agree with Bewakoof®'s Terms and Conditions and Privacy Policy.</p>
        </form>
    `;

  return loginDivRight;
}

function openOTPPopup(userlogingin) {
  console.log(userlogingin);
  const otpForm = document.createElement("div");
  otpForm.id = "otpForm";
  otpForm.innerHTML = `
        <h2>Verify with OTP</h2>
        <form>
            <label>Sent to</label>
            <input type="text" placeholder=${userlogingin.mobileNo} disabled>
        </form>
        <div>
            <p>Enter OTP</p>
            <form id="otpInput">
                <div class="otp-box">
                    <input name="otp1" type="tel" autocomplete="off" class="otpInput undefined " tabindex="1" maxlength="1" placeholder="" value="">
                    <input name="otp2" type="tel" autocomplete="off" class="otpInput undefined " tabindex="2" maxlength="1" placeholder="" value="">
                    <input name="otp3" type="tel" autocomplete="off" class="otpInput undefined " tabindex="3" maxlength="1" placeholder="" value="">
                    <input name="otp4" type="tel" autocomplete="off" class="otpInput undefined " tabindex="4" maxlength="1" placeholder="" value="">
                </div>
                <div>
                    <button id="resendOTP">RESEND OTP</button>
                </div>
                <button id="loginButton" type="submit">Login</button>
            </form>
        </div>
        `;
        const otpInput = otpForm.querySelector("#otpInput");
        const resendOTPBtn = otpForm.querySelector("#resendOTP");
        
        otpInput.addEventListener("submit", function(event) {
          event.preventDefault();
          const otp1 = otpInput.elements["otp1"].value;
          const otp2 = otpInput.elements["otp2"].value;
          const otp3 = otpInput.elements["otp3"].value;
          const otp4 = otpInput.elements["otp4"].value;
          const enteredOTP = otp1+otp2+otp3+otp4;
        
          if (enteredOTP == otp) {
            // logic for loging in
            const token = genrateToken();
            const userToken = {
              token: token,
              user: userlogingin
            };
            localStorage.setItem("userToken", JSON.stringify(userToken));

            const redirectUrl = localStorage.getItem("redirectAfterLogin");
            if(redirectUrl) {
              window.location.href = redirectUrl
              localStorage.removeItem("redirectAfterLogin")
            } else {
              window.location.href = "index.html";
            }
            otp = undefined;
          } else {
            console.log("wrong otp");
          }
        });

        resendOTPBtn.addEventListener("click", function(event) {
          event.preventDefault();
          otp = undefined;
          genrateOTP()
        })

  return otpForm;
}

let otp;

function genrateOTP() {
  otp = Math.floor(Math.random() * 9000) + 1000;
  alert (otp);
}

function genrateToken() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const tokenLength = 32;
  let token = "";
  for (let i=0; i<tokenLength; i++){
    token += characters.charAt(Math.floor(Math.random()*characters.length));
  }
  return token;
}

async function userDataFetch() {
  const response = await fetch("http://localhost:3000/user");
  const data = await response.json();
  return data;
}

export { loginComponent };
