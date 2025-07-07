import { storage, formatDate, formatTime } from "./utils.js";
import { restaurantAPI, handleAPIError } from "./api.js";

let restaurantId;
let restaurant;

// Fallback data for offline mode
const fallbackRestaurantData = {
  rest_1: {
    id: "rest_1",
    name: "ReserVee Beşiktaş",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    rating: 4.5,
    cuisine: "Turkish Coffee & Pastries",
    address: "Barbaros Bulvarı No:15, Beşiktaş, Istanbul",
    phone: "+90 212 555 0101",
    email: "besiktas@reservee.com",
    priceRange: "Moderate (₺15-30 per person)",
    priceSymbol: "₺₺",
    features: ["WiFi", "Outdoor Seating", "Pet Friendly", "Parking"],
    description:
      "A cozy café in the heart of Beşiktaş, offering premium Turkish coffee and freshly baked pastries. Perfect for business meetings or casual gatherings with friends.",
    openingHours: {
      weekdays: "8:00 AM - 10:00 PM",
      weekends: "9:00 AM - 11:00 PM",
    },
    menuItems: [
      {
        name: "Turkish Coffee",
        price: "₺12",
        image:
          "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
      },
      {
        name: "Baklava",
        price: "₺18",
        image:
          "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg",
      },
      {
        name: "Menemen",
        price: "₺25",
        image:
          "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
      },
      {
        name: "Simit",
        price: "₺8",
        image:
          "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
      },
    ],
    reviews: [
      {
        name: "Ahmet K.",
        rating: 5,
        comment: "Excellent coffee and great atmosphere. Highly recommended!",
        date: "2024-01-15",
      },
      {
        name: "Elif S.",
        rating: 4,
        comment:
          "Nice place for breakfast. The pastries are fresh and delicious.",
        date: "2024-01-10",
      },
      {
        name: "Mehmet Y.",
        rating: 5,
        comment:
          "Perfect location and friendly staff. Will definitely come back.",
        date: "2024-01-08",
      },
    ],
  },
  rest_2: {
    id: "rest_2",
    name: "Bosphorus Café",
    image: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
    rating: 4.2,
    cuisine: "International",
    address: "Ortaköy Meydanı No:8, Beşiktaş, Istanbul",
    phone: "+90 212 555 0102",
    email: "ortakoy@bosphoruscafe.com",
    priceRange: "Upscale (₺30-50 per person)",
    priceSymbol: "₺₺₺",
    features: ["Sea View", "WiFi", "Parking", "Live Music"],
    description:
      "Enjoy international cuisine with a stunning Bosphorus view. Our terrace offers the perfect setting for romantic dinners and special occasions.",
    openingHours: {
      weekdays: "10:00 AM - 12:00 AM",
      weekends: "9:00 AM - 1:00 AM",
    },
    menuItems: [
      {
        name: "Grilled Salmon",
        price: "₺45",
        image:
          "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
      },
      {
        name: "Caesar Salad",
        price: "₺28",
        image:
          "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg",
      },
      {
        name: "Pasta Carbonara",
        price: "₺35",
        image:
          "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
      },
      {
        name: "Tiramisu",
        price: "₺22",
        image:
          "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
      },
    ],
    reviews: [
      {
        name: "Sarah M.",
        rating: 4,
        comment:
          "Beautiful view and good food. A bit pricey but worth it for special occasions.",
        date: "2024-01-12",
      },
      {
        name: "Can T.",
        rating: 4,
        comment:
          "Great atmosphere, especially in the evening. The live music is a nice touch.",
        date: "2024-01-09",
      },
    ],
  },
  rest_3: {
    id: "rest_3",
    name: "ReserVee Kadıköy",
    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    rating: 4.7,
    cuisine: "Specialty Coffee",
    address: "Bahariye Caddesi No:42, Kadıköy, Istanbul",
    phone: "+90 216 555 0201",
    email: "kadikoy@reservee.com",
    priceRange: "Moderate (₺12-25 per person)",
    priceSymbol: "₺₺",
    features: ["WiFi", "Study Area", "Vegan Options", "Book Exchange"],
    description:
      "A modern coffee shop in vibrant Kadıköy, perfect for students and remote workers. We offer specialty coffee and a quiet study environment.",
    openingHours: {
      weekdays: "7:00 AM - 11:00 PM",
      weekends: "8:00 AM - 12:00 AM",
    },
    menuItems: [
      {
        name: "Flat White",
        price: "₺15",
        image:
          "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
      },
      {
        name: "Avocado Toast",
        price: "₺22",
        image:
          "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg",
      },
      {
        name: "Vegan Brownie",
        price: "₺18",
        image:
          "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
      },
      {
        name: "Matcha Latte",
        price: "₺17",
        image:
          "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
      },
    ],
    reviews: [
      {
        name: "Zeynep A.",
        rating: 5,
        comment: "Perfect place to study! Great coffee and quiet atmosphere.",
        date: "2024-01-14",
      },
      {
        name: "David L.",
        rating: 5,
        comment: "Love the vegan options and the book exchange corner.",
        date: "2024-01-11",
      },
      {
        name: "Ayşe K.",
        rating: 4,
        comment:
          "Good coffee and friendly staff. Gets a bit crowded during exam periods.",
        date: "2024-01-07",
      },
    ],
  },
  rest_4: {
    id: "rest_4",
    name: "Ankara Kafe",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    rating: 4.3,
    cuisine: "Turkish Cuisine",
    address: "Kızılay Meydanı No:12, Çankaya, Ankara",
    phone: "+90 312 555 0301",
    email: "cankaya@ankarakafe.com",
    priceRange: "Moderate (₺20-35 per person)",
    priceSymbol: "₺₺",
    features: ["WiFi", "Meeting Rooms", "Parking", "Air Conditioning"],
    description:
      "Modern Turkish cuisine in the heart of Ankara. Perfect for business lunches and family dinners.",
    openingHours: {
      weekdays: "9:00 AM - 11:00 PM",
      weekends: "10:00 AM - 12:00 AM",
    },
    menuItems: [
      {
        name: "Döner Kebab",
        price: "₺28",
        image:
          "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
      },
      {
        name: "Pide",
        price: "₺22",
        image:
          "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg",
      },
    ],
    reviews: [
      {
        name: "Mehmet A.",
        rating: 4,
        comment: "Great Turkish food and friendly service.",
        date: "2024-01-16",
      },
    ],
  },
  rest_5: {
    id: "rest_5",
    name: "İzmir Balık Evi",
    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
    rating: 4.6,
    cuisine: "Seafood",
    address: "Kordon Boyu No:25, Konak, İzmir",
    phone: "+90 232 555 0401",
    email: "konak@izmirbalik.com",
    priceRange: "Upscale (₺40-60 per person)",
    priceSymbol: "₺₺₺",
    features: ["Sea View", "Fresh Seafood", "Wine Selection", "Terrace"],
    description:
      "Fresh seafood with stunning Aegean Sea views. The best fish restaurant in İzmir.",
    openingHours: {
      weekdays: "12:00 PM - 11:00 PM",
      weekends: "11:00 AM - 12:00 AM",
    },
    menuItems: [
      {
        name: "Grilled Sea Bass",
        price: "₺55",
        image:
          "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
      },
      {
        name: "Seafood Meze",
        price: "₺35",
        image:
          "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg",
      },
    ],
    reviews: [
      {
        name: "Ayşe T.",
        rating: 5,
        comment: "Amazing fresh fish and beautiful sea view!",
        date: "2024-01-18",
      },
    ],
  },
  rest_6: {
    id: "rest_6",
    name: "Antalya Beach Cafe",
    image: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
    rating: 4.4,
    cuisine: "Mediterranean",
    address: "Lara Plajı No:8, Muratpaşa, Antalya",
    phone: "+90 242 555 0501",
    email: "lara@antalyabeach.com",
    priceRange: "Moderate (₺25-40 per person)",
    priceSymbol: "₺₺",
    features: ["Beach Access", "Pool", "Live Music", "Sunset View"],
    description:
      "Mediterranean cuisine with direct beach access. Perfect for vacation dining.",
    openingHours: {
      weekdays: "8:00 AM - 12:00 AM",
      weekends: "8:00 AM - 1:00 AM",
    },
    menuItems: [
      {
        name: "Mediterranean Salad",
        price: "₺24",
        image:
          "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
      },
      {
        name: "Grilled Octopus",
        price: "₺42",
        image:
          "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
      },
    ],
    reviews: [
      {
        name: "Can S.",
        rating: 4,
        comment: "Great location right on the beach. Food is good too!",
        date: "2024-01-19",
      },
    ],
  },
};

