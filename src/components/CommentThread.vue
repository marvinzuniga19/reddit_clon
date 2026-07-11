<script setup>
import { ref, computed } from 'vue'
import { usePostsStore } from '../stores/posts'
import { useToastStore } from '../stores/toast'
import VoteButtons from './VoteButtons.vue'
import CommentForm from './CommentForm.vue'
import { timeAgo } from '../utils/time'

const MAX_DEPTH = 8

const props = defineProps({
  comment: { type: Object, required: true },
  postId: { type: [Number, String], required: true },
  depth: { type: Number, default: 0 }
})

const store = usePostsStore()
const toast = useToastStore()
const showReplyForm = ref(false)

const voted = computed(() => store.getCommentVote(props.comment.id))
const canReply = computed(() => props.depth < MAX_DEPTH)

function submitReply(data) {
  store.addReply(props.postId, props.comment.id, data)
  showReplyForm.value = false
  toast.show('Respuesta agregada')
}
</script>

<template>
  <div class="comment-thread" :style="{ marginLeft: depth > 0 ? '20px' : '0' }">
    <div class="comment" :class="{ nested: depth > 0 }">
      <VoteButtons
        :upvotes="comment.upvotes || 0"
        :voted="voted"
        @upvote="store.upvoteComment(postId, comment.id)"
        @downvote="store.downvoteComment(postId, comment.id)"
      />
      <div class="comment-body">
        <div class="comment-meta">
          <strong>{{ comment.author }}</strong>
          <span class="separator">·</span>
          <span class="time">{{ timeAgo(comment.createdAt) }}</span>
        </div>
        <p class="comment-text">{{ comment.text }}</p>
        <button v-if="canReply" class="reply-btn" @click="showReplyForm = !showReplyForm">
          {{ showReplyForm ? 'Cancelar' : 'Responder' }}
        </button>

        <div v-if="showReplyForm" class="reply-form">
          <CommentForm @submit="submitReply" />
        </div>
      </div>
    </div>

    <div v-if="comment.comments && comment.comments.length > 0" class="replies">
      <CommentThread
        v-for="child in comment.comments"
        :key="child.id"
        :comment="child"
        :post-id="postId"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<style scoped>
.comment-thread {
  border-left: 2px solid var(--border);
  padding-left: 8px;
  margin-bottom: 4px;
}

.comment {
  display: flex;
  gap: 8px;
  padding: 8px 0;
}

.comment.nested {
  padding-top: 4px;
}

.comment-body {
  flex: 1;
  min-width: 0;
}

.comment-meta {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 2px;
}

.separator {
  color: var(--border);
  margin: 0 4px;
}

.comment-text {
  font-size: 14px;
  margin: 2px 0 4px 0;
  color: var(--text);
  line-height: 1.4;
}

.reply-btn {
  background: none;
  border: none;
  font-size: 11px;
  color: var(--accent);
  cursor: pointer;
  padding: 0;
  font-weight: 600;
}

.reply-btn:hover {
  text-decoration: underline;
}

.reply-form {
  margin-top: 8px;
}

.replies {
  margin-top: 2px;
}
</style>
