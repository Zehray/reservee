import { storage, formatDate, formatTime } from "./utils.js";

// Restaurant detail page functionality
class RestaurantPage {
  constructor() {
    this.restaurantId = this.getRestaurantIdFromUrl();
    this.restaurant = null;

    this.restaurantData = {
      rest_1: {
        id: "rest_1",
        name: "ReserVee Beşiktaş",
        image:
          "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
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
            comment:
              "Excellent coffee and great atmosphere. Highly recommended!",
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
        image:
          "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
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
        image:
          "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg",
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
            comment:
              "Perfect place to study! Great coffee and quiet atmosphere.",
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
    };

    this.init();
  }

  getRestaurantIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  init() {
    if (!this.restaurantId || !this.restaurantData[this.restaurantId]) {
      this.showRestaurantNotFound();
      return;
    }

    this.restaurant = this.restaurantData[this.restaurantId];
    this.loadRestaurantData();
    this.attachEventListeners();
  }

  showRestaurantNotFound() {
    document.querySelector(".restaurant-page .container").innerHTML = `
      <div class="no-data" style="padding: 4rem 0; text-align: center;">
        <div class="no-data-icon">🏪</div>
        <h3>Restaurant Not Found</h3>
        <p>The restaurant you're looking for doesn't exist or has been removed.</p>
        <a href="index.html" class="cta-button">Back to Home</a>
      </div>
    `;
  }

  loadRestaurantData() {
    // Update page title
    document.title = `${this.restaurant.name} - ReserVee`;

    // Load restaurant header
    document.getElementById("restaurantImage").src = this.restaurant.image;
    document.getElementById("restaurantImage").alt = this.restaurant.name;
    document.getElementById("restaurantName").textContent =
      this.restaurant.name;

    // Rating
    const stars =
      "★".repeat(Math.floor(this.restaurant.rating)) +
      "☆".repeat(5 - Math.floor(this.restaurant.rating));
    document.getElementById("restaurantRating").textContent = stars;
    document.getElementById(
      "ratingText"
    ).textContent = `(${this.restaurant.rating}/5)`;

    // Location and cuisine
    document
      .getElementById("restaurantLocation")
      .querySelector("span:last-child").textContent = this.restaurant.address;
    document
      .getElementById("restaurantCuisine")
      .querySelector("span:last-child").textContent = this.restaurant.cuisine;

    // Description
    document.getElementById("restaurantDescription").textContent =
      this.restaurant.description;

    // Contact information
    document.getElementById("restaurantPhone").textContent =
      this.restaurant.phone;
    document.getElementById("restaurantEmail").textContent =
      this.restaurant.email;
    document.getElementById("restaurantAddress").textContent =
      this.restaurant.address;

    // Opening hours
    const hoursContainer = document.getElementById("openingHours");
    hoursContainer.innerHTML = `
      <div class="hours-item">
        <span>Monday - Friday:</span>
        <span>${this.restaurant.openingHours.weekdays}</span>
      </div>
      <div class="hours-item">
        <span>Saturday - Sunday:</span>
        <span>${this.restaurant.openingHours.weekends}</span>
      </div>
    `;

    // Features
    const featuresContainer = document.getElementById("restaurantFeatures");
    featuresContainer.innerHTML = this.restaurant.features
      .map((feature) => `<span class="feature-tag">${feature}</span>`)
      .join("");

    // Price range
    document.querySelector(".price-symbol").textContent =
      this.restaurant.priceSymbol;
    document.querySelector(".price-text").textContent =
      this.restaurant.priceRange;

    // Menu items
    this.loadMenuItems();

    // Reviews
    this.loadReviews();
  }

  loadMenuItems() {
    const menuContainer = document.getElementById("menuItems");
    menuContainer.innerHTML = this.restaurant.menuItems
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

  loadReviews() {
    const reviewsContainer = document.getElementById("reviewsList");
    reviewsContainer.innerHTML = this.restaurant.reviews
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

  attachEventListeners() {
    const makeReservationBtn = document.getElementById("makeReservationBtn");
    const viewMenuBtn = document.getElementById("viewMenuBtn");

    makeReservationBtn.addEventListener("click", () => {
      window.location.href = `reservation.html?restaurant=${this.restaurantId}`;
    });

    viewMenuBtn.addEventListener("click", () => {
      document
        .querySelector(".menu-preview")
        .scrollIntoView({ behavior: "smooth" });
    });
  }
}

// Initialize restaurant page when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new RestaurantPage();
});
