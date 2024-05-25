import { dataFetch } from "../CompFunc/dataFetch.js";
import { addToCartButton } from "../CompFunc/addToCart.js";
import { mainNavbarCont } from "../CompFunc/mainNavbarCont.js";
import { topBarCont } from "../CompFunc/topBarCont.js";
import { footer } from "../CompFunc/footer.js";

function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function productDetail() {
  const detailsMain = document.getElementById("detailsMain");

  const productId = getProductId();
  if (!productId) {
    detailsMain.textContent = "Products Not Found";
    return;
  }

  Promise.all([
    dataFetch("topBarLinks"),
    dataFetch("topBarRightLinks"),
    dataFetch("mainNavbarLinks"),
    dataFetch("products"),
  ])
    .then(([topBarLinks, topBarRightLinks, mainNavbarLinks, products]) => {
      // topbar start
      const topBar = document.createElement("div");
      topBar.id = "topBar";
      const topBarContainer = topBarCont(topBarLinks, topBarRightLinks);
      topBar.appendChild(topBarContainer);
      // topbar end

      // mainNavbar start
      const mainNavbar = document.createElement("div");
      mainNavbar.id = "mainNavbar";
      const mainNavbarContainer = mainNavbarCont(mainNavbarLinks, false);
      mainNavbar.appendChild(mainNavbarContainer);
      // mainNavbar end

      detailsMain.append(topBar, mainNavbar);

      const product = products.find((p) => p.id == productId);
      if (product) {
        detailsMain.textContent = "";
        const productImg = document.createElement("img");
        productImg.src = product.images[0];
        productImg.style = "width: 50%";

        const productName = document.createElement("h1");
        productName.textContent = `${product.color} ${product.name} ${product.category}`;

        const addToCartBtn = addToCartButton(product.id);
        detailsMain.append(topBar, mainNavbar, productImg, productName, addToCartBtn);
      } else {
        detailsMain.textContent = "Product Not Found";
      }

      // footer start
      const footerContainer = document.createElement("div");
      const footerCont = footer();
      footerContainer.appendChild(footerCont);
      // footer end

      detailsMain.appendChild(footerContainer);
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
      detailsMain.textContent = "Error loading product details";
    });
}

productDetail();
