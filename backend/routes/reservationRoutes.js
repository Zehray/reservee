import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// In-memory storage (production'da database kullanın)
let reservations = [
  {
    id: "sample-1",
    restaurantId: "rest_1",
    fullName: "Ahmet Yılmaz",
    phoneNumber: "+90 555 123 4567",
    email: "ahmet@example.com",
    date: "2024-01-20",
    time: "19:00",
    guests: "4",
    specialRequests: "Pencere kenarı masa",
    createdAt: "2024-01-15T10:30:00.000Z",
    status: "confirmed"
  },
  {
    id: "sample-2",
    restaurantId: "rest_2",
    fullName: "Elif Kaya",
    phoneNumber: "+90 555 987 6543",
    email: "elif@example.com",
    date: "2024-01-22",
    time: "20:30",
    guests: "2",
    specialRequests: "",
    createdAt: "2024-01-16T14:15:00.000Z",
    status: "confirmed"
  }
];

// GET /api/reservations - Tüm rezervasyonları getir
router.get("/", (req, res) => {
  try {
    const { date, restaurantId, status } = req.query;
    
    let filteredReservations = [...reservations];
    
    // Tarih filtresi
    if (date) {
      filteredReservations = filteredReservations.filter(r => r.date === date);
    }
    
    // Restoran filtresi
    if (restaurantId) {
      filteredReservations = filteredReservations.filter(r => r.restaurantId === restaurantId);
    }
    
    // Durum filtresi
    if (status) {
      filteredReservations = filteredReservations.filter(r => r.status === status);
    }
    
    // Tarihe göre sırala
    filteredReservations.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA - dateTimeB;
    });
    
    res.json({
      success: true,
      count: filteredReservations.length,
      data: filteredReservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch reservations",
      message: error.message
    });
  }
});

// GET /api/reservations/:id - Belirli rezervasyonu getir
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const reservation = reservations.find(r => r.id === id);
    
    if (!reservation) {
      return res.status(404).json({
        success: false,
        error: "Reservation not found"
      });
    }
    
    res.json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch reservation",
      message: error.message
    });
  }
});

// POST /api/reservations - Yeni rezervasyon oluştur
router.post("/", (req, res) => {
  try {
    const {
      restaurantId,
      fullName,
      phoneNumber,
      email,
      date,
      time,
      guests,
      specialRequests
    } = req.body;
    
    // Validasyon
    if (!restaurantId || !fullName || !phoneNumber || !email || !date || !time || !guests) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        required: ["restaurantId", "fullName", "phoneNumber", "email", "date", "time", "guests"]
      });
    }
    
    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format"
      });
    }
    
    // Telefon format kontrolü
    const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number format"
      });
    }
    
    // Tarih kontrolü (geçmiş tarih olamaz)
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return res.status(400).json({
        success: false,
        error: "Reservation date cannot be in the past"
      });
    }
    
    // Yeni rezervasyon oluştur
    const newReservation = {
      id: uuidv4(),
      restaurantId,
      fullName,
      phoneNumber,
      email,
      date,
      time,
      guests: guests.toString(),
      specialRequests: specialRequests || "",
      createdAt: new Date().toISOString(),
      status: "confirmed"
    };
    
    reservations.push(newReservation);
    
    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      data: newReservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create reservation",
      message: error.message
    });
  }
});

// PUT /api/reservations/:id - Rezervasyonu güncelle
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const reservationIndex = reservations.findIndex(r => r.id === id);
    
    if (reservationIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Reservation not found"
      });
    }
    
    // Güncelleme
    const updatedReservation = {
      ...reservations[reservationIndex],
      ...req.body,
      id, // ID değişmemeli
      updatedAt: new Date().toISOString()
    };
    
    reservations[reservationIndex] = updatedReservation;
    
    res.json({
      success: true,
      message: "Reservation updated successfully",
      data: updatedReservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update reservation",
      message: error.message
    });
  }
});

// DELETE /api/reservations/:id - Rezervasyonu sil
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const reservationIndex = reservations.findIndex(r => r.id === id);
    
    if (reservationIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Reservation not found"
      });
    }
    
    const deletedReservation = reservations.splice(reservationIndex, 1)[0];
    
    res.json({
      success: true,
      message: "Reservation deleted successfully",
      data: deletedReservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete reservation",
      message: error.message
    });
  }
});

// DELETE /api/reservations - Tüm rezervasyonları sil (admin)
router.delete("/", (req, res) => {
  try {
    const deletedCount = reservations.length;
    reservations = [];
    
    res.json({
      success: true,
      message: `${deletedCount} reservations deleted successfully`,
      deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete all reservations",
      message: error.message
    });
  }
});

export default router;
