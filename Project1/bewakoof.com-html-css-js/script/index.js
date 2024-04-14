fetch("data/db.json")
    .then(response => response.json())
    .then(data => {
        const topBarLinks = data.topBarLinks;
        const topBarRightLinks = data.topBarRightLinks;
        const mainNavbarLinks = data.mainNavbarLinks;
        const bottomBarLinks = data.bottomBarLinks;
        const heroBanners = data.heroBanners;
        const categories = data.categories;
        const wideBanners = data.wideBanners;
        const trendingCategories = data.trendingCategories;

        // topbar start
        const topBar = document.getElementById("topBar");
        const topBarContainer = document.createElement("div")
        topBarContainer.className = "topBar-Cont";


        const leftContainer = document.createElement("div");
        leftContainer.className = "left-cont";

        topBarLinks.forEach(linkData => {
            const link = document.createElement("a");
            link.className = "topBar-link";
            link.href = linkData.url;
            if (linkData.icon) {
                const icon = document.createElement("i");
                icon.className = linkData.icon;
                link.appendChild(icon);
            }
            const textNode = document.createTextNode(linkData.name);
            link.appendChild(textNode);
            leftContainer.appendChild(link);
        });

        topBarContainer.appendChild(leftContainer);

        const rightContainer = document.createElement("div");
        rightContainer.className = "right-cont";

        topBarRightLinks.forEach(linkData => {
            const link = document.createElement("a");
            link.className = "topBar-link";
            link.href = linkData.url;
            link.textContent = linkData.name;
            rightContainer.appendChild(link);
        });

        topBarContainer.appendChild(rightContainer);

        topBar.appendChild(topBarContainer)
        // topbar end

        // mainNavbar start
        const mainNavbarMenu = document.getElementById("mainNavbar-menu");
        mainNavbarLinks.forEach(linkData => {
            const link = document.createElement("a");
            link.href = linkData.url;
            link.textContent = linkData.name;
            mainNavbarMenu.appendChild(link)
        })


        const mainNavSearch = document.getElementById("mainNavSearch");
        const mainNavSearchForm = document.createElement("form");

        const searchIcon = document.createElement("i");
        searchIcon.className = "fa-solid fa-magnifying-glass"

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = "Search by product, category, or collection";

        const seperator = document.createElement("div")
        
        mainNavSearchForm.append(searchIcon, searchInput);

        mainNavSearch.appendChild(mainNavSearchForm)

        const mainNavMyAccount = document.getElementById("mainNavMyAccount");
        const loginBtn = document.createElement("a");
        loginBtn.href = "./login.html"
        loginBtn.textContent = "Login"

        const wishlistBtn = document.createElement("a");
        wishlistBtn.href = "./wishlist.html"
        wishlistIcon = document.createElement("i")
        wishlistIcon.className = "fa-regular fa-heart"

        wishlistBtn.appendChild(wishlistIcon)

        const cartBtn = document.createElement("a");
        cartBtn.href = "./cart.html"
        cartIcon = document.createElement("i");
        cartIcon.className = "fa-solid fa-bag-shopping"

        cartBtn.appendChild(cartIcon)

        mainNavMyAccount.append(loginBtn, wishlistBtn, cartBtn);
        // mainNavbar end

        // bottomBar start
        const bottomBar = document.getElementById("bottomBar");
        const bottomBarContainer =  document.createElement("ul");
        bottomBarLinks.forEach(linkData => {
            const bottomBarLi = document.createElement("li");
            const bottomBarLink = document.createElement("a");
            bottomBarLink.href = linkData.url
            bottomBarLink.textContent = linkData.name
            bottomBarLi.appendChild(bottomBarLink)
            bottomBarContainer.append(bottomBarLi)
        })

        bottomBar.appendChild(bottomBarContainer)
        // bottomBar end

        // home-container start
        const homeContainer = document.getElementById("home-container");

        // slider heroComp start
        const heroComp = document.createElement("div");
        heroComp.className = "heroComp"

        const carousel = document.createElement("div");
        carousel.className = "carousel";

        let isDragStart = false, prevPageX, prevScrollLeft;

        const dragStart = (e) => {
            isDragStart = true;
            prevPageX = e.pageX;
            prevScrollLeft = carousel.scrollLeft;
        }

        const dragging = (e) => {
            if (!isDragStart) return;
            e.preventDefault();
            let positionDiff = e.pageX - prevPageX;
            carousel.scrollLeft = prevScrollLeft - positionDiff;
        }

        const dragStop = () => {
            isDragStart = false;
        }

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        carousel.addEventListener("mouseup", dragStop);

        const prevBtn =  document.createElement("i");
        prevBtn.className = "fa-solid fa-angle-left";
        addClickEvent(prevBtn)
        prevBtn.id = "left"
        
        heroBanners.forEach(linkData => {
            const banner = document.createElement("img");
            banner.src = linkData.path;
            carousel.appendChild(banner)
        })

        const nextBtn = document.createElement("i");
        nextBtn.className = "fa-solid fa-angle-right";
        addClickEvent(nextBtn)
        nextBtn.id = "right"

        function addClickEvent(button) {
            button.addEventListener("click", () => {
                // console.log(button);
                const firstImg = carousel.querySelector("img");
                let firstImgWidth = firstImg.clientWidth + 2;
                carousel.scrollLeft += button.id == "left" ? -firstImgWidth : firstImgWidth;
            })
        }
        
        heroComp.append(prevBtn, carousel, nextBtn)
        // home-container end

        // widgetSlider start
        const widgetContainer = document.createElement("div");
        widgetContainer.className = "widgetContainer";
        categories.forEach(linkData => {
            const categoryContainer = document.createElement("a");
            categoryContainer.href = linkData.url;
            const categoryImg = document.createElement("img");
            categoryImg.src = linkData.image;
            const categoryName = document.createElement("p");
            categoryName.textContent = linkData.name;
            categoryContainer.append(categoryImg, categoryName);
            widgetContainer.appendChild(categoryContainer);
        })
        // widgetSlider end

        // bannerNo1 start
        const bannerNo1Container = document.createElement("div");
        bannerNo1Container.className = "bannerNo1Container"
        wideBanners.forEach(linkData => {
            const bannerLink = document.createElement("a");
            const bannerNo1 = document.createElement("img");
            bannerNo1.src = linkData.image;
            bannerLink.appendChild(bannerNo1);
            bannerNo1Container.appendChild(bannerLink);
        })
        // bannerNo1 start

        // trendingCategory start
        const trendingCateCont = document.createElement("div");
        trendingCateCont.className = "trendingCateCont";

        const trendingHeading = document.createElement("p");
        trendingHeading.textContent = "TRENDING CATEGORIES";

        const trendingCateBanner = document.createElement("div");
        trendingCategories.forEach(linkData => {
            const bannerLink = document.createElement("a");
            const bannerImg = document.createElement("img");
            bannerImg.src = linkData.image

            bannerLink.appendChild(bannerImg)
            trendingCateBanner.appendChild(bannerLink)
        })

        trendingCateCont.append(trendingHeading, trendingCateBanner)
        // trendingCategory end

        homeContainer.append(heroComp, widgetContainer, bannerNo1Container, trendingCateCont)
    })
    .catch(error => console.error("Error fetching data:", error));