// Safari uyumlu URL parameter okuma
function getRestaurantIdFromUrl() {
  var search = window.location.search;
  if (!search) return null;

  var params = search.substring(1).split("&");
  for (var i = 0; i < params.length; i++) {
    var param = params[i].split("=");
    if (param[0] === "id") {
      return decodeURIComponent(param[1]);
    }
  }
  return null;
}

// Backend'den restoran verisi çek
function fetchRestaurantData(id) {
  return restaurantAPI
    .getById(id)
    .then(function (response) {
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Restaurant not found in API response");
    })
    .catch(function (error) {
      // Backend başarısız olursa fallback data kullan
      return fallbackRestaurantData[id] || null;
    });
}

function initRestaurantPage() {
  restaurantId = getRestaurantIdFromUrl();

  if (!restaurantId) {
    showRestaurantNotFound("No restaurant ID provided");
    return;
  }

  // Loading state göster
  showLoadingState();

  // Backend'den veri çek
  fetchRestaurantData(restaurantId)
    .then(function (restaurantData) {
      if (!restaurantData) {
        showRestaurantNotFound("Restaurant not found");
        return;
      }

      restaurant = restaurantData;
      loadRestaurantData();
      attachEventListeners();
    })
    .catch(function (error) {
      console.error("Failed to load restaurant:", error);
      showRestaurantNotFound("Failed to load restaurant data");
    });
}

