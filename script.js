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
    console.log(servName);
    removeDetail(servName);
  });
});
//adding items to cart
const cart = document.querySelector(".cart");
const addDetail = (servName, servPrice) => {
  let cartItem = document.createElement("div");
  cart.appendChild(cartItem);
  cartItem.classList.add("cart-list");
  cartItem.innerHTML = `
    <p class="sno">${cart.childElementCount}</p>
            <p class="s-name">${servName}</p>
            <p class="s-price">
              <span class="material-symbols-outlined"> currency_rupee </span>
             <span class=amt> ${servPrice}</span?
            </p>`;
  console.log(servName, servPrice);
  backgroundChange();
  buttonOpacity();
  sum();
};
// removing from cart
const removeDetail = (serviceName) => {
  const cartList = document.querySelectorAll(".cart-list");
  cartList.forEach((el) => {
    const delName = el.children[1].innerText;
    if (delName === serviceName) {
      el.remove();
      relabel();
      backgroundChange();
      buttonOpacity();
      sum();
    }
  });
};

//relabiling the cart s.no
function relabel() {
  const cartList = document.querySelectorAll(".cart-list");
  let count = 1;
  cartList.forEach((element) => {
    element.children[0].innerText = count;
    count++;
  });
}
//to display "no items added in cart"
function backgroundChange() {
  if (cart.childElementCount >= 1) {
    cart.style.backgroundImage = `url("")`;
  } else {
    cart.style.backgroundImage = `url("/icons/no-item.jpg")`;
  }
}
const bookNow = document.querySelector(".order");
const info = document.querySelector(".info");
function buttonOpacity() {
  if (cart.childElementCount == 0) {
    bookNow.style.opacity = "0.5";
    info.style.color = "red";
    info.style.visibility = "visible";
  } else {
    bookNow.style.opacity = "1";
    info.style.visibility = "hidden";
  }
}
// calling function for 1st time
buttonOpacity();

const total = document.querySelector(".total-price");
function sum() {
  totalSum = 0;
  const cartList = document.querySelectorAll(".cart-list");
  cartList.forEach((el) => {
    let val = el.children[2].children[1].innerText;
    totalSum += Number(val);
  });
  total.children[1].innerText = totalSum;
}
// calling function on page load
sum();

//checking if cart and form has value and displaying popup
bookNow.addEventListener("click", () => {
  if (cart.childElementCount == 0) {
    errorDiv();
  } else {
    const bookForm = document.querySelector(".book");
    const inputs = bookForm.querySelectorAll("input");
    function hasValue() {
      for (let input of inputs) {
        if (input.value.trim() !== "") {
          return true;
        }
      }
      return false;
    }
    if (hasValue()) {
      console.log("success");
      bookForm.submit();
    } else {
      fillForm();
    }
  }
});
// error pop
function errorDiv() {
  let pop = document.querySelector(".popup");
  let div = document.createElement("div");
  div.classList.add("error");
  div.innerHTML = `
    <span class="material-symbols-outlined">
              info
            </span>
            Add items to cart`;
  pop.appendChild(div);
  removePop(div);
}
//unfilled  form pop
function fillForm() {
  let pop = document.querySelector(".popup");
  let div = document.createElement("div");
  div.classList.add("error");
  div.innerHTML = `
    <span class="material-symbols-outlined">
              info
            </span>
            Please fill the details `;
  pop.appendChild(div);
  removePop(div);
}
//order placed pop
function orderPlaced() {
  let pop = document.querySelector(".popup");
  let div = document.createElement("div");
  div.classList.add("order-placed");
  div.innerHTML = `Thank you For Booking the Service We will get back to you soon!`;
  pop.appendChild(div);
  removePop(div);
}
function error() {
  let pop = document.querySelector(".popup");
  let div = document.createElement("div");
  div.classList.add("error");
  div.innerHTML = `
    <span class="material-symbols-outlined">
              info
            </span>
            Order is not placed! Try again later`;
  pop.appendChild(div);
  removePop(div);
}
// to remove pop after few second
function removePop(div) {
  setTimeout(() => {
    div.remove();
  }, 5100);
}

// Collecting form and cart data, and sending email
const bookForm = document.querySelector(".book");
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Collect form data
  var templateParams = {
    email: document.querySelector("#email").value,
    number: document.querySelector("#number").value,
    name: document.querySelector("#name").value,
  };

  // Collect cart data
  const cartItems = document.querySelectorAll(".cart-list");
  let cartDetails = "";
  cartItems.forEach((item, index) => {
    const itemName = item.querySelector(".s-name").innerText;
    const itemPrice = item.querySelector(".amt").innerText;
    cartDetails += `Item ${index + 1}: ${itemName} - ₹${itemPrice}\n`;
  });

  templateParams.cart = cartDetails;
  templateParams.total = total.children[1].innerText;

  const serviceID = "default_service";
  const templateID = "template_o4hx855";

  emailjs.send(serviceID, templateID, templateParams).then(
    () => {
      orderPlaced();
      this.reset();
      cartItems.forEach((el) => {
        el.remove();
      });
    },
    (err) => {
      error();
    }
  );
});
