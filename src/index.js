const express = require('express');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compas Test App</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      color: #222;
      min-height: 100vh;
      padding: 1.5rem 1rem;
    }

    .container {
      max-width: 720px;
      margin: 0 auto;
    }

    header {
      margin-bottom: 2rem;
      padding-bottom: 1.25rem;
      border-bottom: 2px solid #222;
    }

    header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    header p {
      margin-top: 0.5rem;
      color: #555;
      font-size: 1rem;
      line-height: 1.5;
    }

    h2 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #444;
    }

    .section {
      margin-bottom: 2rem;
    }

    .endpoint-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .endpoint {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 0.75rem 1rem;
      flex-wrap: wrap;
    }

    .method {
      font-family: 'Courier New', monospace;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      min-width: 4.5rem;
      text-align: center;
      flex-shrink: 0;
    }

    .method.get    { background: #d1fae5; color: #065f46; }
    .method.post   { background: #dbeafe; color: #1e40af; }
    .method.put    { background: #fef9c3; color: #854d0e; }
    .method.delete { background: #fee2e2; color: #991b1b; }

    .path {
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      color: #222;
      flex-shrink: 0;
    }

    .desc {
      font-size: 0.875rem;
      color: #666;
    }

    .badge {
      display: inline-block;
      background: #222;
      color: #fff;
      font-size: 0.75rem;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      margin-top: 0.25rem;
    }

    footer {
      margin-top: 3rem;
      padding-top: 1rem;
      border-top: 1px solid #ddd;
      font-size: 0.8rem;
      color: #999;
    }

    @media (min-width: 480px) {
      body { padding: 2.5rem 2rem; }
      header h1 { font-size: 2rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Compas Test App</h1>
      <p>Aplicación Express mínima para probar el flujo de trabajo de agentes de Compas. Expone una API REST de usuarios en memoria.</p>
      <span class="badge">v1.0.0</span>
    </header>

    <section class="section">
      <h2>Endpoints disponibles</h2>
      <ul class="endpoint-list">
        <li class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/health</span>
          <span class="desc">Estado del servidor</span>
        </li>
        <li class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/users</span>
          <span class="desc">Lista todos los usuarios</span>
        </li>
        <li class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/users/:id</span>
          <span class="desc">Obtiene un usuario por ID</span>
        </li>
        <li class="endpoint">
          <span class="method post">POST</span>
          <span class="path">/api/users</span>
          <span class="desc">Crea un nuevo usuario</span>
        </li>
        <li class="endpoint">
          <span class="method put">PUT</span>
          <span class="path">/api/users/:id</span>
          <span class="desc">Actualiza un usuario existente</span>
        </li>
        <li class="endpoint">
          <span class="method delete">DELETE</span>
          <span class="path">/api/users/:id</span>
          <span class="desc">Elimina un usuario</span>
        </li>
      </ul>
    </section>

    <footer>
      Compas Test App &mdash; entorno de pruebas
    </footer>
  </div>
</body>
</html>`);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/users', usersRouter);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
