import { checkUser } from "./checkUser.js";

function addToCartButton(productId, quantity) {
  const button = document.createElement("button");
  button.innerText = "Add To Cart";
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const { token, user } = checkUser();
    if (token && user) {
      if (!user.cart) {
        user.cart = [];
      }

      const productIdExists = user.cart.findIndex(item => item.orderId === productId)

      if(productIdExists <= 0){
        user.cart.push({orderId: productId, quantity: 1});
      } else {
        user.cart[productIdExists].quantity += 1;
        // window.location.href = `./cart.html?id=${user.id}`;
      }

      const userTokenString = localStorage.getItem("userToken");
      const userToken = JSON.parse(userTokenString);
      userToken.user.cart = user.cart;
      localStorage.setItem("userToken", JSON.stringify(userToken));

      fetch(`http://localhost:3000/user/${user.id}`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cart: userToken.user.cart})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("Error updating the cart:", error);
      });
    } else {
      const currentUrl = window.location.href;
      localStorage.setItem("redirectAfterLogin", currentUrl);
      window.location.href = "./login.html";
    }
    console.log(user);
  });
  return button;
}

export { addToCartButton };
