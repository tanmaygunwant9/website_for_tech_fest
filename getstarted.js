document.getElementById('home-btn').onclick = function() {
  window.location.href = 'main.html';
};

// Product data with descriptions and prices
const products = [
  {
    name: "Website Design",
    desc: "Custom, responsive websites tailored to your brand.",
    price: "₹15,000"
  },
  {
    name: "Mobile App",
    desc: "Cross-platform mobile apps for iOS and Android.",
    price: "₹25,000"
  },
  {
    name: "SEO Package",
    desc: "Boost your search rankings and online visibility.",
    price: "₹8,000"
  },
  {
    name: "Cloud Hosting",
    desc: "Fast, secure cloud hosting for your projects.",
    price: "₹5,000/year"
  }
];

const productsList = document.getElementById('productsList');
productsList.innerHTML = products.map(
  p => `<li><strong>${p.name}</strong> - ${p.desc} <span style="color:#00c9a7;font-weight:600;">${p.price}</span></li>`
).join('');

const orderForm = document.getElementById('orderForm');
const productSelect = document.getElementById('productSelect');
const orderMsg = document.getElementById('orderMsg');
const productDetails = document.getElementById('productDetails');
const btnOrder = orderForm.querySelector('.btn-order');

// Show product details when selected
productSelect.addEventListener('change', function() {
  const selected = productSelect.value;
  if (!selected) {
    productDetails.style.display = 'none';
    btnOrder.disabled = true;
    return;
  }
  const prod = products.find(p => p.name === selected);
  productDetails.innerHTML = `
    <strong>${prod.name}</strong><br>
    <span>${prod.desc}</span><br>
    <span style="color:#00c9a7;font-weight:600;">Price: ${prod.price}</span>
  `;
  productDetails.style.display = 'block';
  btnOrder.disabled = false;
});

// Handle order submission
orderForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const selected = productSelect.value;
  if (!selected) {
    orderMsg.textContent = "Please select a product to order.";
    orderMsg.className = "error";
    return;
  }
  orderMsg.textContent = `✅ Your order for "${selected}" has been placed!`;
  orderMsg.className = "success";
  productSelect.value = "";
  productDetails.style.display = 'none';
  btnOrder.disabled = true;
  setTimeout(() => orderMsg.textContent = "", 2500);
});