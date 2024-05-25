import { mainNavbarCont } from "../CompFunc/mainNavbarCont.js";
import { dataFetch } from "../CompFunc/dataFetch.js";
import { cartComponent } from "../CompFunc/cartComp.js";
import { checkUser } from "../CompFunc/checkUser.js";

function getUserId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function cartFunc() {
  const cartContainer = document.getElementById("cart-cont");

  try {
    const [mainNavbarLinks] = await Promise.all([dataFetch("mainNavbarLinks")]);
    
    // mainNavbar start
    const mainNavbar = document.createElement("div");
    mainNavbar.id = "mainNavbar";
    const mainNavbarContainer = mainNavbarCont(mainNavbarLinks, false, true);
    mainNavbar.appendChild(mainNavbarContainer);
    // mainNavbar end

    // cart start
    const cartCont = document.createElement("div");
    const userId = getUserId();
    if (!userId) {
      cartCont.textContent = "User not found";
    } else {
      const {userTokenString, token, user} = checkUser()
      if(user && user.id && user.id == userId) {
        const cartComp = await cartComponent(user);

        console.log('cartComp:', cartComp);
        if(cartComp instanceof Node) {
          cartCont.appendChild(cartComp);
        } else {
          throw new Error('cartComp is not a Node')
        }
      } else {
        cartCont.textContent = "User not authorized or not found"
      }
    }
    // cart end
    cartContainer.append(mainNavbar, cartCont);
  } catch (error) {
    console.error(error);
  }
}

cartFunc();