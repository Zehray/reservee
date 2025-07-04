document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

let districtsData = {};
let restaurantData = [];

async function initApp() {
  await loadData();
  populateCityOptions();
  attachEventListeners();
}

async function loadData() {
  try {
    // Önce backend'den deneyelim
    await loadFromBackend();
  } catch (error) {
    console.error("Backend failed, trying local files:", error);

    try {
      const [districtsRes, restaurantsRes] = await Promise.all([
        fetch("/iller_ilceler.json"),
        fetch("src/assets/dummyjson/restaurant.json"),
      ]);

      if (!districtsRes.ok || !restaurantsRes.ok) {
        throw new Error("Veri yüklenemedi");
      }

      districtsData = await districtsRes.json();
      restaurantData = await restaurantsRes.json();
      console.log("✅ Loaded from local files");
    } catch (localError) {
      console.error("Local files failed:", localError);
      useHardcodedData();
    }
  }
}

// Backend'den veri yükleme fallback
async function loadFromBackend() {
  try {
    // Backend'den restoranları al
    const response = await fetch("http://localhost:5000/api/restaurants");
    if (response.ok) {
      const data = await response.json();
      restaurantData = data.data || [];
      console.log("✅ Loaded restaurants from backend:", restaurantData.length);

      // Şehir-İlçe yapısını oluştur
      districtsData = {};
      restaurantData.forEach((restaurant) => {
        const city = restaurant.city || "İstanbul";
        const district = restaurant.district || restaurant.location;

        if (!districtsData[city]) {
          districtsData[city] = [];
        }

        if (!districtsData[city].includes(district)) {
          districtsData[city].push(district);
        }
      });

      console.log("✅ Created city-district mapping:", districtsData);
    } else {
      // Son fallback: Hardcoded data
      useHardcodedData();
    }
  } catch (error) {
    console.error("Backend fallback failed:", error);
    useHardcodedData();
  }
}

// Hardcoded fallback data
function useHardcodedData() {
  console.log("Using hardcoded fallback data");
  districtsData = {
    İstanbul: ["Beşiktaş", "Kadıköy", "Ortaköy"],
    Ankara: ["Çankaya", "Keçiören"],
    İzmir: ["Konak", "Bornova"],
  };
  restaurantData = []; // Boş array
}

function populateCityOptions() {
  const citySelect = document.getElementById("citySelect");
  citySelect.innerHTML = `<option value="">Şehir seçin</option>`;

  Object.keys(districtsData).forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

function attachEventListeners() {
  const citySelect = document.getElementById("citySelect");
  const districtSelect = document.getElementById("districtSelect");
  const findRestaurantsBtn = document.getElementById("findRestaurants");

  citySelect.addEventListener("change", onCityChange);
  districtSelect.addEventListener("change", onDistrictChange);
  findRestaurantsBtn.addEventListener("click", findRestaurants);
}

function onCityChange() {
  const citySelect = document.getElementById("citySelect");
  const districtSelect = document.getElementById("districtSelect");
  const findRestaurantsBtn = document.getElementById("findRestaurants");
  const selectedCity = citySelect.value;

  const districts = districtsData[selectedCity] || [];

  districtSelect.innerHTML = `<option value="">İlçe seçin</option>`;
  districtSelect.disabled = !districts.length;
  findRestaurantsBtn.disabled = true;

  districts.forEach((district) => {
    const option = document.createElement("option");
    option.value = district;
    option.textContent = district;
    districtSelect.appendChild(option);
  });

  document.getElementById("restaurantResults").classList.add("hidden");
}

function onDistrictChange() {
  const districtSelect = document.getElementById("districtSelect");
  const findRestaurantsBtn = document.getElementById("findRestaurants");

  findRestaurantsBtn.disabled = !districtSelect.value;
}

async function findRestaurants() {
  const city = document.getElementById("citySelect").value;
  const district = document.getElementById("districtSelect").value;

  if (!city || !district) return;

  // Backend'den filtrelenmiş veri çekmeyi dene
  try {
    const response = await fetch(
      `http://localhost:5000/api/restaurants?city=${encodeURIComponent(
        city
      )}&district=${encodeURIComponent(district)}`
    );
    if (response.ok) {
      const data = await response.json();
      displayRestaurants(data.data || [], city, district);
      console.log(
        `✅ Loaded ${data.count} restaurants for ${city}/${district} from backend`
      );
      return;
    }
  } catch (error) {
    console.warn("⚠️ Backend filter failed, using local data:", error);
  }

  // Fallback: Local filtreleme
  const filtered = restaurantData.filter(
    (rest) => rest.city === city && rest.district === district
  );

  displayRestaurants(filtered, city, district);
}

function displayRestaurants(restaurants, city, district) {
  const resultsTitle = document.getElementById("resultsTitle");
  const restaurantGrid = document.getElementById("restaurantGrid");
  const restaurantResults = document.getElementById("restaurantResults");

  resultsTitle.textContent = `${district}, ${city} bölgesindeki restoranlar`;
  restaurantGrid.innerHTML = "";

  if (restaurants.length === 0) {
    restaurantGrid.innerHTML = `
      <div class="no-restaurants">
        <div class="no-data-icon">🏪</div>
        <h3>Restoran bulunamadı</h3>
        <p>Bu bölgede henüz restoran verisi bulunmamaktadır.</p>
      </div>`;
  } else {
    restaurants.forEach((rest) => {
      const card = createRestaurantCard(rest);
      restaurantGrid.appendChild(card);
    });
  }

  restaurantResults.classList.remove("hidden");
  restaurantResults.scrollIntoView({ behavior: "smooth" });
}

function createRestaurantCard(restaurant) {
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
