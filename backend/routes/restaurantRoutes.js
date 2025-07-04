import express from "express";

const router = express.Router();

// Restoran verileri (production'da database'den gelecek)
const restaurants = [
  {
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
    city: "İstanbul",
    district: "Beşiktaş",
    location: "Beşiktaş", // Backward compatibility
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
    ],
  },
  {
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
    city: "İstanbul",
    district: "Ortaköy",
    location: "Ortaköy", // Backward compatibility
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
    ],
    reviews: [
      {
        name: "Sarah M.",
        rating: 4,
        comment:
          "Beautiful view and good food. A bit pricey but worth it for special occasions.",
        date: "2024-01-12",
      },
    ],
  },
  {
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
    city: "İstanbul",
    district: "Kadıköy",
    location: "Kadıköy", // Backward compatibility
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
    ],
    reviews: [
      {
        name: "Zeynep A.",
        rating: 5,
        comment: "Perfect place to study! Great coffee and quiet atmosphere.",
        date: "2024-01-14",
      },
    ],
  },
  {
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
    city: "Ankara",
    district: "Çankaya",
    location: "Çankaya",
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
  {
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
    city: "İzmir",
    district: "Konak",
    location: "Konak",
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
  {
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
    city: "Antalya",
    district: "Muratpaşa",
    location: "Muratpaşa",
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
];

// GET /api/restaurants - Tüm restoranları getir
router.get("/", (req, res) => {
  try {
    const { location, city, district, cuisine, priceRange } = req.query;

    let filteredRestaurants = [...restaurants];

    // Şehir filtresi
    if (city && city !== "all") {
      filteredRestaurants = filteredRestaurants.filter(
        (r) => r.city && r.city.toLowerCase() === city.toLowerCase()
      );
    }

    // İlçe filtresi
    if (district && district !== "all") {
      filteredRestaurants = filteredRestaurants.filter(
        (r) => r.district && r.district.toLowerCase() === district.toLowerCase()
      );
    }

    // Lokasyon filtresi (backward compatibility)
    if (location && location !== "all") {
      filteredRestaurants = filteredRestaurants.filter(
        (r) =>
          r.location.toLowerCase() === location.toLowerCase() ||
          (r.district && r.district.toLowerCase() === location.toLowerCase()) ||
          (r.city && r.city.toLowerCase() === location.toLowerCase())
      );
    }

    // Mutfak türü filtresi
    if (cuisine) {
      filteredRestaurants = filteredRestaurants.filter((r) =>
        r.cuisine.toLowerCase().includes(cuisine.toLowerCase())
      );
    }

    // Fiyat aralığı filtresi
    if (priceRange) {
      filteredRestaurants = filteredRestaurants.filter(
        (r) => r.priceSymbol === priceRange
      );
    }

    // Rating'e göre sırala
    filteredRestaurants.sort((a, b) => b.rating - a.rating);

    res.json({
      success: true,
      count: filteredRestaurants.length,
      data: filteredRestaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch restaurants",
      message: error.message,
    });
  }
});

// GET /api/restaurants/:id - Belirli restoranı getir
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = restaurants.find((r) => r.id === id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: "Restaurant not found",
      });
    }

    res.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch restaurant",
      message: error.message,
    });
  }
});

// GET /api/restaurants/:id/reservations - Restoranın rezervasyonları
router.get("/:id/reservations", (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = restaurants.find((r) => r.id === id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: "Restaurant not found",
      });
    }

    // Bu endpoint rezervasyon servisini çağırabilir
    // Şimdilik boş array döndürüyoruz
    res.json({
      success: true,
      restaurantId: id,
      restaurantName: restaurant.name,
      reservations: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch restaurant reservations",
      message: error.message,
    });
  }
});

// GET /api/restaurants/locations - Mevcut lokasyonları getir
router.get("/meta/locations", (req, res) => {
  try {
    const locations = [...new Set(restaurants.map((r) => r.location))];

    res.json({
      success: true,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch locations",
      message: error.message,
    });
  }
});

// GET /api/restaurants/cuisines - Mevcut mutfak türlerini getir
router.get("/meta/cuisines", (req, res) => {
  try {
    const cuisines = [...new Set(restaurants.map((r) => r.cuisine))];

    res.json({
      success: true,
      data: cuisines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch cuisines",
      message: error.message,
    });
  }
});

export default router;
