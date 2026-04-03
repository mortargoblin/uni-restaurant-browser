const restaurants = [
  {name: "ravintola"},
  {name: "ravintola"},
  {name: "ravintola"},
  {name: "ravintola"}
]

function updateList(items) {
  const output = document.querySelector('#restaurant-list');
  output.innerHTML = '';

  for (let item of items) {
    output.insertAdjacentHTML('beforeend',
      `<div>${item.name}</div>`
    );
  }
}

updateList(restaurants);
