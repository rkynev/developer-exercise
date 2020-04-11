let loading;
function spinner() {
  loading = setTimeout(showPage, 1500);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("show").style.display = "block";
}

const ul = document.getElementById("dresses");
const bag = document.querySelector(".bag-dresses");

function createElements(element) {
  return document.createElement(element);
}

function appendEl(parent, element) {
  return parent.appendChild(element);
}

fetch("https://api.jsonbin.io/b/5e918ee7cc62be4369c2b3e6")
  .then(resp => resp.json())
  .then(data => {
    let finalData = data.hits.filter(img => img.image);

    finalData.map(dress => {
      let li = createElements("li"),
        img = createElements("img"),
        span = createElements("span");
      newSpan = createElements("p");
      button = createElements("button");
      img.src = dress.image.link;
      span.innerHTML = `${dress.product_name}`;
      newSpan.innerHTML = `£${dress.price}.00`;
      button.innerHTML = "add to bag";
      productId = dress.product_id;
      button.setAttribute("class", "product-button");
      button.setAttribute("data-id", productId);

      appendEl(li, img);
      appendEl(li, span);
      appendEl(li, newSpan);
      appendEl(li, button);
      appendEl(ul, li);
    });

    let buttons = document.getElementsByClassName("product-button");
    Array.from(buttons).forEach(element => {
      element.addEventListener("click", addToBag);
    });

    function addToBag(event) {
      let productId = event.target.getAttribute("data-id");
      let itemInBag = document.getElementsByClassName("bag-product");
      elements = Array.from(itemInBag);
      bagData = elements
        .map(element => element.children[4].attributes[1].value)
        .filter(el => el == productId);

      for (let i = 0; i < finalData.length; i++) {
        const dress = finalData[i];

        if (productId == dress.product_id && productId == bagData) {
          alert("Item already in Bag");
        } else if (productId == dress.product_id) {
          let div = createElements("div"),
            img = createElements("img"),
            span = createElements("span");
          price = createElements("p");
          button = createElements("button");
          input = createElements("input");
          img.src = dress.image.link;
          span.innerHTML = `${dress.product_name}`;
          price.innerHTML = `£${dress.price}.00`;
          button.innerHTML = "Remove";
          productId = dress.product_id;
          input.setAttribute("value", 1);
          input.setAttribute("type", "number");
          input.setAttribute("class", "bag-quantity-input");
          div.setAttribute("class", "bag-product");
          span.setAttribute("class", "bag-product-name");
          img.setAttribute("class", "bag-img");
          button.setAttribute("class", "danger-button");
          button.setAttribute("data-id", productId);
          price.setAttribute("class", "price");

          appendEl(div, img);
          appendEl(div, span);
          appendEl(div, price);
          appendEl(div, input);
          appendEl(div, button);
          appendEl(bag, div);
          uptdateBagIconTotal();
          totalItems();
        }
      }

      let quantityInputs = document.getElementsByClassName("bag-quantity-input");
      Array.from(quantityInputs).forEach(element => {
        element.addEventListener("change", quantityChanged);
      });

      function quantityChanged(event) {
        let input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
          input.value = 1;
        }
        totalItems();
      }

      function totalItems() {
        let bagItem = document.getElementsByClassName("bag-product");
        elements = Array.from(bagItem);
        dataBag = elements.map(element => ({
          price: parseFloat(element.children[2].innerText.replace("£", "")),
          qty: parseFloat(element.children[3].value)
        }));
        let total = dataBag.map(el => el.price * el.qty);
        let grandTotal = total.reduce((a, b) => a + b);
        document.querySelector(".inner-total").innerText = `£${grandTotal}.00`;
      }

      let removeBagItemButton = document.getElementsByClassName("danger-button");
      for (let i = 0; i < removeBagItemButton.length; i++) {
        let button = removeBagItemButton[i];
        button.addEventListener("click", removeBagItem);
      }

      function removeBagItem(event) {
        let bagItem = document.getElementsByClassName("bag-product");
        let buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        uptdateBagIconTotal();
        if (bagItem.length == 0) {
          document.querySelector(".inner-total").innerText = `£0.00`;
        } else {
          totalItems();
        }
      }

      function uptdateBagIconTotal() {
        let list = document.getElementsByClassName("bag-product");
        document.getElementById("total-count").innerText = list.length;
      }
    }
  })
  .catch(error => console.log(JSON.stringify(error)));
