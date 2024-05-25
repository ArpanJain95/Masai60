import { addToCartButton } from "./addToCart.js";

function createProductCard(productData, cardVersion) {
  const card = document.createElement("a");
  card.href = `./productDetail.html?id=${productData.id}`
  card.className = "product-card";

  const productImage = document.createElement("img");
  productImage.src = productData.images[0];
  productImage.alt = productData.name;

  const officialCategory = document.createElement("h3");
  officialCategory.textContent = "Bewakoof®";

  const titleContainer = document.createElement("div");
  titleContainer.className = "titleContainer";

  const heartIcon = document.createElement("i");
  heartIcon.className = "far fa-heart";
  heartIcon.addEventListener("click", () => {
    console.log("Product added to wishlist:", productData.name);
  });

  const title = document.createElement("h2");
  const fullTitle = `${productData.gender}'s ${productData.color} ${productData.name} ${productData.category}`;
  const maxLength = 20;
  title.textContent =
    fullTitle.length > maxLength
      ? `${fullTitle.slice(0, maxLength)}...`
      : fullTitle;

  titleContainer.append(title, heartIcon);
  card.append(productImage, officialCategory, titleContainer);

  if (cardVersion === "home") {
    const priceAndDiscount = document.createElement("div");
    priceAndDiscount.className = "priceAndDiscount";

    const discountedPrice = document.createElement("div");
    discountedPrice.className = "discountedPrice"
    const rupeeSymbol = document.createElement("span");
    rupeeSymbol.textContent = "\u20B9";
    rupeeSymbol.className = "rupee-symbol";

    const priceValue = document.createElement("span");
    priceValue.textContent = productData.price;
    priceValue.className = "price-value";

    discountedPrice.append(rupeeSymbol, priceValue)

    const mrp = document.createElement("div");
    const discountedPriceValue = productData.price;
    const discountedPercentage = productData["discountPercentage"];
    const mrpValue = Math.round(
      discountedPriceValue / (1 - discountedPercentage / 100)
    );
    mrp.textContent = "\u20B9" + mrpValue;
    mrp.style.textDecoration = "line-through";
    mrp.className = "mrp"

    const discountPercentage = document.createElement("div");
    discountPercentage.textContent = productData["discountPercentage"] + "% OFF";
    discountPercentage.className = "discountPercentage"

    priceAndDiscount.append(discountedPrice, mrp, discountPercentage);
    card.appendChild(priceAndDiscount);
  } else if (cardVersion === "products") {
    const rating = document.createElement("div");
    rating.textContent = "Rating: " + productData.rating;
    card.appendChild(rating);

    const category = document.createElement("div");
    category.textContent = "Category: " + productData.category;
    card.appendChild(category);

    const officialCategory = document.createElement("div");
    officialCategory.textContent =
      "Official Category: " + productData.officialCate;
    card.appendChild(officialCategory);

    const discountedPrice = document.createElement("div");
    discountedPrice.textContent = "Discounted Price: $" + productData.price;
    card.appendChild(discountedPrice);

    const mrp = document.createElement("div");
    const discountedPriceValue = productData.price;
    const discountedPercentage = productData["discountPercentage"];
    const mrpValue = Math.round(
      discountedPriceValue / (1 - discountedPercentage / 100)
    );
    mrp.textContent = "MRP: $" + mrpValue;
    mrp.style.textDecoration = "line-through";
    card.appendChild(mrp);

    const material = document.createElement("div");
    material.textContent = "Material: " + productData.material;
    card.appendChild(material);

    const addToCartBtn = addToCartButton(productData.id)
    card.appendChild(addToCartBtn);
  }

  return card;
}

export { createProductCard };
