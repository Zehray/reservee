import { storage, formatDate, formatTime, debounce } from "./utils.js";

// Admin dashboard functionality
class AdminDashboard {
  constructor() {
    this.reservations = [];
    this.filteredReservations = [];
    this.currentSort = "date";

    this.tableBody = document.getElementById("reservationsTableBody");
    this.totalCount = document.getElementById("totalReservations");
    this.noReservationsDiv = document.getElementById("noReservations");
    this.tableContainer = document.querySelector(".table-container");

    this.dateFilter = document.getElementById("dateFilter");
    this.sortSelect = document.getElementById("sortBy");
    this.clearAllButton = document.getElementById("clearAllData");

    this.init();
  }

  init() {
    this.loadReservations();
    this.renderReservations();
    this.attachEventListeners();
  }

  loadReservations() {
    this.reservations = storage.get("reservations") || [];
    this.filteredReservations = [...this.reservations];
  }

  attachEventListeners() {
    // Filter by date
    this.dateFilter.addEventListener("change", () => this.filterByDate());

    // Sort reservations
    this.sortSelect.addEventListener("change", (e) => {
      this.currentSort = e.target.value;
      this.sortReservations();
      this.renderReservations();
    });

    // Clear all data
    this.clearAllButton.addEventListener("click", () => this.clearAllData());

    // Auto-refresh every 30 seconds to catch new reservations
    setInterval(() => {
      this.loadReservations();
      this.applyFiltersAndSort();
      this.renderReservations();
    }, 30000);
  }

  filterByDate() {
    const selectedDate = this.dateFilter.value;

    if (selectedDate) {
      this.filteredReservations = this.reservations.filter(
        (reservation) => reservation.date === selectedDate
      );
    } else {
      this.filteredReservations = [...this.reservations];
    }

    this.sortReservations();
    this.renderReservations();
  }

  sortReservations() {
    this.filteredReservations.sort((a, b) => {
      switch (this.currentSort) {
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

  applyFiltersAndSort() {
    this.filterByDate();
  }

  renderReservations() {
    this.updateStats();

    if (this.filteredReservations.length === 0) {
      this.showNoReservations();
      return;
    }

    this.hideNoReservations();
    this.renderTable();
  }

  updateStats() {
    this.totalCount.textContent = `Total: ${this.filteredReservations.length}`;
  }

  showNoReservations() {
    this.tableContainer.style.display = "none";
    this.noReservationsDiv.style.display = "block";
  }

  hideNoReservations() {
    this.tableContainer.style.display = "block";
    this.noReservationsDiv.style.display = "none";
  }

  renderTable() {
    this.tableBody.innerHTML = "";

    this.filteredReservations.forEach((reservation) => {
      const row = this.createTableRow(reservation);
      this.tableBody.appendChild(row);
    });
  }

  createTableRow(reservation) {
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
        <button class="delete-btn" onclick="adminDashboard.deleteReservation('${
          reservation.id
        }')" 
                style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
          Delete
        </button>
      </td>
    `;

    return row;
  }

  deleteReservation(id) {
    if (!confirm("Are you sure you want to delete this reservation?")) {
      return;
    }

    this.reservations = this.reservations.filter(
      (reservation) => reservation.id !== id
    );
    storage.set("reservations", this.reservations);

    this.loadReservations();
    this.applyFiltersAndSort();
    this.renderReservations();
  }

  clearAllData() {
    if (
      !confirm(
        "Are you sure you want to delete ALL reservations? This action cannot be undone."
      )
    ) {
      return;
    }

    storage.remove("reservations");
    this.loadReservations();
    this.applyFiltersAndSort();
    this.renderReservations();

    alert("All reservation data has been cleared.");
  }
}

// Initialize admin dashboard when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.adminDashboard = new AdminDashboard();
});
