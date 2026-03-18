const express = require('express');
const router = express.Router();

// In-memory store (for demo purposes)
let users = [];
let nextId = 1;

router.get('/', (req, res) => {
  const rawPage = req.query.page !== undefined ? req.query.page : '1';
  const rawLimit = req.query.limit !== undefined ? req.query.limit : '10';

  const page = Number(rawPage);
  const limit = Number(rawLimit);

  if (
    !Number.isInteger(page) || page < 1 ||
    !Number.isInteger(limit) || limit < 1 || limit > 100
  ) {
    return res.status(400).json({ error: 'Invalid pagination parameters' });
  }

  const total = users.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const slice = users.slice(start, start + limit);
  const data = slice.map(u => ({ id: u.id, name: u.name, email: u.email }));

  res.json({
    data,
    pagination: { page, limit, total, totalPages },
  });
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
