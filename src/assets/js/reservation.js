import {
  isValidEmail,
  isValidPhone,
  generateId,
  storage,
  formatDate,
  formatTime,
} from "./utils.js";

// Reservation form handling
class ReservationForm {
  constructor() {
    this.form = document.getElementById("reservationForm");
    this.successMessage = document.getElementById("successMessage");
    this.makeAnotherButton = document.getElementById("makeAnother");
    this.selectedRestaurantId = this.getRestaurantIdFromUrl();

    this.init();
  }

  getRestaurantIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("restaurant");
  }

  init() {
    // Set minimum date to today
    const dateInput = document.getElementById("date");
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;

    // Show selected restaurant info if coming from restaurant page
    this.showSelectedRestaurant();

    // Add real-time validation
    this.addValidationListeners();

    // Handle form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Handle "Make Another" button
    this.makeAnotherButton.addEventListener("click", () => this.resetForm());
  }

  showSelectedRestaurant() {
    if (!this.selectedRestaurantId) return;

    const restaurantData = {
      rest_1: {
        name: "ReserVee Beşiktaş",
        address: "Barbaros Bulvarı No:15, Beşiktaş",
      },
      rest_2: {
        name: "Bosphorus Café",
        address: "Ortaköy Meydanı No:8, Beşiktaş",
      },
      rest_3: {
        name: "ReserVee Kadıköy",
        address: "Bahariye Caddesi No:42, Kadıköy",
      },
    };

    const restaurant = restaurantData[this.selectedRestaurantId];
    if (restaurant) {
      // Add restaurant info section before the form
      const restaurantInfo = document.createElement("div");
      restaurantInfo.className = "selected-restaurant-info";
      restaurantInfo.innerHTML = `
        <div class="restaurant-selection">
          <h3>Selected Restaurant</h3>
          <div class="restaurant-details">
            <strong>${restaurant.name}</strong>
            <span>${restaurant.address}</span>
          </div>
          <button type="button" id="changeRestaurant" class="change-restaurant-btn">Change Restaurant</button>
        </div>
      `;

      this.form.parentNode.insertBefore(restaurantInfo, this.form);

      // Add change restaurant functionality
      document
        .getElementById("changeRestaurant")
        .addEventListener("click", () => {
          window.location.href = "index.html";
        });
    }
  }

  addValidationListeners() {
    const inputs = this.form.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = "";

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      isValid = false;
      errorMessage = "This field is required.";
    } else {
      // Field-specific validation
      switch (fieldName) {
        case "fullName":
          if (value && value.length < 2) {
            isValid = false;
            errorMessage = "Name must be at least 2 characters long.";
          }
          break;

        case "phoneNumber":
          if (value && !isValidPhone(value)) {
            isValid = false;
            errorMessage = "Please enter a valid phone number.";
          }
          break;

        case "email":
          if (value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = "Please enter a valid email address.";
          }
          break;

        case "date":
          if (value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
              isValid = false;
              errorMessage = "Please select a future date.";
            }
          }
          break;

        case "time":
          if (value) {
            const selectedDate = new Date(
              document.getElementById("date").value
            );
            const today = new Date();
            const [hours, minutes] = value.split(":");
            const selectedDateTime = new Date(selectedDate);
            selectedDateTime.setHours(parseInt(hours), parseInt(minutes));

            if (
              selectedDate.toDateString() === today.toDateString() &&
              selectedDateTime <= today
            ) {
              isValid = false;
              errorMessage = "Please select a future time.";
            }
          }
          break;
      }
    }

    this.showFieldError(field, isValid ? "" : errorMessage);
    return isValid;
  }

  showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}Error`);

    if (message) {
      field.classList.add("error");
      errorElement.textContent = message;
    } else {
      field.classList.remove("error");
      errorElement.textContent = "";
    }
  }

  clearError(field) {
    field.classList.remove("error");
    const errorElement = document.getElementById(`${field.name}Error`);
    errorElement.textContent = "";
  }

  validateForm() {
    const inputs = this.form.querySelectorAll(
      "input[required], select[required]"
    );
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    const formData = new FormData(this.form);
    const reservation = {
      id: generateId(),
      restaurantId: this.selectedRestaurantId || "general",
      fullName: formData.get("fullName"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      date: formData.get("date"),
      time: formData.get("time"),
      guests: formData.get("guests"),
      specialRequests: formData.get("specialRequests") || "",
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    this.saveReservation(reservation);

    // Show success message
    this.showSuccess(reservation);
  }

  saveReservation(reservation) {
    const existingReservations = storage.get("reservations") || [];
    existingReservations.push(reservation);
    storage.set("reservations", existingReservations);
  }

  showSuccess(reservation) {
    this.form.style.display = "none";

    // Hide restaurant selection if it exists
    const restaurantInfo = document.querySelector(".selected-restaurant-info");
    if (restaurantInfo) {
      restaurantInfo.style.display = "none";
    }

    this.successMessage.classList.remove("hidden");

    // Update success message with reservation details
    const successContent =
      this.successMessage.querySelector(".success-content p");
    successContent.innerHTML = `
      Your reservation for ${reservation.guests} guest${
      reservation.guests > 1 ? "s" : ""
    } 
      on ${formatDate(reservation.date)} at ${formatTime(
      reservation.time
    )} has been confirmed.
    `;
  }

  resetForm() {
    this.form.reset();
    this.form.style.display = "block";

    // Show restaurant selection if it exists
    const restaurantInfo = document.querySelector(".selected-restaurant-info");
    if (restaurantInfo) {
      restaurantInfo.style.display = "block";
    }

    this.successMessage.classList.add("hidden");

    // Clear all error states
    const inputs = this.form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => this.clearError(input));

    // Reset date minimum
    const dateInput = document.getElementById("date");
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }
}

// Initialize reservation form when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new ReservationForm();
});
