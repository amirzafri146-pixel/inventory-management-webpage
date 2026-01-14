// Load existing products from localStorage or start with empty array
let products = JSON.parse(localStorage.getItem("products")) || [];

// Add a new product
function addProduct() {
  let name = document.getElementById("name").value.trim();
  let price = parseFloat(document.getElementById("price").value);
  let quantity = parseInt(document.getElementById("quantity").value);

  // Validate inputs
  if (!name || isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
    alert("Please enter valid product name, price, and quantity.");
    return;
  }

  // Create product object
  let product = { name, price, quantity };

  // Add product to array
  products.push(product);

  // Save and update UI
  saveAndRender();

  // Clear input fields
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
}

// Remove product by index
function removeProduct(index) {
  products.splice(index, 1);
  saveAndRender();
}

// Calculate total inventory value
function calculateInventoryValue() {
  return products.reduce((total, product) => total + product.price * product.quantity, 0);
}

// Check for low stock items (less than 10)
function checkLowStock() {
  return products.filter(product => product.quantity < 10).map(product => product.name);
}

// Save products to localStorage and render the table
function saveAndRender() {
  localStorage.setItem("products", JSON.stringify(products));
  renderInventory();
}

// Render inventory table and summary
function renderInventory() {
  let inventory = document.getElementById("inventory");
  inventory.innerHTML = "";

  products.forEach((product, index) => {
    inventory.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${product.price.toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td>${(product.price * product.quantity).toFixed(2)}</td>
        <td><button onclick="removeProduct(${index})">Remove</button></td>
      </tr>
    `;
  });

  // Update total value
  document.getElementById("totalValue").innerText =
    "Total Inventory Value: RM " + calculateInventoryValue().toFixed(2);

  // Update low stock alerts
  let lowStockItems = checkLowStock();
  document.getElementById("alert").innerText =
    lowStockItems.length > 0 ? "Low stock alert: " + lowStockItems.join(", ") : "";
}

// Initial render
renderInventory();
