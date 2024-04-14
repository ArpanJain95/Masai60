function createProductCard (product) {
    const card = document.createElement("div");
    card.className = "product-card";

    const image = documnet.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.className = "product-image";

    const price = document.createElement("span");
}