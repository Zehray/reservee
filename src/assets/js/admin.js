import { storage, formatDate, formatTime, debounce } from "./utils.js";
import { reservationAPI, handleAPIError, withFallback } from "./api.js";

let reservations = [];
let filteredReservations = [];
let currentSort = "date";

let tableBody;
let totalCount;
let noReservationsDiv;
let tableContainer;
let dateFilter;
let sortSelect;
let clearAllButton;

async function initAdminDashboard() {
  tableBody = document.getElementById("reservationsTableBody");
  totalCount = document.getElementById("totalReservations");
  noReservationsDiv = document.getElementById("noReservations");
  tableContainer = document.querySelector(".table-container");
  dateFilter = document.getElementById("dateFilter");
  sortSelect = document.getElementById("sortBy");
  clearAllButton = document.getElementById("clearAllData");

  if (
    !tableBody ||
    !totalCount ||
    !noReservationsDiv ||
    !tableContainer ||
    !dateFilter ||
    !sortSelect ||
    !clearAllButton
  ) {
    console.error("Required admin dashboard elements not found");
    return;
  }

  if (totalCount) {
    totalCount.textContent = "Loading...";
  }

  await loadReservations();
  renderReservations();
  attachEventListeners();
}

async function loadReservations() {
  try {
    const response = await reservationAPI.getAll();
    reservations = response.data || [];
    console.log("✅ Loaded reservations from backend:", reservations.length);

    storage.set("reservations", reservations);
  } catch (error) {
    console.warn("⚠️ Backend load failed, using localStorage fallback");
    const errorInfo = handleAPIError(error, "loading reservations");

    reservations = storage.get("reservations") || [];
    console.warn(
      "Loaded from localStorage:",
      reservations.length,
      "reservations"
    );
  }

  filteredReservations = [...reservations];
}

function attachEventListeners() {
  dateFilter.addEventListener("change", filterByDate);

  sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    sortReservations();
    renderReservations();
  });

  clearAllButton.addEventListener("click", clearAllData);

  setInterval(() => {
    loadReservations();
    applyFiltersAndSort();
    renderReservations();
  }, 30000);
}

function filterByDate() {
  const selectedDate = dateFilter.value;

  if (selectedDate) {
    filteredReservations = reservations.filter(
      (reservation) => reservation.date === selectedDate
    );
  } else {
    filteredReservations = [...reservations];
  }

  sortReservations();
  renderReservations();
}

function sortReservations() {
  filteredReservations.sort((a, b) => {
    switch (currentSort) {
      case "name":
        return a.fullName.localeCompare(b.fullName);
      case "guests":
        return parseInt(b.guests) - parseInt(a.guests);
      case "time":
        return a.time.localeCompare(b.time);
      case "date":
      default:
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeA - dateTimeB;
    }
  });
}

function applyFiltersAndSort() {
  filterByDate();
}

function renderReservations() {
  updateStats();

  if (filteredReservations.length === 0) {
    showNoReservations();
    return;
  }

  hideNoReservations();
  renderTable();
}

function updateStats() {
  totalCount.textContent = `Total: ${filteredReservations.length}`;
}

function showNoReservations() {
  tableContainer.style.display = "none";
  noReservationsDiv.style.display = "block";
}

function hideNoReservations() {
  tableContainer.style.display = "block";
  noReservationsDiv.style.display = "none";
}

function renderTable() {
  tableBody.innerHTML = "";

  filteredReservations.forEach((reservation) => {
    const row = createTableRow(reservation);
    tableBody.appendChild(row);
  });
}

function createTableRow(reservation) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${reservation.fullName}</td>
    <td>${reservation.phoneNumber}</td>
    <td>${reservation.email}</td>
    <td>${formatDate(reservation.date)}</td>
    <td>${formatTime(reservation.time)}</td>
    <td>${reservation.guests}</td>
    <td>${reservation.specialRequests || "-"}</td>
    <td>
      <button class="delete-btn" onclick="deleteReservation('${
        reservation.id
      }')"
              style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
        Delete
      </button>
    </td>
  `;

  return row;
}

async function deleteReservation(id) {
  if (!confirm("Are you sure you want to delete this reservation?")) {
    return;
  }

  try {
    await reservationAPI.delete(id);
    console.log("✅ Reservation deleted from backend");

    reservations = reservations.filter((reservation) => reservation.id !== id);
    storage.set("reservations", reservations);
  } catch (error) {
    console.warn("⚠️ Backend delete failed, deleting locally only");
    handleAPIError(error, "deleting reservation");

    reservations = reservations.filter((reservation) => reservation.id !== id);
    storage.set("reservations", reservations);
  }

  await loadReservations();
  applyFiltersAndSort();
  renderReservations();
}

function clearAllData() {
  if (
    !confirm(
      "Are you sure you want to delete ALL reservations? This action cannot be undone."
    )
  ) {
    return;
  }

  storage.remove("reservations");
  loadReservations();
  applyFiltersAndSort();
  renderReservations();

  alert("All reservation data has been cleared.");
}

document.addEventListener("DOMContentLoaded", initAdminDashboard);

export {
  initAdminDashboard,
  loadReservations,
  attachEventListeners,
  filterByDate,
  sortReservations,
  renderReservations,
  deleteReservation,
  clearAllData,
};

window.deleteReservation = deleteReservation;
