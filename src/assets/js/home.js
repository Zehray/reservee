class HomePage {
  constructor() {
    this.citySelect = document.getElementById("citySelect");
    this.districtSelect = document.getElementById("districtSelect");
    this.findRestaurantsBtn = document.getElementById("findRestaurants");
    this.restaurantResults = document.getElementById("restaurantResults");
    this.restaurantGrid = document.getElementById("restaurantGrid");
    this.resultsTitle = document.getElementById("resultsTitle");

    this.districts = {}; // JSON'dan gelecek
    this.restaurants = []; // JSON'dan gelecek

    this.init();
  }

  async init() {
    await this.loadData();
    this.populateCityOptions();
    this.attachEventListeners();
  }

  async loadData() {
    try {
      const [districtsRes, restaurantsRes] = await Promise.all([
        fetch("src/assets/dummyjson/iller_ilceler.json"),
        fetch("src/assets/dummyjson/restaurant.json"),
      ]);

      if (!districtsRes.ok || !restaurantsRes.ok) {
        throw new Error("Veri yükleme başarısız!");
      }

      this.districts = await districtsRes.json();
      this.restaurants = await restaurantsRes.json();
    } catch (error) {
      console.error("Veriler yüklenemedi:", error);
    }
  }

  populateCityOptions() {
    this.citySelect.innerHTML = `<option value="">Şehir seçin</option>`;
    Object.keys(this.districts).forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      this.citySelect.appendChild(option);
    });
  }

  attachEventListeners() {
    this.citySelect.addEventListener("change", () => this.onCityChange());
    this.districtSelect.addEventListener("change", () =>
      this.onDistrictChange()
    );
    this.findRestaurantsBtn.addEventListener("click", () =>
      this.findRestaurants()
    );
  }

  onCityChange() {
    const selectedCity = this.citySelect.value;
    const districts = this.districts[selectedCity] || [];

    this.districtSelect.innerHTML = `<option value="">İlçe seçin</option>`;
    this.districtSelect.disabled = !districts.length;
    this.findRestaurantsBtn.disabled = true;

    districts.forEach((district) => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      this.districtSelect.appendChild(option);
    });

    this.restaurantResults.classList.add("hidden");
  }

  onDistrictChange() {
    const selectedDistrict = this.districtSelect.value;
    this.findRestaurantsBtn.disabled = !selectedDistrict;
  }

  findRestaurants() {
    const selectedCity = this.citySelect.value;
    const selectedDistrict = this.districtSelect.value;

    if (!selectedCity || !selectedDistrict) return;

    const filteredRestaurants = this.restaurants.filter(
      (rest) => rest.city === selectedCity && rest.district === selectedDistrict
    );

    this.displayRestaurants(
      filteredRestaurants,
      selectedCity,
      selectedDistrict
    );
  }

  displayRestaurants(restaurants, cityName, districtName) {
    this.resultsTitle.textContent = `${districtName}, ${cityName} bölgesindeki restoranlar`;
    this.restaurantGrid.innerHTML = "";

    if (restaurants.length === 0) {
      this.restaurantGrid.innerHTML = `
          <div class="no-restaurants">
            <div class="no-data-icon">🏪</div>
            <h3>Restoran bulunamadı</h3>
            <p>Bu bölgede henüz restoran verisi bulunmamaktadır.</p>
          </div>
        `;
    } else {
      restaurants.forEach((restaurant) => {
        const card = this.createRestaurantCard(restaurant);
        this.restaurantGrid.appendChild(card);
      });
    }

    this.restaurantResults.classList.remove("hidden");
    this.restaurantResults.scrollIntoView({ behavior: "smooth" });
  }

  createRestaurantCard(restaurant) {
    const card = document.createElement("div");
    card.className = "restaurant-card";

    card.innerHTML = `
        <div class="restaurant-image">
          <img src="${restaurant.image}" alt="${restaurant.name}">
        </div>
        <div class="restaurant-content">
          <h3>${restaurant.name}</h3>
          <p class="restaurant-address">${restaurant.district}, ${restaurant.city}</p>
          <div class="restaurant-actions">
            <button class="view-details-btn" onclick="window.location.href='restaurant.html?id=${restaurant.id}'">
              Detaylar
            </button>
            <button class="quick-reserve-btn" onclick="window.location.href='reservation.html?restaurant=${restaurant.id}'">
              Hızlı Rezervasyon
            </button>
          </div>
        </div>
      `;

    return card;
  }
}

// Başlat
document.addEventListener("DOMContentLoaded", () => {
  new HomePage();
});
