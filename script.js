console.log("hello");
const serviceName = document.querySelectorAll(".list-item");
console.log(serviceName);
//fetching detail to add in cart
const addBtn = document.querySelectorAll(".add-btn");
addBtn.forEach((element) => {
  element.addEventListener("click", () => {
    const servName = element.parentElement.children[1].innerText;
    const servPrice = element.parentElement.children[2].innerText;
    console.log(servName, servPrice);
    addDetail(servName, servPrice);
  });
});
//fetching detail to remove from cart
const removeBtn = document.querySelectorAll(".remove-btn");

removeBtn.forEach((element) => {
  element.addEventListener("click", () => {
    const servName = element.parentElement.children[1].innerText;
    const servPrice = element.parentElement.children[2].innerText;
    console.log(servName, servPrice);
    removeDetail(servName, servPrice);
  });
});
//adding items to cart
const cart = document.querySelector(".cart");
const addDetail = (servName, servPrice) => {
  let cartItem = document.createElement("div");
  cart.appendChild(cartItem);
  cartItem.classList.add("cart-list");
  cartItem.classList.add(`d${cart.childElementCount}`);
  cartItem.innerHTML = `
    <p class="sno">${cart.childElementCount}</p>
            <p class="s-name">${servName}</p>
            <p class="s-price">
              <span class="material-symbols-outlined"> currency_rupee </span>
              ${servPrice}
            </p>`;
  console.log(servName, servPrice);
};
const removeDetail = (servName, servPrice) => {
  cartList = document.querySelectorAll(".cart div");
  console.log(cartList.children);
};
