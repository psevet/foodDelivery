const cart = () => {
const buttonCart = document.getElementById('cart-button');
const modalCart = document.querySelector('.modal-cart');
const body = modalCart.querySelector('.modal-body')
const close = modalCart.querySelector('.close');
const btnSend = modalCart.querySelector('.button-primary');
const btnClear = modalCart.querySelector('.clear-cart');
const totalPriceLabel = modalCart.querySelector('.modal-pricetag');

const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'))


    cartArray.map((item) => {
        if (item.id === id) {
            item.count = item.count > 0 ? item.count-1 : 0;
        }
        return item;
        })
    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
}

const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'))


    cartArray.map((item) => {
        if (item.id === id) {
            item.count++;
        }
        return item;
    })
    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
}

const resetCart = () => {
    body.innerHTML = '';
    localStorage.removeItem('cart');
    modalCart.classList.remove('is-open');
}

const renderItems = (data) => {
    body.innerHTML = '';
    data.forEach(({name, price, id, count}) => {
        const cardElem = document.createElement('div');
        cardElem.classList.add('food-row');
        cardElem.innerHTML = `
            <span class="food-name">${name}</span>
            <strong class="food-price">${price} ₽</strong>
            <div class="food-counter">
                <button class="counter-button btn-dec" data-index="${id}">-</button>
                <span class="counter">${count}</span>
                <button class="counter-button btn-inc" data-index="${id}">+</button>
            </div>`
        let totalPrice = 0;
        totalPrice += (price*count);
        totalPriceLabel.innerHTML = ` ${totalPrice} ₽`
        body.appendChild(cardElem);
    })
}

body.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('btn-inc')) {
        incrementCount(e.target.dataset.index);
    } else if (e.target.classList.contains('btn-dec')) {
        decrementCount(e.target.dataset.index);
    }
})

btnSend.addEventListener('click', () => {
    const cartArray = localStorage.getItem('cart');

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: cartArray
    })
    .then(response => {
        if (response.ok) {
            resetCart();
        }
    })
    .catch(err => {
        console.error(err);
    })
})

btnClear.addEventListener('click', () => {
    resetCart();
})

buttonCart.addEventListener('click', () => {
    if (localStorage.getItem('cart')) {
        renderItems(JSON.parse(localStorage.getItem('cart')))
    }
    modalCart.classList.add('is-open');
});
close.addEventListener('click', () => {
    modalCart.classList.remove('is-open');
});

}
cart();