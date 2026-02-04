const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple in-memory data store
let users = [
  { id: 1, name: 'Juan', email: 'juan@example.com' },
  { id: 2, name: 'Maria', email: 'maria@example.com' },
  { id: 3, name: 'Pedro', email: 'pedro@example.com' }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido a la API Simple de Node.js',
    endpoints: {
      users: '/api/users',
      user_by_id: '/api/users/:id',
      health: '/health'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  res.json(user);
});

// Create new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }
  
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  
  res.json(users[userIndex]);
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({ message: 'Usuario eliminado', user: deletedUser });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
