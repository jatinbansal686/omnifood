// SEARCHBAR New Section!!!
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search input");
  const meals = document.querySelectorAll(".card");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    meals.forEach((meal) => {
      const mealTitle = meal
        .querySelector(".fooditem")
        .textContent.toLowerCase();

      if (mealTitle.includes(searchTerm)) {
        // smooth transition effect
        meal.style.transition = "opacity 0.5s ease";
        meal.style.opacity = 1;

        setTimeout(() => {
          meal.style.display = "flex";
        }, 500);
      } else {
        meal.style.transition = "opacity 0.5s ease";
        meal.style.opacity = 0;

        setTimeout(() => {
          meal.style.display = "none";
        }, 500);
      }
    });

    const noMealFound = document.getElementById("noMealFound");
    if (Array.from(meals).every((meal) => meal.style.display === "none")) {
      // No meal found
      if (!noMealFound) {
        const noMealMessage = document.createElement("p");
        noMealMessage.id = "noMealFound";
        noMealMessage.textContent = "No meal found";
        noMealMessage.style.textAlign = "center";
        noMealMessage.style.fontWeight = "bold";
        noMealMessage.style.marginTop = "1rem";
        document.querySelector(".wrapper").appendChild(noMealMessage);
      }
    } else {
      if (noMealFound) {
        noMealFound.remove();
      }
    }
  });
});

// RECOMENDATION New Section!!!
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".btn-filter");
  const searchInput = document.querySelector(".search input");
  const cards = document.querySelectorAll(".card");

  const recommendedMeals = [
    "Daal",
    "Pizza",
    "Burger",
    "Paneer",
    // Add more recommendations Important!!
  ];

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const recommendedMeal = button.textContent;
      searchInput.value = recommendedMeal;
      triggerSearch();
    });
  });

  searchInput.addEventListener("input", function () {
    if (searchInput.value.trim() === "") {
      resetCards();
    } else {
      triggerSearch();
    }
  });

  function triggerSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    cards.forEach((card) => {
      const cardMeal = card
        .querySelector(".fooditem")
        .textContent.toLowerCase();
      const isMatch = cardMeal.includes(searchTerm);

      card.style.transition = "opacity 0.5s ease";
      card.style.opacity = isMatch ? 1 : 0;

      setTimeout(() => {
        card.style.display = isMatch ? "flex" : "none";
      }, 500);
    });
  }

  function resetCards() {
    cards.forEach((card) => {
      card.style.transition = "none";
      card.style.opacity = 1;
      card.style.display = "flex";
    });
  }
});

// SORTING New Section!!!
document.addEventListener("DOMContentLoaded", function () {
  const sortDropdown = document.querySelector("select");
  const cardsWrapper = document.querySelector(".wrapper");
  let originalOrder;

  function resetToOriginalOrder() {
    originalOrder.forEach((card) => cardsWrapper.appendChild(card));
  }

  sortDropdown.addEventListener("change", function () {
    const selectedOption = sortDropdown.value;
    const cards = Array.from(cardsWrapper.querySelectorAll(".card"));

    // Save original order
    if (!originalOrder) {
      originalOrder = cards.map((card) => card.cloneNode(true));
    }

    switch (selectedOption) {
      case "1":
        cards.sort((a, b) => {
          const priceA = parseFloat(
            a.querySelector(".newprice").textContent.replace("$", "")
          );
          const priceB = parseFloat(
            b.querySelector(".newprice").textContent.replace("$", "")
          );
          return priceB - priceA;
        });
        break;

      case "2":
        cards.sort((a, b) => {
          const priceA = parseFloat(
            a.querySelector(".newprice").textContent.replace("$", "")
          );
          const priceB = parseFloat(
            b.querySelector(".newprice").textContent.replace("$", "")
          );
          return priceA - priceB;
        });
        break;

      default:
        resetToOriginalOrder();
        break;
    }

    cardsWrapper.style.opacity = 0;
    setTimeout(() => {
      cards.forEach((card) => cardsWrapper.appendChild(card));
      cardsWrapper.style.opacity = 1;
    }, 500);
  });
});

// CART BAR New Section!!!
document.addEventListener("DOMContentLoaded", function () {
  const openCartBtn = document.getElementById("open-cart");
  const closeCartBtn = document.getElementById("close-cart");
  const cartBar = document.getElementById("cart-bar");

  // Initialize cart bar as hidden
  cartBar.style.width = "0";

  // Toggle cartbar open/close
  openCartBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior
    const currentWidth = parseFloat(getComputedStyle(cartBar).width);
    // Toggle between 0 and a specific width (adjust as needed)
    cartBar.style.width = currentWidth === 0 ? "40%" : "0";
  });

  // Close cartbar
  closeCartBtn.addEventListener("click", function () {
    cartBar.style.width = "0";
  });
});

// MOBILE NAVIGATION  New Section!!!
const sliderEl = document.getElementById("slider");
const closeSliderBtn = document.getElementById("close-slider");
const menuBarIcon = document.querySelector(".menu-bar");

menuBarIcon.addEventListener("click", function () {
  sliderEl.style.display = "flex";
});

closeSliderBtn.addEventListener("click", function () {
  sliderEl.style.display = "none";
});