function showLoadingState() {
  var container = document.querySelector(".restaurant-page .container");

  if (container) {
    // Mevcut içeriği gizle
    var existingContent = container.children;
    for (var i = 0; i < existingContent.length; i++) {
      existingContent[i].style.display = "none";
    }

    // Loading overlay ekle
    var loadingDiv = document.createElement("div");
    loadingDiv.className = "loading-state";
    loadingDiv.innerHTML = `
      <div style="padding: 4rem 0; text-align: center;">
        <div class="loading-spinner" style="margin: 0 auto 1rem; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #007bff; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <h3>Loading Restaurant...</h3>
        <p>Please wait while we fetch the restaurant details.</p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;

    container.appendChild(loadingDiv);
  }
}

function showRestaurantNotFound(message) {
  var container = document.querySelector(".restaurant-page .container");
  if (container) {
    container.innerHTML = `
      <div class="no-data" style="padding: 4rem 0; text-align: center;">
        <div class="no-data-icon">🏪</div>
        <h3>Restaurant Not Found</h3>
        <p>${
          message ||
          "The restaurant you are looking for does not exist or has been removed."
        }</p>
        <a href="index.html" class="cta-button">Back to Home</a>
      </div>
    `;
  }
}

function loadRestaurantData() {
  if (!restaurant) {
    return;
  }

  // Loading state'i temizle ve asıl içeriği göster
  const container = document.querySelector(".restaurant-page .container");
  if (container) {
    // Loading state'i kaldır
    const loadingState = container.querySelector(".loading-state");
    if (loadingState) {
      loadingState.remove();
    }

    // Gizlenen içeriği tekrar göster
    var existingContent = container.children;
    for (var i = 0; i < existingContent.length; i++) {
      existingContent[i].style.display = "";
    }
  }

  // Update page title
  document.title = `${restaurant.name} - ReserVee`;

  // Load restaurant header
  const restaurantImage = document.getElementById("restaurantImage");
  const restaurantName = document.getElementById("restaurantName");

  if (restaurantImage) {
    restaurantImage.src = restaurant.image;
    restaurantImage.alt = restaurant.name;
  }

  if (restaurantName) {
    restaurantName.textContent = restaurant.name;
  }

  // Rating
  const stars =
    "★".repeat(Math.floor(restaurant.rating)) +
    "☆".repeat(5 - Math.floor(restaurant.rating));

  const restaurantRating = document.getElementById("restaurantRating");
  const ratingText = document.getElementById("ratingText");

  if (restaurantRating) restaurantRating.textContent = stars;
  if (ratingText) ratingText.textContent = `(${restaurant.rating}/5)`;

  // Location and cuisine
  const restaurantLocation = document.getElementById("restaurantLocation");
  const restaurantCuisine = document.getElementById("restaurantCuisine");

  if (restaurantLocation) {
    const locationSpan = restaurantLocation.querySelector("span:last-child");
    if (locationSpan) locationSpan.textContent = restaurant.address;
  }

  if (restaurantCuisine) {
    const cuisineSpan = restaurantCuisine.querySelector("span:last-child");
    if (cuisineSpan) cuisineSpan.textContent = restaurant.cuisine;
  }

  // Description
  const restaurantDescription = document.getElementById(
    "restaurantDescription"
  );
  if (restaurantDescription) {
    restaurantDescription.textContent = restaurant.description;
  }

  // Contact information
  const restaurantPhone = document.getElementById("restaurantPhone");
  const restaurantEmail = document.getElementById("restaurantEmail");
  const restaurantAddress = document.getElementById("restaurantAddress");

  if (restaurantPhone) restaurantPhone.textContent = restaurant.phone;
  if (restaurantEmail) restaurantEmail.textContent = restaurant.email;
  if (restaurantAddress) restaurantAddress.textContent = restaurant.address;

  // Opening hours
  const hoursContainer = document.getElementById("openingHours");
  if (hoursContainer) {
    hoursContainer.innerHTML = `
      <div class="hours-item">
        <span>Monday - Friday:</span>
        <span>${restaurant.openingHours.weekdays}</span>
      </div>
      <div class="hours-item">
        <span>Saturday - Sunday:</span>
        <span>${restaurant.openingHours.weekends}</span>
      </div>
    `;
  }

  // Features
  const featuresContainer = document.getElementById("restaurantFeatures");
  if (featuresContainer) {
    featuresContainer.innerHTML = restaurant.features
      .map((feature) => `<span class="feature-tag">${feature}</span>`)
      .join("");
  }

  // Price range
  const priceSymbol = document.querySelector(".price-symbol");
  const priceText = document.querySelector(".price-text");

  if (priceSymbol) priceSymbol.textContent = restaurant.priceSymbol;
  if (priceText) priceText.textContent = restaurant.priceRange;

  // Menu items
  loadMenuItems();

  // Reviews
  loadReviews();
}

function loadMenuItems() {
  if (!restaurant) return;

  const menuContainer = document.getElementById("menuItems");
  if (menuContainer) {
    menuContainer.innerHTML = restaurant.menuItems
      .map(
        (item) => `
        <div class="menu-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="menu-item-content">
            <h4>${item.name}</h4>
            <span class="price">${item.price}</span>
          </div>
        </div>
      `
      )
      .join("");
  }
}

function loadReviews() {
  if (!restaurant) return;

  const reviewsContainer = document.getElementById("reviewsList");
  if (reviewsContainer) {
    reviewsContainer.innerHTML = restaurant.reviews
      .map((review) => {
        const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
        return `
          <div class="review-item">
            <div class="review-header">
              <div class="reviewer-info">
                <span class="reviewer-name">${review.name}</span>
                <span class="review-rating">${stars}</span>
              </div>
              <span class="review-date">${formatDate(review.date)}</span>
            </div>
            <p class="review-comment">${review.comment}</p>
          </div>
        `;
      })
      .join("");
  }
}

function attachEventListeners() {
  const makeReservationBtn = document.getElementById("makeReservationBtn");
  const viewMenuBtn = document.getElementById("viewMenuBtn");

  if (makeReservationBtn) {
    makeReservationBtn.addEventListener("click", () => {
      window.location.href = `reservation.html?restaurant=${restaurantId}`;
    });
  }

  if (viewMenuBtn) {
    viewMenuBtn.addEventListener("click", () => {
      const menuPreview = document.querySelector(".menu-preview");
      if (menuPreview) {
        menuPreview.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initRestaurantPage);

export {
  initRestaurantPage,
  getRestaurantIdFromUrl,
  showRestaurantNotFound,
  loadRestaurantData,
  loadMenuItems,
  loadReviews,
  attachEventListeners,
  restaurantData,
};
