import {
  isValidEmail,
  isValidPhone,
  generateId,
  storage,
  formatDate,
  formatTime,
} from "./utils.js";
import { reservationAPI, handleAPIError, withFallback } from "./api.js";

let form;
let successMessage;
let makeAnotherButton;
let selectedRestaurantId;

function getRestaurantIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("restaurant");
}

function initReservationForm() {
  form = document.getElementById("reservationForm");
  successMessage = document.getElementById("successMessage");
  makeAnotherButton = document.getElementById("makeAnother");
  selectedRestaurantId = getRestaurantIdFromUrl();

  if (!form || !successMessage || !makeAnotherButton) {
    console.error("Required form elements not found");
    return;
  }

  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }

  showSelectedRestaurant();
  addValidationListeners();

  form.addEventListener("submit", handleSubmit);
  makeAnotherButton.addEventListener("click", resetForm);
}

function showSelectedRestaurant() {
  if (!selectedRestaurantId) return;

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

  const restaurant = restaurantData[selectedRestaurantId];
  if (restaurant) {
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

    form.parentNode.insertBefore(restaurantInfo, form);

    document
      .getElementById("changeRestaurant")
      .addEventListener("click", () => {
        window.location.href = "index.html";
      });
  }
}

function addValidationListeners() {
  const inputs = form.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearError(input));
  });
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = "";

  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "This field is required.";
  } else {
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
          const selectedDate = new Date(document.getElementById("date").value);
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

  showFieldError(field, isValid ? "" : errorMessage);
  return isValid;
}

function showFieldError(field, message) {
  const errorElement = document.getElementById(`${field.name}Error`);

  if (message) {
    field.classList.add("error");
    errorElement.textContent = message;
  } else {
    field.classList.remove("error");
    errorElement.textContent = "";
  }
}

function clearError(field) {
  field.classList.remove("error");
  const errorElement = document.getElementById(`${field.name}Error`);
  errorElement.textContent = "";
}

function validateForm() {
  const inputs = form.querySelectorAll("input[required], select[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

async function handleSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Saving...";
  submitButton.disabled = true;

  try {
    const formData = new FormData(form);
    const reservation = {
      id: generateId(),
      restaurantId: selectedRestaurantId || "general",
      fullName: formData.get("fullName"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      date: formData.get("date"),
      time: formData.get("time"),
      guests: formData.get("guests"),
      specialRequests: formData.get("specialRequests") || "",
      createdAt: new Date().toISOString(),
    };

    const result = await saveReservation(reservation);

    showSuccess(reservation);

    if (result.fallback) {
      console.warn("⚠️ Reservation saved locally only");
    } else {
      console.log("✅ Reservation saved to backend successfully");
    }
  } catch (error) {
    console.error("❌ Failed to save reservation:", error);
    alert("Rezervasyon kaydedilemedi. Lütfen tekrar deneyin.");
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

async function saveReservation(reservation) {
  try {
    const response = await reservationAPI.create(reservation);
    console.log("✅ Reservation saved to backend:", response);

    const existingReservations = storage.get("reservations") || [];
    existingReservations.push(reservation);
    storage.set("reservations", existingReservations);

    return response;
  } catch (error) {
    console.warn("⚠️ Backend save failed, using localStorage fallback");
    const errorInfo = handleAPIError(error, "saving reservation");

    const existingReservations = storage.get("reservations") || [];
    existingReservations.push(reservation);
    storage.set("reservations", existingReservations);

    console.warn("Reservation saved locally:", errorInfo.userMessage);
    return { success: true, data: reservation, fallback: true };
  }
}

function showSuccess(reservation) {
  form.style.display = "none";

  const restaurantInfo = document.querySelector(".selected-restaurant-info");
  if (restaurantInfo) {
    restaurantInfo.style.display = "none";
  }

  successMessage.classList.remove("hidden");

  const successContent = successMessage.querySelector(".success-content p");
  successContent.innerHTML = `
    Your reservation for ${reservation.guests} guest${
    reservation.guests > 1 ? "s" : ""
  }
    on ${formatDate(reservation.date)} at ${formatTime(
    reservation.time
  )} has been confirmed.
  `;
}

function resetForm() {
  form.reset();
  form.style.display = "block";

  const restaurantInfo = document.querySelector(".selected-restaurant-info");
  if (restaurantInfo) {
    restaurantInfo.style.display = "block";
  }

  successMessage.classList.add("hidden");

  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => clearError(input));

  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }
}

document.addEventListener("DOMContentLoaded", initReservationForm);

export {
  initReservationForm,
  getRestaurantIdFromUrl,
  showSelectedRestaurant,
  addValidationListeners,
  validateField,
  validateForm,
  handleSubmit,
  saveReservation,
  showSuccess,
  resetForm,
};
