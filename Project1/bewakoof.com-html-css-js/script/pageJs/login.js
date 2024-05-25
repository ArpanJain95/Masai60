import { topBarCont } from "../CompFunc/topBarCont.js";
import { dataFetch } from "../CompFunc/dataFetch.js";
import { mainNavbarCont } from "../CompFunc/mainNavbarCont.js";
import { loginComponent } from "../CompFunc/loginComponent.js";

const loginContainer = document.getElementById("login-cont");
Promise.all([
  dataFetch("topBarLinks"),
  dataFetch("topBarRightLinks"),
  dataFetch("mainNavbarLinks"),
])
.then(([topBarLinks, topBarRightLinks, mainNavbarLinks]) => {
  // topbar start
  const topBar = document.createElement("div");
  topBar.id = "topBar";
  const topBarContainer = topBarCont(topBarLinks, topBarRightLinks);
  topBar.appendChild(topBarContainer);
  // topbar end

  // mainNavbar start
  const mainNavbar = document.createElement("div");
  mainNavbar.id = "mainNavbar";
  const mainNavbarContainer = mainNavbarCont(mainNavbarLinks, true);
  mainNavbar.appendChild(mainNavbarContainer);
  // mainNavbar end

  // loginComponent start

  const loginComp = loginComponent();

  // loginComponent end

  loginContainer.append(topBar, mainNavbar, loginComp);
})
.catch(error => console.error(error));
