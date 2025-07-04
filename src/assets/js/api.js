// API Service for ReserVee Backend Integration

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

export const reservationAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();

    if (filters.date) queryParams.append("date", filters.date);
    if (filters.restaurantId)
      queryParams.append("restaurantId", filters.restaurantId);
    if (filters.status) queryParams.append("status", filters.status);

    const endpoint = `/reservations${
      queryParams.toString() ? `?${queryParams}` : ""
    }`;
    return await apiRequest(endpoint);
  },

  getById: async (id) => {
    return await apiRequest(`/reservations/${id}`);
  },

  create: async (reservationData) => {
    return await apiRequest("/reservations", {
      method: "POST",
      body: JSON.stringify(reservationData),
    });
  },

  update: async (id, reservationData) => {
    return await apiRequest(`/reservations/${id}`, {
      method: "PUT",
      body: JSON.stringify(reservationData),
    });
  },

  delete: async (id) => {
    return await apiRequest(`/reservations/${id}`, {
      method: "DELETE",
    });
  },

  deleteAll: async () => {
    return await apiRequest("/reservations", {
      method: "DELETE",
    });
  },
};

export const restaurantAPI = {
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();

    if (filters.location) queryParams.append("location", filters.location);
    if (filters.cuisine) queryParams.append("cuisine", filters.cuisine);
    if (filters.priceRange)
      queryParams.append("priceRange", filters.priceRange);

    const endpoint = `/restaurants${
      queryParams.toString() ? `?${queryParams}` : ""
    }`;
    return await apiRequest(endpoint);
  },

  getById: async (id) => {
    return await apiRequest(`/restaurants/${id}`);
  },

  getReservations: async (id) => {
    return await apiRequest(`/restaurants/${id}/reservations`);
  },

  getLocations: async () => {
    return await apiRequest("/restaurants/meta/locations");
  },

  getCuisines: async () => {
    return await apiRequest("/restaurants/meta/cuisines");
  },
};

export const healthAPI = {
  check: async () => {
    return await apiRequest("/health");
  },
};

export const handleAPIError = (error, context = "") => {
  console.error(`API Error ${context}:`, error);

  const errorMessages = {
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

  const userMessage =
    errorMessages[error.message] || "Bir hata oluştu. Lütfen tekrar deneyin.";

  return {
    originalError: error,
    userMessage,
    shouldRetry: error.message === "Failed to fetch",
  };
};

export const testConnection = async () => {
  try {
    const result = await healthAPI.check();
    console.log("✅ Backend connection successful:", result);
    return true;
  } catch (error) {
    console.error("❌ Backend connection failed:", error);
    return false;
  }
};

export const withFallback = async (apiCall, fallbackCall) => {
  try {
    return await apiCall();
  } catch (error) {
    console.warn("API call failed, falling back to localStorage:", error);
    return await fallbackCall();
  }
};

export { API_BASE_URL };
