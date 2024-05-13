function signUpCont (mobileNumber) {
    const signUpWrapper = document.createElement("div");
    signUpWrapper.className = "signUpWrapper";
    signUpWrapper.innerHTML = `
        <div id="leftDiv">
            <img src="" alt="">
        </div>
        <div id="rightDiv">
            <div id="rightDivCont">
                <h1>Sign Up</h1>
                <p>Hi new buddy, let's get you started with the bewakoofi!</p>
                <form id="signUpForm">
                    <div className="signUpName">
                        <input type="text" placeholder="Name" name="name">
                    </div>
                    <div className="signUpMobile">
                        <input type="text" placeholder="Mobile" name="mobileNo">
                    </div>
                    <div className="signUpEmailId">
                        <input type="text" placeholder="Email Id" name="emailID">
                    </div>
                    <div className="signUpPassword">
                        <input type="text" placeholder="Password"  name="password">
                    </div>
                    <div className="signUpCheckbox">
                        <input type="checkbox"  name="receiveUpdates">
                        <span>I want to receive order updates on Whatsapp</span>
                    </div>
                    <button type="submit">PROCEED</button>
                </form>
            </div>
        </div>
    `

    const signUpForm = signUpWrapper.querySelector("#signUpForm");
    signUpForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(signUpForm);
        const userData = Object.fromEntries(formData.entries());

        fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if(!response.ok) {
                throw new error("Failed to save user data");
            }
            return response.json();
        })
        .then(data => {
            console.log("User data saved successfully:", data);
            window.location.href = "login.html";
        })
        .catch(error => {
            console.error("Error:", error);
        })
    });

    return signUpWrapper;
}

export { signUpCont }