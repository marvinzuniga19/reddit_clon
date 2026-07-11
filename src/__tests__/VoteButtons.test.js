import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VoteButtons from '../components/VoteButtons.vue'

describe('VoteButtons', () => {
  it('renders upvotes count', () => {
    const wrapper = mount(VoteButtons, { props: { upvotes: 10 } })
    expect(wrapper.text()).toContain('10')
  })

  it('emits upvote on click', async () => {
    const wrapper = mount(VoteButtons, { props: { upvotes: 5 } })
    await wrapper.find('.vote-btn.upvote').trigger('click')
    expect(wrapper.emitted('upvote')).toBeTruthy()
  })

  it('emits downvote on click', async () => {
    const wrapper = mount(VoteButtons, { props: { upvotes: 5 } })
    await wrapper.find('.vote-btn.downvote').trigger('click')
    expect(wrapper.emitted('downvote')).toBeTruthy()
  })

  it('applies active class when voted up', () => {
    const wrapper = mount(VoteButtons, { props: { upvotes: 5, voted: 'up' } })
    expect(wrapper.find('.vote-btn.upvote').classes()).toContain('active')
    expect(wrapper.find('.vote-btn.downvote').classes()).not.toContain('active')
  })

  it('applies active class when voted down', () => {
    const wrapper = mount(VoteButtons, { props: { upvotes: 5, voted: 'down' } })
    expect(wrapper.find('.vote-btn.downvote').classes()).toContain('active')
    expect(wrapper.find('.vote-btn.upvote').classes()).not.toContain('active')
  })
})
