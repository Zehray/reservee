import express from "express";
import cors from "cors";
import reservationRouter from "./routes/reservationRoutes.js";
import restaurantRouter from "./routes/restaurantRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://your-frontend-domain.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/reservations", reservationRouter);
app.use("/api/restaurants", restaurantRouter);

// Root endpoint - Welcome page
app.get("/", (req, res) => {
  res.json({
    message: "🎉 Welcome to ReserVee API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      reservations: "/api/reservations",
      restaurants: "/api/restaurants",
    },
    documentation: "See BACKEND-SETUP.md for API documentation",
    frontend: "http://localhost:5173",
  });
});

// API info endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "🚀 ReserVee API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "GET /api/health",
      restaurants: {
        getAll: "GET /api/restaurants",
        getById: "GET /api/restaurants/:id",
        locations: "GET /api/restaurants/meta/locations",
        cuisines: "GET /api/restaurants/meta/cuisines",
      },
      reservations: {
        getAll: "GET /api/reservations",
        getById: "GET /api/reservations/:id",
        create: "POST /api/reservations",
        update: "PUT /api/reservations/:id",
        delete: "DELETE /api/reservations/:id",
        deleteAll: "DELETE /api/reservations",
      },
    },
    documentation: "See BACKEND-SETUP.md for detailed API documentation",
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "ReserVee API is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 ReserVee API Server running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📅 Reservations: http://localhost:${PORT}/api/reservations`);
  console.log(`🏪 Restaurants: http://localhost:${PORT}/api/restaurants`);
});
