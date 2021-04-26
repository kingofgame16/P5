const totalPriceElement = document.getElementById('totalPrice');
const orderIdElement = document.getElementById('orderId');

const totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
const orderId = JSON.parse(localStorage.getItem('orderId'));

totalPriceElement.innerText = totalPrice; 
orderIdElement.innerText = orderId; 