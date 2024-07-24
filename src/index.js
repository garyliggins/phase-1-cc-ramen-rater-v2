const addSubmitListener = () => {
  const form = document.getElementById("new-ramen");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Accessing form elements by their correct name attribute
    const name = event.target.name.value;
    const restaurant = event.target.restaurant.value;
    const image = event.target.image.value;
    const rating = event.target.rating.value;
    const comment = event.target.comment.value;

    // Create new ramen object
    const newRamen = { name, restaurant, image, rating, comment };

    // Add new ramen to the menu
    addRamenToMenu(newRamen);

    // Reset the form
    form.reset();
  });
};

const addRamenToMenu = (ramen) => {
  const ramenMenu = document.getElementById("ramen-menu");
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener("click", () => handleClick(ramen));
  ramenMenu.appendChild(img);
};

const handleClick = (ramen) => {
  document.querySelector(".detail-image").src = ramen.image;
  document.querySelector(".name").textContent = ramen.name;
  document.querySelector(".restaurant").textContent = ramen.restaurant;
  document.getElementById("rating-display").textContent = ramen.rating;
  document.getElementById("comment-display").textContent = ramen.comment;
};

document.addEventListener("DOMContentLoaded", main);

function main() {
  displayRamens();
  addSubmitListener();
}

function displayRamens() {
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
      ramens.forEach((ramen) => {
        addRamenToMenu(ramen);
      });
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    });
}

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
