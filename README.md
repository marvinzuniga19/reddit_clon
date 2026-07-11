# Foro Vue

Foro de discusión sobre Vue.js, JavaScript y desarrollo frontend. Aplicación SPA construida con Vue 3 y Composition API.

## Características

- Crear, editar y eliminar posts
- Comentarios anidados con respuestas recursivas
- Sistema de votos (upvote/downvote) con toggle
- Búsqueda de posts en tiempo real con debounce
- Filtro por categorías y ordenamiento (top/nuevos)
- Modo oscuro/claro con respeto a la preferencia del SO
- Persistencia de datos en localStorage
- Títulos dinámicos por ruta
- Responsive design

## Stack

- **Framework:** Vue 3 (Composition API + `<script setup>`)
- **Build:** Vite 8
- **Router:** Vue Router 4
- **Estado:** Pinia 3
- **Estilos:** CSS plano con variables CSS
- **Testing:** Vitest + @vue/test-utils
- **Linting:** ESLint + Prettier

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build para producción |
| `npm run preview` | Previsualizar build |
| `npm run lint` | Verificar código con ESLint |
| `npm run lint:fix` | Auto-corregir problemas de lint |
| `npm run format` | Formatear código con Prettier |
| `npm run test` | Ejecutar tests |
| `npm run test:watch` | Ejecutar tests en modo watch |

## Estructura del proyecto

```
src/
├── main.js                  # Entry point
├── App.vue                  # Layout root
├── style.css                # Variables CSS, reset, dark mode
├── assets/
│   └── forms.css            # Estilos compartidos de formularios
├── router/
│   └── index.js             # Rutas con lazy-loading
├── stores/
│   ├── posts.js             # Posts, comentarios, votos
│   ├── theme.js             # Dark/light mode
│   └── toast.js             # Notificaciones
├── composables/
│   └── useClickOutside.js   # Composable para clicks externos
├── utils/
│   └── time.js              # Función timeAgo()
├── data/
│   └── mock.js              # Datos iniciales de ejemplo
├── components/
│   ├── Navbar.vue           # Navegación, búsqueda, theme toggle
│   ├── PostCard.vue         # Card de post en listado
│   ├── VoteButtons.vue      # Botones de voto reutilizables
│   ├── CommentThread.vue    # Comentarios recursivos anidados
│   ├── CommentForm.vue      # Formulario de comentarios
│   ├── ConfirmDialog.vue    # Diálogo de confirmación reutilizable
│   └── ToastNotif.vue       # Notificaciones toast
├── views/
│   ├── HomeView.vue         # Listado de posts con filtros
│   ├── PostView.vue         # Detalle de post + comentarios
│   ├── CreatePostView.vue   # Crear nuevo post
│   ├── EditPostView.vue     # Editar post existente
│   └── NotFoundView.vue     # Página 404
└── __tests__/
    ├── time.test.js         # Tests de timeAgo
    ├── posts.test.js        # Tests del store de posts
    └── VoteButtons.test.js  # Tests del componente de votos
```

## Rutas

| Path | Descripción |
|------|-------------|
| `/` | Todos los posts |
| `/r/:category` | Posts por categoría |
| `/post/:id` | Detalle de post + comentarios |
| `/crear` | Crear nuevo post |
| `/editar/:id` | Editar post existente |
| `/*` | Página 404 |

## Persistencia

Los datos se guardan automáticamente en `localStorage`:

- **`posts`** — Posts y comentarios
- **`userVotes`** — Votos del usuario
- **`darkMode`** — Preferencia de tema
