/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  const tableBody = document.querySelector('#cart tbody');
  removeAllChildNodes(tableBody);

  // This function removes all child nodes from an element
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  const tableBody = document.querySelector('#cart tbody');
  //Create a fragment for one reflow (since fragments are in memory and not the DOM)
  const fragment = document.createDocumentFragment();
  // TODO: Iterate over the items in the cart
  const items = state.cart.items;
  // Only iterate over the cart if it is not empty
  if (items) {
    for (let item in items) {
      // TODO: Create a TR
      let tr = document.createElement('tr');
      // TODO: Create a TD for the delete link, quantity,  and the item
      let tdDelete = document.createElement('td');
      let deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-item');
      deleteButton.innerText = 'X';
      tdDelete.appendChild(deleteButton);
      tr.appendChild(tdDelete);
      let tdQuantity = document.createElement('td');  
      tdItem.innerText = item.quantity;
      tr.appendChild(tdQuantity);
      let tdItem = document.createElement('td');
      tdItem.innerText = item.product.name;
      tr.appendChild(tdItem);
      // TODO: Add the TR to the TBODY and each of the TD's to the TR
      fragment.appendChild(tr);
      }
      tableBody.appendChild(fragment);
  }
}

function removeItemFromCart(event) {
  const target = event.target;
  // Check to see if the event target is a delete item button and, if so, remove the item
  if (target.className = 'delete-item') {
    // This block of code finds the product name by looking at the last child of the current table row, i.e., the product name
    const parent = target.parentElement;
    const item = parent.lastElementChild;
    const productName = item.innerText;
    // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
    state.cart.removeItem(productName);
    // TODO: Save the cart back to local storage
    state.cart.saveToLocalStoreage();
    // TODO: Re-draw the cart table
    clearCart();
    showCart();
  }
}

// This will initialize the page and draw the cart on screen
renderCart();
