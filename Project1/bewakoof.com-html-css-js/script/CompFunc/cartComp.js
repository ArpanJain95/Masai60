import { dataFetch } from "./dataFetch.js";

async function updateCartQty(userId, orderId, quantity) {
  try {
    const userTokenString = localStorage.getItem("userToken");
    const userToken = JSON.parse(userTokenString);
    const user = userToken.user;

    const cartItemIndex = user.cart.findIndex(item => item.orderId === orderId);
    if (cartItemIndex !== -1) {
      user.cart[cartItemIndex].quantity = quantity;

      localStorage.setItem("userToken", JSON.stringify(userToken));
      
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({cart: user.cart})
      });
      if(!response.ok) {
        throw new error("Failed to update cart quantity")
      }
      const data = await response.json();
      return data
    } else {
      throw new Error("Item not found");
    }
  } catch (error) {
    console.error("Error on updating the cart:", error);
  }
}

async function cartComponent(user) {
  const cartContainer = document.createElement("div");
  const item = user.cart.length === 1 ? "item" : "items";
  cartContainer.innerHTML = `
        <div>
            <p><strong>My Bag </strong> ${user.cart.length} ${item}</p>
        </div>
        <div>
            <div>
                <ul id="cart-list"></ul>
            </div>}
            <div></div>
        </div>
    `;

  const ulElement = cartContainer.querySelector("#cart-list");

  for (const cartItem of user.cart) {
    try {
      const products = await dataFetch(`products?id=${cartItem.orderId}`);
      if (products && products.length > 0) {
        const product = products[0];
        console.log(products);
        if (product) {
          const liElement = document.createElement("li");
          const liveQty = cartItem.quantity
          const livePrice = product.price
          const priceMultQty = livePrice * liveQty
          const productMrp = Math.round(
            priceMultQty / (1 - product.discountPercentage / 100)
          );
          liElement.innerHTML = `
              <div class="main">
                  <div class="mainUpper">
                      <div class="mainUpLeft">
                          <span>
                              <a href="./productDetail.html?id=${
                                product.id
                              }">${product.name}</a>
                          </span>
                          <div>
                              <span><b class="price">₹${priceMultQty}</b></span>
                              <span class="mrp">₹${productMrp}</span>
                          </div>
                          <div>
                              <span class="savings">You saved ₹${
                                productMrp - priceMultQty
                              }!</span>
                          </div>
                          <div>
                              <select name="size" id="size"></select>
                              <select name="qty" id="qty"></select>
                          </div>
                      </div>
                      <div class="mainUpRight"></div>
                  </div>
                  <div class="mainLower">
                      <div class="remove"></div>
                      <div class="wishlist"></div>
                  </div>
              </div>
          `;

          const sizeList = liElement.querySelector("#size");
          product.size.forEach(list => {
            const sizeOption = document.createElement("option")
            sizeOption.value = list;
            sizeOption.textContent = list;
            sizeOption.style.width = "50px"
            sizeList.appendChild(sizeOption);
          })

          const qty = liElement.querySelector("#qty");
          for (let i=1; i<=10; i++){
            const qtyOption = document.createElement("option");
            qtyOption.value = i;
            qtyOption.textContent = i;
            if(i == liveQty) {
              qtyOption.selected = true;
            }
            qty.appendChild(qtyOption);
          }

          qty.addEventListener("change", async (event) => {
            event.preventDefault()
            const selectedQty = event.target.value;
            const newPrice = livePrice * selectedQty;
            const newMrp = Math.round(
              newPrice / (1-product.discountPercentage / 100)
            );
            liElement.querySelector(".price").textContent = `₹${newPrice}`;
            liElement.querySelector(".mrp").textContent = `₹${newMrp}`;
            liElement.querySelector(".savings").textContent = `You saved ₹${newMrp - newPrice}!`;

            await updateCartQty(user.id, cartItem.orderId, selectedQty);
          });

          ulElement.appendChild(liElement);
        }
      }
    } catch (error) {
      console.error("Error fetching product details:", error);

      const errorElement = document.createElement("li");
      errorElement.textContent = "Error loading item details.";
      ulElement.appendChild(errorElement);
    }
  }
  return cartContainer;
}

export { cartComponent };
