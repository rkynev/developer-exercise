//TO ADD DISPLAY LOGIC TO BAG - work in progress
//BAG AND HDR TO BE MADE MOBILE FRIENDLY - work in progress
//TO ADD DISPLAY NONE WHEN BAG IS EMPTY - work in progress
//TO ADD TOTAL TO BAG - work in progress
//Bag Counter - done
//Remove Button - done 

let loading;
function spinner() {
  loading = setTimeout(showPage, 1500);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("show").style.display = "block";
}

const ul = document.getElementById("dresses");
const bag = document.getElementById("bag");

function createElements(element) {
  return document.createElement(element);
}

function appendEl(parent, element) {
  return parent.appendChild(element);
}

fetch("https://api.myjson.com/bins/evnom")
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
      for (let i = 0; i < finalData.length; i++) {
        const dress = finalData[i];
        if (productId == dress.product_id) {
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
          totalSameItems();
        }
      }

      let bagItems = document.getElementsByClassName("bag-product");
      Array.from(bagItems).forEach(element => {
        element.addEventListener("change", totalSameItems);
      });

      function totalSameItems(event) {
        //to add logick 
        console.log('works')
      }


      let removeBagItemButton = document.getElementsByClassName(
        "danger-button"
      );
      for (let i = 0; i < removeBagItemButton.length; i++) {
        let button = removeBagItemButton[i];
        button.addEventListener("click", removeBagItem);
      }
      function removeBagItem(event) {
        let buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        uptdateBagIconTotal();
      }
      function uptdateBagIconTotal() {
        let list = document.getElementsByClassName("bag-product");
        document.getElementById("total-count").innerText = list.length;
      }
    }
  })
  .catch(error => console.log(JSON.stringify(error)));
