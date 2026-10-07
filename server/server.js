const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Allows all origins. Adjust in production!
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hospitals', require('./routes/hospitalRoutes'));
app.use('/api/hospitals/:id/queue', require('./routes/queueRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/pharmacies', require('./routes/pharmacyRoutes'));
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Basic Route
app.get('/', (req, res) => {
  res.send('CareConnect API is running...');
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Attach Socket.IO to req to use in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
