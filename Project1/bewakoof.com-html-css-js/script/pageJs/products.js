import { topBarCont } from "../CompFunc/topBarCont.js";
import { dataFetch } from "../CompFunc/dataFetch.js";
import { mainNavbarCont } from "../CompFunc/mainNavbarCont.js";
import { createProductCard } from "../CompFunc/productCard.js";

function getUniqueValues(products, key) {
  return [...new Set(products.map((product) => product[key]))];
}

function createFilterBox(title, name, values, onFilterChange) {
  const filterBox = document.createElement("div");
  filterBox.className = "filterBox";

  const filterTitle = document.createElement("h4");
  filterTitle.textContent = title;
  filterBox.appendChild(filterTitle);

  const filterList = document.createElement("ul");

  values.forEach((value) => {
    const filterItem = document.createElement("li");
    const filterInput = document.createElement("input");
    filterInput.type = "checkbox";
    filterInput.name = name;
    filterInput.value = value;
    filterInput.addEventListener("change", onFilterChange);

    const filterLabel = document.createElement("label");
    filterLabel.textContent = value;

    filterItem.append(filterInput, filterLabel);
    filterList.appendChild(filterItem);
  });

  filterBox.appendChild(filterList);
  return filterBox;
}

function renderProducts(products, container) {
  container.innerHTML = "";
  products.forEach((product) => {
    const productCont = document.createElement("div");
    const productCard = createProductCard(product, "products");
    productCont.appendChild(productCard);
    container.appendChild(productCont);
  });
}

function productsPage() {
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get("category");
  if(categoryParam) {
    const productsPageCont = document.getElementById("products-cont");
    Promise.all([
      dataFetch("topBarLinks"),
      dataFetch("topBarRightLinks"),
      dataFetch("mainNavbarLinks"),
      dataFetch("products"),
    ]).then(([topBarLinks, topBarRightLinks, mainNavbarLinks, products]) => {
  
      const filteredProducts = products.filter((product) => {
        return (
          product.category === categoryParam || product.gender === categoryParam
        );
      });
  
      const categories = getUniqueValues(filteredProducts, "category");
      const colors = getUniqueValues(filteredProducts, "color");
      const sizes = getUniqueValues(filteredProducts, "size").flat();
  
      function applyFilters() {
        const selectedCategories = [...document.querySelectorAll('input[name="category"]:checked')].map(input => input.value);
        const selectedColors = [...document.querySelectorAll('input[name="color"]:checked')].map(input => input.value);
        const selectedSizes = [...document.querySelectorAll('input[name="size"]:checked')].map(input => input.value);
  
        const filteredProducts = products.filter(product => {
          const matchesInitialCategory = product.category === categoryParam || product.gender === categoryParam;
          const matchesCategory = !selectedCategories.length || selectedCategories.includes(product.category);
          const matchesColor = !selectedColors.length || selectedColors.includes(product.color);
          const matchesSize = !selectedSizes.length || product.size.some(size => selectedSizes.includes(size));
  
          return matchesInitialCategory && matchesCategory && matchesColor && matchesSize;
        });
  
        renderProducts(filteredProducts, productContainer);
      }
  
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
  
      // breadCrumsBox start
      const breadCrumsBox = document.createElement("div");
      breadCrumsBox.className = "breadCrumsBox";
      breadCrumsBox.innerHTML = `
          <ul>
              <li>
                  <a>Home</a>
              </li>
              <li>
                  <a>${categoryParam} Clothing</a>
              </li>
          </ul>
      `;
      // breadCrumsBox end
  
      // category heading start
      const cateHeading = document.createElement("div");
      cateHeading.id = "cateHeading";
      if (filteredProducts.length > 0) {
        cateHeading.innerHTML = `
          <div>
            <h1>${categoryParam} <span>(${filteredProducts.length})</span></h1>
          </div>
        `;
      } else {
        cateHeading.innerHTML = `
          <div>
            <h1>No products available.<h1>
          </div>
        `
      }
      // category heading end
  
      // products container start
      const productsContMain = document.createElement("div");
      productsContMain.id = "productsContMain";
  
      const filterBoxMain = document.createElement("div");
      filterBoxMain.className = "filterBoxMain";
      const filterHeading = document.createElement("div");
      filterHeading.innerHTML = `
          <h4>FILTER</h4>
      `;
      const categoryFilterBox = createFilterBox("Category", "category", categories, applyFilters);
      const colorFilterBox = createFilterBox("Color", "color", colors, applyFilters);
      const sizeFilterBox = createFilterBox("Size", "size", sizes, applyFilters);
  
      filterBoxMain.append(filterHeading, categoryFilterBox, colorFilterBox, sizeFilterBox);
  
      const productContainer = document.createElement("div");
      productContainer.className = "productContainer";
  
      renderProducts(filteredProducts, productContainer);
  
      productsContMain.append(filterBoxMain, productContainer);
      // products container end
  
      productsPageCont.append(
        topBar,
        mainNavbar,
        breadCrumsBox,
        cateHeading,
        productsContMain
      );
    });
  
    return productsPageCont;
  } else {
    window.location.href = "./index.html"
  }
}

productsPage();
