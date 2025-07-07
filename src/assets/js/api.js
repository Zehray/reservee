// API Service for ReserVee Backend Integration

var API_BASE_URL = "http://localhost:5000/api";

// Safari uyumlu API request function
function apiRequest(endpoint, options) {
  options = options || {};
  var url = API_BASE_URL + endpoint;

  var config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Safari uyumlu object assign
  if (options.headers) {
    for (var key in options.headers) {
      config.headers[key] = options.headers[key];
    }
  }

  for (var key in options) {
    if (key !== "headers") {
      config[key] = options[key];
    }
  }

  return fetch(url, config)
    .then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok) {
          throw new Error(
            data.error || "HTTP error! status: " + response.status
          );
        }
        return data;
      });
    })
    .catch(function (error) {
      console.error("API Error (" + endpoint + "):", error);
      throw error;
    });
}

var reservationAPI = {
  getAll: function (filters) {
    filters = filters || {};
    var queryParams = [];

    if (filters.date)
      queryParams.push("date=" + encodeURIComponent(filters.date));
    if (filters.restaurantId)
      queryParams.push(
        "restaurantId=" + encodeURIComponent(filters.restaurantId)
      );
    if (filters.status)
      queryParams.push("status=" + encodeURIComponent(filters.status));

    var endpoint =
      "/reservations" + (queryParams.length ? "?" + queryParams.join("&") : "");
    return apiRequest(endpoint);
  },

  getById: function (id) {
    return apiRequest("/reservations/" + id);
  },

  create: function (reservationData) {
    return apiRequest("/reservations", {
      method: "POST",
      body: JSON.stringify(reservationData),
    });
  },

  update: function (id, reservationData) {
    return apiRequest("/reservations/" + id, {
      method: "PUT",
      body: JSON.stringify(reservationData),
    });
  },

  delete: function (id) {
    return apiRequest("/reservations/" + id, {
      method: "DELETE",
    });
  },

  deleteAll: function () {
    return apiRequest("/reservations", {
      method: "DELETE",
    });
  },
};

var restaurantAPI = {
  getAll: function (filters) {
    filters = filters || {};
    var queryParams = [];

    if (filters.location)
      queryParams.push("location=" + encodeURIComponent(filters.location));
    if (filters.cuisine)
      queryParams.push("cuisine=" + encodeURIComponent(filters.cuisine));
    if (filters.priceRange)
      queryParams.push("priceRange=" + encodeURIComponent(filters.priceRange));

    var endpoint =
      "/restaurants" + (queryParams.length ? "?" + queryParams.join("&") : "");
    return apiRequest(endpoint);
  },

  getById: function (id) {
    return apiRequest("/restaurants/" + id);
  },

  getReservations: function (id) {
    return apiRequest("/restaurants/" + id + "/reservations");
  },

  getLocations: function () {
    return apiRequest("/restaurants/meta/locations");
  },

  getCuisines: function () {
    return apiRequest("/restaurants/meta/cuisines");
  },
};

var healthAPI = {
  check: function () {
    return apiRequest("/health");
  },
};

function handleAPIError(error, context) {
  context = context || "";
  console.error("API Error " + context + ":", error);

  var errorMessages = {
    "Failed to fetch":
      "Sunucuya bağlanılamıyor. İnternet bağlantınızı kontrol edin.",
    "Reservation not found": "Rezervasyon bulunamadı.",
    "Restaurant not found": "Restoran bulunamadı.",
    "Invalid email format": "Geçersiz email formatı.",
    "Invalid phone number format": "Geçersiz telefon numarası formatı.",
    "Reservation date cannot be in the past":
      "Rezervasyon tarihi geçmiş olamaz.",
    "Missing required fields": "Zorunlu alanlar eksik.",
  };

  var userMessage =
    errorMessages[error.message] || "Bir hata oluştu. Lütfen tekrar deneyin.";

  return {
    originalError: error,
    userMessage: userMessage,
    shouldRetry: error.message === "Failed to fetch",
  };
}

function testConnection() {
  return healthAPI
    .check()
    .then(function (result) {
      console.log("✅ Backend connection successful:", result);
      return true;
    })
    .catch(function (error) {
      console.error("❌ Backend connection failed:", error);
      return false;
    });
}

function withFallback(apiCall, fallbackCall) {
  return apiCall().catch(function (error) {
    console.warn("API call failed, falling back to localStorage:", error);
    return fallbackCall();
  });
}

// Export for ES6 modules
export {
  reservationAPI,
  restaurantAPI,
  healthAPI,
  handleAPIError,
  testConnection,
  withFallback,
  API_BASE_URL,
};
