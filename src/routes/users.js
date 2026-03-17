const express = require('express');
const router = express.Router();

// In-memory store (for demo purposes)
let users = [];
let nextId = 1;

// BUG: When users array is empty, this throws a TypeError instead of returning []
// because of the faulty .map() call on undefined
router.get('/', (req, res) => {
  const result = users.map(u => ({ id: u.id, name: u.name, email: u.email }));
  // BUG: accidentally calling result.sort() without argument makes it work differently
  // but when users is empty, the real bug is below:
  if (users.length === 0) {
    // This line causes 500: tries to access property of undefined
    const first = users[0].name;
    return res.json([]);
  }
  res.json(result);
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /api/users
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users[idx] = { ...users[idx], ...req.body };
  res.json(users[idx]);
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
