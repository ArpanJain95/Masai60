function checkUser(){
    let token = null;
    let user = null;
    const userTokenString = localStorage.getItem("userToken");
    if(userTokenString) {
        const userToken = JSON.parse(userTokenString);
        token = userToken.token;
        user = userToken.user;
    }

    return {userTokenString, token, user }
}

export { checkUser };