import { dataFetch } from "../script/dataFetch.js";

function loginComponent() {
    const loginComp = document.createElement("div");
    loginComp.id = "login-Comp";

    const loginDivLeft = createLoginDivLeft();
    const loginDivRight = createLoginDivRight();

    loginComp.append(loginDivLeft, loginDivRight);
    
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
                <input type="text" id="mobileNumberInput" placeholder="Enter Mobile Number">
            </div>
            <button type="submit">CONTINUE</button>
            <p>By creating an account or logging in, you agree with Bewakoof®'s Terms and Conditions and Privacy Policy.</p>
        </form>
    `;

    const loginForm = loginDivRight.querySelector("#loginForm");
    loginForm.addEventListener('submit', handleLoginSubmit);
    
    return loginDivRight;
}

async function handleLoginSubmit(event) {
    event.preventDefault();
    const mobileNumberInput = document.getElementById('mobileNumberInput');
    const mobileNumber = mobileNumberInput.value;

    const userData = await userDataFetch();

    const userExists = userData.some(user => user.mobileNo === mobileNumber)

    if(userExists) {
        alert("Mobile number exists")
        openOTPPopup(mobileNumber);
    } else {
        alert("Mobile number dose not exists")
    }
}

async function openOTPPopup(number) {

    const otpForm = document.createElement("div");
    const heading = document.createElement("h2");
    heading.innerText = "Verify with OTP";
    const numberForm = document.createElement("form");
    const numberInput = document.createElement("input");
    numberInput.placeholder = number;
    numberInput.disabled = true;
    const numberLabel = document.createElement("label");
    numberLabel.textContent = "Sent to";


    numberForm.append(numberLabel, numberInput);
    otpForm.append(heading, numberForm);
    document.body.appendChild(otpForm);

    return otpForm;
}

async function userDataFetch() {
    const response = await fetch("http://localhost:3000/user");
    const data = await response.json();
    return data
}

export { loginComponent };
