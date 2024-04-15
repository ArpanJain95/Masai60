function createProductCard(productData) {
    const card = document.createElement("div");
    card.className = "product-card";

    // Product Image
    const productImage = document.createElement("img");
    productImage.src = productData.images[0];
    productImage.alt = productData.name;
    card.appendChild(productImage);

    // Heart Icon Button
    const heartIcon = document.createElement("i");
    heartIcon.className = "far fa-heart";
    // Add event listener to handle adding product to wishlist
    heartIcon.addEventListener("click", () => {
        // Logic to add product to wishlist
        console.log("Product added to wishlist:", productData.name);
    });
    card.appendChild(heartIcon);

    // Rating
    const rating = document.createElement("div");
    rating.textContent = "Rating: " + productData.rating;
    card.appendChild(rating);

    // Official Category
    const officialCategory = document.createElement("div");
    officialCategory.textContent = "Official Category: " + productData.officialCate;
    card.appendChild(officialCategory);

    // Title
    const title = document.createElement("div");
    title.textContent = `${productData.gender}'s ${productData.color} ${productData.name} ${productData.category}`;
    card.appendChild(title);

    // Discounted Price
    const discountedPrice = document.createElement("div");
    discountedPrice.textContent = "Discounted Price: $" + productData.price;
    card.appendChild(discountedPrice);

    // MRP
    const mrp = document.createElement("div");
    // Calculate MRP based on discount percentage
    const discountedPriceValue = productData.price;
    const discountPercentage = productData["discount%"];
    const mrpValue = Math.round(discountedPriceValue / (1 - discountPercentage / 100));
    mrp.textContent = "MRP: $" + mrpValue;
    card.appendChild(mrp);

    // Material
    const material = document.createElement("div");
    material.textContent = "Material: " + productData.material;
    card.appendChild(material);

    return card;
}

export { createProductCard };