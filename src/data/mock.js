export const categories = [
  'vuejs', 'javascript', 'frontend', 'webdev', 'discusión'
]

export const posts = [
  {
    id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    title: '¿Qué opinan de la Composition API?',
    content: 'Llevo un par de semanas usando la Composition API y me parece mucho más flexible que la Options API. ¿Ustedes qué prefieren?',
    author: 'dev123',
    category: 'vuejs',
    upvotes: 42,
    createdAt: '2025-12-01T10:30:00Z',
    comments: [
      {
        id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
        author: 'user1',
        text: 'Totalmente de acuerdo, es mucho más limpio.',
        upvotes: 12,
        createdAt: '2025-12-01T11:00:00Z',
        comments: [
          {
            id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
            author: 'dev123',
            text: 'Exacto, sobre todo con <script setup> queda mucho más ordenado.',
            upvotes: 5,
            createdAt: '2025-12-01T11:30:00Z',
            comments: []
          }
        ]
      },
      {
        id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80',
        author: 'user2',
        text: 'Al principio cuesta pero después no vuelves atrás.',
        upvotes: 8,
        createdAt: '2025-12-01T12:15:00Z',
        comments: []
      }
    ]
  },
  {
    id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091',
    title: '¿Cómo manejan estados complejos en Vue?',
    content: 'Estoy construyendo una app con muchos formularios y estados compartidos. ¿Recomiendan Pinia, provide/inject, o otra cosa?',
    author: 'ana_dev',
    category: 'javascript',
    upvotes: 28,
    createdAt: '2025-12-02T08:00:00Z',
    comments: [
      {
        id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f809102',
        author: 'dev99',
        text: 'Pinia sin duda, es el estándar hoy en día.',
        upvotes: 15,
        createdAt: '2025-12-02T09:00:00Z',
        comments: []
      }
    ]
  },
  {
    id: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f80910213',
    title: 'VS Code vs WebStorm para Vue',
    content: 'He usado los dos y no me decido. VS Code es más liviano pero WebStorm tiene mejor autocompletado.',
    author: 'coder_x',
    category: 'discusión',
    upvotes: 15,
    createdAt: '2025-12-03T14:00:00Z',
    comments: []
  },
  {
    id: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8091021324',
    title: 'CSS Grid o Flexbox para layouts?',
    content: 'Ultimamente uso Grid para casi todo. ¿Soy el único?',
    author: 'css_fan',
    category: 'frontend',
    upvotes: 33,
    createdAt: '2025-12-04T16:45:00Z',
    comments: []
  }
]
