let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  let name = document.getElementById("name").value;
  let price = Number(document.getElementById("price").value);
  let quantity = Number(document.getElementById("quantity").value);

  if (name === "" || price <= 0 || quantity <= 0) {
    alert("Please enter valid data");
    return;
  }

  // Object for product
  let product = {
    name: name,
    price: price,
    quantity: quantity
  };

  products.push(product);
  saveAndRender();
}

function removeProduct(index) {
  products.splice(index, 1);
  saveAndRender();
}

function calculateInventoryValue() {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i].price * products[i].quantity;
  }
  return total;
}

function checkLowStock() {
  let lowStockItems = [];
  for (let product of products) {
    if (product.quantity < 5) {
      lowStockItems.push(product.name);
    }
  }
  return lowStockItems;
}

function saveAndRender() {
  localStorage.setItem("products", JSON.stringify(products));
  renderInventory();
}

function renderInventory() {
  let inventory = document.getElementById("inventory");
  inventory.innerHTML = "";

  products.forEach((product, index) => {
    inventory.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>${product.price * product.quantity}</td>
        <td><button onclick="removeProduct(${index})">Remove</button></td>
      </tr>
    `;
  });

  document.getElementById("totalValue").innerText =
    "Total Inventory Value: RM " + calculateInventoryValue();

  let alerts = checkLowStock();
  document.getElementById("alert").innerText =
    alerts.length > 0
      ? "Low stock alert: " + alerts.join(", ")
      : "";
}

renderInventory();
