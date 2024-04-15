function createProductCard(productData, cardVersion) {
  const card = document.createElement("div");
  card.className = "product-card";

  const productImage = document.createElement("img");
  productImage.src = productData.images[0];
  productImage.alt = productData.name;
  card.appendChild(productImage);

  const heartIcon = document.createElement("i");
  heartIcon.className = "far fa-heart";
  heartIcon.addEventListener("click", () => {

    console.log("Product added to wishlist:", productData.name);
  });
  card.appendChild(heartIcon);

  const title = document.createElement("div");
  title.textContent = `${productData.gender}'s ${productData.color} ${productData.name} ${productData.category}`;
  card.appendChild(title);

  if (cardVersion === "home") {
    const officialCategory = document.createElement("div");
    officialCategory.textContent =
      "Official Category: " + productData.officialCate;
    card.appendChild(officialCategory);

    const discountedPrice = document.createElement("div");
    discountedPrice.textContent = "Discounted Price: $" + productData.price;
    card.appendChild(discountedPrice);

    const mrp = document.createElement("div");
    const discountedPriceValue = productData.price;
    const discountedPercentage = productData["discount%"];
    const mrpValue = Math.round(
      discountedPriceValue / (1 - discountedPercentage / 100)
    );
    mrp.textContent = "MRP: $" + mrpValue;
    mrp.style.textDecoration = "line-through";
    card.appendChild(mrp);

    const discountPercentage = document.createElement("div");
    discountPercentage.textContent =
      "Discount: " + productData["discount%"] + "%";
    card.appendChild(discountPercentage);
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
    const discountedPercentage = productData["discount%"];
    const mrpValue = Math.round(
      discountedPriceValue / (1 - discountedPercentage / 100)
    );
    mrp.textContent = "MRP: $" + mrpValue;
    mrp.style.textDecoration = "line-through";
    card.appendChild(mrp);

    const material = document.createElement("div");
    material.textContent = "Material: " + productData.material;
    card.appendChild(material);
  }

  return card;
}

export { createProductCard };
