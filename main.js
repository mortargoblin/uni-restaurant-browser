const restaurantList = document.getElementById("restaurant-list");
const menuList = document.getElementById("menu-list");

let restaurants = [];

async function fetchRestaurants() {
  const response = await fetch(
    "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants"
  );

  restaurants = await response.json();

  renderRestaurants(restaurants);
}

function renderRestaurants(data) {
  restaurantList.innerHTML = "";

  data.forEach(restaurant => {
    const card = document.createElement("div");

    card.className =
      "bg-[#003566] p-4 rounded cursor-pointer";

    card.innerHTML = `
            <h3 class="text-xl">${restaurant.name}</h3>
            <p>${restaurant.city}</p>
            <p>${restaurant.company}</p>
            <!--
            <button class="
            favorite-btn bg-[#FFD60A] text-black p-1 mt-3 rounded
            ">Favorite</button>
            -->
        `;

    card.addEventListener("click", () => {
      fetchDailyMenu(restaurant._id);
      selectedRestaurantId = restaurant._id;
    });

    restaurantList.appendChild(card);
  });
}

fetchRestaurants();

async function fetchDailyMenu(id) {
  const response = await fetch(
    `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${id}/fi`
  );

  const data = await response.json();

  menuList.innerHTML = "";

  data.courses.forEach(course => {
    menuList.innerHTML += `
            <div class="mb-2">
                <strong>${course.name}</strong>
                <p>${course.price}</p>
            </div>
        `;
  });
}

// EVENT LISTENERS

let selectedRestaurantId = null;

document.getElementById("weekly-btn").addEventListener("click", async () => {
  const id = selectedRestaurantId;

  const response = await fetch(
    `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/${id}/fi`
  );

  const data = await response.json();

  menuList.innerHTML = "";

  data.days.forEach(day => {
    menuList.innerHTML += `
          <h3>${day.date}</h3>
      `;

    day.courses.forEach(course => {
      menuList.innerHTML += `
              <p>${course.name}</p>
          `;
    });
  });
});
