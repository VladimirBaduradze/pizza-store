//finding button plus/minus/counter
// const buttonMinus = document.querySelector('[data-action="minus"]');
// const buttonPlus = document.querySelector('[data-action="plus"]');
// const counter = document.querySelector("[data-counter]");

// plus/minus buttons start brrrrrr
// buttonMinus.addEventListener("click", function () {
//   if (counter.innerText <= 1) {
//     return counter.innerText;
//   } else {
//     counter.innerText = --counter.innerText;
//   }
// });

// buttonPlus.addEventListener("click", function () {
//   counter.innerText = ++counter.innerText;
// });

// counter goes brrr

window.addEventListener("click", function (event) {
  let counter;

  if (
    event.target.dataset.action === "plus" ||
    event.target.dataset.action === "minus"
  ) {
    const counterWrapper = event.target.closest(".counter-wrapper");
    counter = counterWrapper.querySelector("[data-counter]");
  }

  if (event.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
  }
  if (event.target.dataset.action === "minus") {
    if (
      event.target.closest(".cart-wrapper") &&
      parseInt(counter.innerText) <= 1
    ) {
      //deleting pizza from the cart
      event.target.closest(".cart-item").remove();
      toggleStatus();
      totalPriceAndDelivery();
    }

    if (counter.innerText <= 1) {
      return counter.innerText;
    } else {
      counter.innerText = --counter.innerText;
    }
  }

  if (
    event.target.hasAttribute("data-action") &&
    event.target.closest(".cart-wrapper")
  ) {
    totalPriceAndDelivery();
  }
});

// adding product to the cart

const cartWrapper = document.querySelector(".cart-wrapper");
window.addEventListener("click", function (event) {
  if (event.target.hasAttribute("data-cart")) {
    const card = event.target.closest(".card");
    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector(".product-img").getAttribute("src"),
      title: card.querySelector(".item-title").innerText,
      itemPieces: card.querySelector("[data-items-in-box]").innerText,
      weight: card.querySelector(".price__weight").innerText,
      price: card.querySelector(".price__currency").innerText,
      counter: card.querySelector("[data-counter]").innerText,
    };
    //if product is alreay in the cart
    const itemInCart = cartWrapper.querySelector(
      `[data-id="${productInfo.id}"]`
    );

    if (itemInCart) {
      const counterElement = itemInCart.querySelector("[data-counter]");
      counterElement.innerText =
        parseInt(productInfo.counter) + parseInt(counterElement.innerText);
    } else {
      // added product info
      const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
    <div class="cart-item__top">
        <div class="cart-item__img">
            <img src="${productInfo.imgSrc}" alt="">
        </div>
        <div class="cart-item__desc">
            <div class="cart-item__title">${productInfo.title}</div>
            <div class="cart-item__weight">${productInfo.itemPieces} / ${productInfo.weight}</div>

            <!-- cart-item__details -->
            <div class="cart-item__details">

                <div class="items items--small counter-wrapper">
                    <div class="items__control" data-action="minus">-</div>
                    <div class="items__current" data-counter="">${productInfo.counter}</div>
                    <div class="items__control" data-action="plus">+</div>
                </div>

                <div class="price">
                    <div class="price__currency">${productInfo.price}</div>
                </div>

            </div>
            <!-- // cart-item__details -->

        </div>
    </div>
</div>`;

      //inserting piece of code in the cart
      cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML);
    }

    //drop counter to 1 after adding a pizza to cart
    card.querySelector("[data-counter]").innerText = "1";
    toggleStatus();
    totalPriceAndDelivery();
  }
});

// show cart status empty/full

function toggleStatus() {
  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartEmptyStatus = document.querySelector("[data-cart-empty]");
  const orderForm = document.querySelector("#order-form");

  if (cartWrapper.children.length > 0) {
    cartEmptyStatus.classList.add("none");
    orderForm.classList.remove("none");
  } else {
    cartEmptyStatus.classList.remove("none");
    orderForm.classList.add("none");
  }
}

// total price calculator

function totalPriceAndDelivery() {
  const cartItems = document.querySelectorAll(".cart-item");
  const deliveryCost = document.querySelector(".delivery-cost");
  const cartDelivery = document.querySelector("[data-cart-delivery]");

  let totalPrice = 0;

  cartItems.forEach(function (item) {
    const ammoutElement = item.querySelector("[data-counter]");
    const priceElement = item.querySelector(".price__currency");

    const currentPrice =
      parseInt(ammoutElement.innerText) * parseFloat(priceElement.innerText);
    totalPrice += currentPrice;
  });

  //show total price in cart
  let totalPriceCart = (document.querySelector(".total-price").innerText =
    totalPrice);

  //hide-show delivery price
  if (totalPrice > 0) {
    cartDelivery.classList.remove("none");
  } else {
    cartDelivery.classList.add("none");
  }

  if (totalPrice >= 25) {
    deliveryCost.classList.add("free");
    deliveryCost.innerText = "Free";
  } else {
    deliveryCost.classList.remove("free");
    deliveryCost.innerText = "3 ₾";
  }
}
