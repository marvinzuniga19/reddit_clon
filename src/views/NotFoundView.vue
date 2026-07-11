<template>
  <div class="not-found-page">
    <div class="not-found-card">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <router-link to="/" class="btn-home">Volver al inicio</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.not-found-card {
  text-align: center;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 48px 32px;
}

.not-found-card h1 {
  font-size: 64px;
  margin: 0;
  color: var(--accent);
}

.not-found-card p {
  font-size: 16px;
  color: var(--text-muted);
  margin: 8px 0 24px;
}

.btn-home {
  display: inline-block;
  background: var(--accent);
  color: white;
  padding: 10px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-home:hover {
  background: var(--accent-hover);
  text-decoration: none;
  color: white;
}
</style>
