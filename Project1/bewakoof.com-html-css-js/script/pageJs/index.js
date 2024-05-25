import { topBarCont } from "../CompFunc/topBarCont.js";
import { mainNavbarCont } from "../CompFunc/mainNavbarCont.js";
import { createProductCard } from "../CompFunc/productCard.js";
import { footer } from "../CompFunc/footer.js";
import { dataFetch } from "../CompFunc/dataFetch.js";
import { checkUser } from "../CompFunc/checkUser.js";

Promise.all([
  dataFetch("topBarLinks"),
  dataFetch("topBarRightLinks"),
  dataFetch("mainNavbarLinks"),
  dataFetch("bottomBarLinks"),
  dataFetch("heroBanners"),
  dataFetch("categories"),
  dataFetch("wideBanners"),
  dataFetch("trendingCategories"),
  dataFetch("products"),
])
  .then(
    ([
      topBarLinks,
      topBarRightLinks,
      mainNavbarLinks,
      bottomBarLinks,
      heroBanners,
      categories,
      wideBanners,
      trendingCategories,
      products,
    ]) => {
      
      const { token, user } = checkUser();

      // topbar start
      const topBar = document.getElementById("topBar");
      const topBarContainer = topBarCont(topBarLinks, topBarRightLinks);
      topBar.appendChild(topBarContainer);
      // topbar end

      // mainNavbar start
      const mainNavbar = document.getElementById("mainNavbar");
      const mainNavbarContainer = mainNavbarCont( mainNavbarLinks, false );
      mainNavbar.appendChild(mainNavbarContainer);
      // mainNavbar end

      // bottomBar start
      const bottomBar = document.getElementById("bottomBar");
      const bottomBarContainer = document.createElement("ul");
      bottomBarLinks.forEach((linkData) => {
        const bottomBarLi = document.createElement("li");
        const bottomBarLink = document.createElement("a");
        bottomBarLink.href = linkData.url;
        bottomBarLink.textContent = linkData.name;
        bottomBarLi.appendChild(bottomBarLink);
        bottomBarContainer.append(bottomBarLi);
      });

      bottomBar.appendChild(bottomBarContainer);
      // bottomBar end

      // home-container start
      const homeContainer = document.getElementById("home-container");

      // slider heroComp start
      const heroComp = document.createElement("div");
      heroComp.className = "heroComp";

      const carousel = document.createElement("div");
      carousel.className = "carousel";

      let isDragStart = false,
        prevPageX,
        prevScrollLeft;

      const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX;
        prevScrollLeft = carousel.scrollLeft;
      };

      const dragging = (e) => {
        if (!isDragStart) return;
        e.preventDefault();
        let positionDiff = e.pageX - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
      };

      const dragStop = () => {
        isDragStart = false;
      };

      carousel.addEventListener("mousedown", dragStart);
      carousel.addEventListener("mousemove", dragging);
      carousel.addEventListener("mouseup", dragStop);

      const prevBtn = document.createElement("i");
      prevBtn.className = "fa-solid fa-angle-left";
      addClickEvent(prevBtn);
      prevBtn.id = "left";

      heroBanners.forEach((linkData) => {
        const banner = document.createElement("img");
        banner.src = linkData.path;
        carousel.appendChild(banner);
      });

      const nextBtn = document.createElement("i");
      nextBtn.className = "fa-solid fa-angle-right";
      addClickEvent(nextBtn);
      nextBtn.id = "right";

      function addClickEvent(button) {
        button.addEventListener("click", () => {
          // console.log(button);
          const firstImg = carousel.querySelector("img");
          let firstImgWidth = firstImg.clientWidth + 2;
          carousel.scrollLeft +=
            button.id == "left" ? -firstImgWidth : firstImgWidth;
        });
      }

      heroComp.append(prevBtn, carousel, nextBtn);
      // slider heroComp end

      // widgetSlider start
      const widgetContainer = document.createElement("div");
      widgetContainer.className = "widgetContainer";
      categories.forEach((linkData) => {
        const categoryContainer = document.createElement("a");
        categoryContainer.href = linkData.url;
        const categoryImg = document.createElement("img");
        categoryImg.src = linkData.image;
        const categoryName = document.createElement("p");
        categoryName.textContent = linkData.name;
        categoryContainer.append(categoryImg, categoryName);
        widgetContainer.appendChild(categoryContainer);
      });
      // widgetSlider end

      // bannerNo1 start
      const bannerNo1Container = document.createElement("div");
      bannerNo1Container.className = "bannerNo1Container";
      wideBanners.forEach((linkData) => {
        const bannerLink = document.createElement("a");
        const bannerNo1 = document.createElement("img");
        bannerNo1.src = linkData.image;
        bannerLink.appendChild(bannerNo1);
        bannerNo1Container.appendChild(bannerLink);
      });
      // bannerNo1 start

      // trendingCategory start
      const trendingCateCont = document.createElement("div");
      trendingCateCont.className = "trendingCateCont";

      const trendingHeading = document.createElement("p");
      trendingHeading.textContent = "TRENDING CATEGORIES";

      const trendingCateBanner = document.createElement("div");
      trendingCategories.forEach((linkData) => {
        const bannerLink = document.createElement("a");
        const bannerImg = document.createElement("img");
        bannerImg.src = linkData.image;

        bannerLink.appendChild(bannerImg);
        trendingCateBanner.appendChild(bannerLink);
      });

      trendingCateCont.append(trendingHeading, trendingCateBanner);
      // trendingCategory end

      // product card start

      const sortedProducts = products.sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      );
      const bestSeller = sortedProducts.slice(0, 5);
      const bestSellerContainer = document.createElement("div");
      bestSellerContainer.className = "bestSellerContainer";
      const bestSellerHeading = document.createElement("p");
      bestSellerHeading.textContent = "BESTSELLERS";
      const productContainer = document.createElement("div");
      productContainer.appendChild(bestSellerHeading);
      productContainer.className = "productContainer";
      bestSeller.forEach((productData) => {
        const productCard = createProductCard(productData, "home");
        productContainer.appendChild(productCard);
      });
      bestSellerContainer.append(bestSellerHeading, productContainer);
      // product card end

      // home-container end

      // footer start
      const footerContainer = document.getElementById("footer");
      const footerCont = footer();
      footerContainer.appendChild(footerCont);

      // footer end

      homeContainer.append(
        heroComp,
        widgetContainer,
        bannerNo1Container,
        trendingCateCont,
        bestSellerContainer
      );
    }
  )
  .catch((error) => console.error(error));
