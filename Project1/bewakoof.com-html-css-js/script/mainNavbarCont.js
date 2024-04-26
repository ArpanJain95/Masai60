function mainNavbarCont(mainNavbarLinks, isLoginPage) {
  const mainNavbarContainer = document.createElement("div");
  mainNavbarContainer.id = "mainNavbar-container";
  const mainNavbarLeftCont = document.createElement("div");
  mainNavbarLeftCont.id = "mainNavbar-left-cont";
  const mainNavbarLogo = document.createElement("div");
  mainNavbarLogo.id = "mainNavbar-logo";
  const mainNavbarLogoLink = document.createElement("a");
  mainNavbarLogoLink.href = "./";
  const mainNavbarImg = document.createElement("img");
  mainNavbarImg.src = "./image/ic-desktop-bwkf-trademark-logo-bday-y24.svg";
  mainNavbarImg.alt = "bewakoof logo";
  const mainNavbarMenu = document.createElement("div");
  mainNavbarMenu.id = "mainNavbar-menu";
  mainNavbarLinks.forEach((linkData) => {
    const link = document.createElement("a");
    link.href = linkData.url;
    link.textContent = linkData.name;
    mainNavbarMenu.appendChild(link);
  });

  const mainNavbarRightCont = document.createElement("div");
  mainNavbarRightCont.id = "mainNavbar-right-cont";
  const mainNavSearch = document.createElement("div");
  mainNavSearch.id = "mainNavSearch"
  const mainNavSearchForm = document.createElement("form");

  const searchIcon = document.createElement("i");
  searchIcon.className = "fa-solid fa-magnifying-glass";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search by product, category, or collection";

  const seperator = document.createElement("div");
  const seperatorP = document.createElement("p");
  seperatorP.innerText = "|";
  seperatorP.id = "seperatorP";

  seperator.appendChild(seperatorP);

  mainNavSearchForm.append(searchIcon, searchInput);

  mainNavSearch.appendChild(mainNavSearchForm);

  const mainNavMyAccount = document.createElement("div");
  mainNavMyAccount.id = "mainNavMyAccount"
  if(!isLoginPage){
      const loginBtn = document.createElement("a");
      loginBtn.href = "./login.html";
      loginBtn.textContent = "Login";
      mainNavMyAccount.appendChild(loginBtn)
  }

  const wishlistBtn = document.createElement("a");
  wishlistBtn.href = "./wishlist.html";
  const wishlistIcon = document.createElement("i");
  wishlistIcon.className = "fa-regular fa-heart";

  wishlistBtn.appendChild(wishlistIcon);

  const cartBtn = document.createElement("a");
  cartBtn.href = "./cart.html";
  const cartIcon = document.createElement("i");
  cartIcon.className = "fa-solid fa-bag-shopping";

  cartBtn.appendChild(cartIcon);

  mainNavMyAccount.append(wishlistBtn, cartBtn);
  mainNavbarRightCont.append(mainNavSearch, seperator, mainNavMyAccount);

  mainNavbarLogoLink.appendChild(mainNavbarImg);
  mainNavbarLogo.appendChild(mainNavbarLogoLink);
  mainNavbarLeftCont.append(mainNavbarLogo, mainNavbarMenu);
  mainNavbarContainer.append(mainNavbarLeftCont, mainNavbarRightCont);

  return mainNavbarContainer;
}

export { mainNavbarCont };
