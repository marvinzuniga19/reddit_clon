import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../stores/posts'

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear: vi.fn(() => { store = {} })
  }
})()

vi.stubGlobal('localStorage', localStorageMock)

describe('Posts Store', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  it('loads mock posts when localStorage is empty', () => {
    const store = usePostsStore()
    expect(store.posts.length).toBeGreaterThan(0)
  })

  it('addPost creates a post with UUID id', () => {
    const store = usePostsStore()
    const initialCount = store.posts.length
    store.addPost({ title: 'Test', content: 'Content', author: 'user', category: 'vuejs' })
    expect(store.posts.length).toBe(initialCount + 1)
    expect(store.posts[0].id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    )
    expect(store.posts[0].title).toBe('Test')
    expect(store.posts[0].upvotes).toBe(0)
    expect(store.posts[0].comments).toEqual([])
  })

  it('addComment creates a comment with UUID id', () => {
    const store = usePostsStore()
    store.addPost({ title: 'Test', content: 'Content', author: 'user', category: 'vuejs' })
    const postId = store.posts[0].id
    store.addComment(postId, { author: ' commenter', text: 'Nice!' })
    expect(store.posts[0].comments.length).toBe(1)
    expect(store.posts[0].comments[0].id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    )
  })

  it('upvote and downvote toggle correctly', () => {
    const store = usePostsStore()
    store.addPost({ title: 'T', content: 'C', author: 'u', category: 'vuejs' })
    const id = store.posts[0].id

    expect(store.posts[0].upvotes).toBe(0)

    store.upvotePost(id)
    expect(store.posts[0].upvotes).toBe(1)
    expect(store.getPostVote(id)).toBe('up')

    store.upvotePost(id)
    expect(store.posts[0].upvotes).toBe(0)
    expect(store.getPostVote(id)).toBeNull()

    store.downvotePost(id)
    expect(store.posts[0].upvotes).toBe(0)
    expect(store.getPostVote(id)).toBeNull()
  })

  it('deletePost removes the post', () => {
    const store = usePostsStore()
    store.addPost({ title: 'T', content: 'C', author: 'u', category: 'vuejs' })
    const id = store.posts[0].id
    store.deletePost(id)
    expect(store.posts.find(p => p.id === id)).toBeUndefined()
  })

  it('postsByCategory filters correctly', () => {
    const store = usePostsStore()
    const initialAll = store.posts.length
    const initialVuejs = store.postsByCategory('vuejs').length
    store.addPost({ title: 'A', content: 'C', author: 'u', category: 'vuejs' })
    store.addPost({ title: 'B', content: 'C', author: 'u', category: 'javascript' })
    expect(store.postsByCategory('vuejs').length).toBe(initialVuejs + 1)
    expect(store.postsByCategory('todas').length).toBe(initialAll + 2)
  })
})
