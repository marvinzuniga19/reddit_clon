import { defineStore } from 'pinia'
import { posts as mockPosts, categories as mockCategories } from '../data/mock'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: JSON.parse(localStorage.getItem('posts')) || mockPosts,
    categories: mockCategories,
    sortBy: 'top',
    userVotes: JSON.parse(localStorage.getItem('userVotes')) || {}
  }),

  getters: {
    getPostById: (state) => (id) => {
      return state.posts.find(p => String(p.id) === String(id))
    },
    getPostVote: (state) => (id) => {
      return state.userVotes[`post_${id}`] || null
    },
    getCommentVote: (state) => (id) => {
      return state.userVotes[`comment_${id}`] || null
    },
    postsByCategory: (state) => (category) => {
      if (!category || category === 'todas') return state.posts
      return state.posts.filter(p => p.category === category)
    }
  },

  actions: {
    setSortBy(sort) {
      this.sortBy = sort
    },
    addPost(post) {
      post.id = crypto.randomUUID()
      post.upvotes = 0
      post.comments = []
      post.createdAt = new Date().toISOString()
      this.posts.unshift(post)
      this.saveToLocal()
    },
    updatePost(postId, updates) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        Object.assign(post, updates)
        this.saveToLocal()
      }
    },
    deletePost(postId) {
      this.posts = this.posts.filter(p => p.id !== postId)
      this.saveToLocal()
    },
    upvotePost(postId) {
      const post = this.posts.find(p => p.id === postId)
      if (!post) return
      const key = `post_${postId}`
      const current = this.userVotes[key]
      if (current === 'up') {
        post.upvotes--
        delete this.userVotes[key]
      } else {
        if (current === 'down') post.upvotes++
        post.upvotes++
        this.userVotes[key] = 'up'
      }
      this.saveVotes()
      this.saveToLocal()
    },
    downvotePost(postId) {
      const post = this.posts.find(p => p.id === postId)
      if (!post) return
      const key = `post_${postId}`
      const current = this.userVotes[key]
      if (current === 'down') {
        post.upvotes++
        delete this.userVotes[key]
      } else {
        if (current === 'up') post.upvotes--
        if (post.upvotes > 0) {
          post.upvotes--
          this.userVotes[key] = 'down'
        } else {
          delete this.userVotes[key]
        }
      }
      this.saveVotes()
      this.saveToLocal()
    },
    addComment(postId, comment) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        comment.id = crypto.randomUUID()
        comment.upvotes = 0
        comment.comments = []
        comment.createdAt = new Date().toISOString()
        post.comments.push(comment)
        this.saveToLocal()
      }
    },
    upvoteComment(postId, commentId) {
      const post = this.posts.find(p => p.id === postId)
      if (!post) return
      const comment = this._findComment(post.comments, commentId)
      if (!comment) return
      const key = `comment_${commentId}`
      const current = this.userVotes[key]
      if (current === 'up') {
        comment.upvotes--
        delete this.userVotes[key]
      } else {
        if (current === 'down') comment.upvotes++
        comment.upvotes++
        this.userVotes[key] = 'up'
      }
      this.saveVotes()
      this.saveToLocal()
    },
    downvoteComment(postId, commentId) {
      const post = this.posts.find(p => p.id === postId)
      if (!post) return
      const comment = this._findComment(post.comments, commentId)
      if (!comment) return
      const key = `comment_${commentId}`
      const current = this.userVotes[key]
      if (current === 'down') {
        comment.upvotes++
        delete this.userVotes[key]
      } else {
        if (current === 'up') comment.upvotes--
        if (comment.upvotes > 0) {
          comment.upvotes--
          this.userVotes[key] = 'down'
        } else {
          delete this.userVotes[key]
        }
      }
      this.saveVotes()
      this.saveToLocal()
    },
    addReply(postId, parentId, reply) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        reply.id = crypto.randomUUID()
        reply.upvotes = 0
        reply.comments = []
        reply.createdAt = new Date().toISOString()
        const parent = this._findComment(post.comments, parentId)
        if (parent) {
          parent.comments.push(reply)
          this.saveToLocal()
        }
      }
    },
    _findComment(comments, id) {
      for (const c of comments) {
        if (c.id === id) return c
        if (c.comments) {
          const found = this._findComment(c.comments, id)
          if (found) return found
        }
      }
      return null
    },
    saveVotes() {
      try {
        localStorage.setItem('userVotes', JSON.stringify(this.userVotes))
      } catch (e) {
        console.warn('No se pudo guardar en localStorage:', e)
      }
    },
    saveToLocal() {
      try {
        localStorage.setItem('posts', JSON.stringify(this.posts))
      } catch (e) {
        console.warn('No se pudo guardar en localStorage:', e)
      }
    }
  }
})
