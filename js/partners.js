const partners = () => {
const cardsRestaurants = document.querySelector('.cards-restaurants')

const renderIrems = (data) => {
    data.forEach((item) => {
        const {image, name, time_of_delivery, stars, price, kitchen, products} = item;
        const a = document.createElement('a');
        a.setAttribute('href', 'restaurant.html');
        a.classList.add('card');
        a.classList.add('card-restaurant');
        a.dataset.products = products;
        a.innerHTML = `
            <img src=${image} alt="${name}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${name}</h3>
                    <span class="card-tag tag">${time_of_delivery} мин</span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        ${stars}
                    </div>
                    <div class="price">От ${price} ₽</div>
                    <div class="category">${kitchen}</div>
                </div>
            </div>` 

        a.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('restaurant', JSON.stringify(item));

            window.location.href = 'restaurant.html';
        })

        cardsRestaurants.appendChild(a);
    });
}


fetch(`https://deliveryfood-74b59-default-rtdb.firebaseio.com/db/partners.json`)
    .then((response) => response.json())
    .then((data) => renderIrems(data))
    .catch((error) => {
        console.log("Ахтунг, ошибка");
    })
}
partners();