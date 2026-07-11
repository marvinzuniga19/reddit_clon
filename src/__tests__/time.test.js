import { describe, it, expect, vi, afterEach } from 'vitest'
import { timeAgo } from '../utils/time'

describe('timeAgo', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns empty string for invalid date', () => {
    expect(timeAgo('not-a-date')).toBe('')
  })

  it('returns "justo ahora" for future dates', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T12:00:00Z'))
    expect(timeAgo('2026-01-01T12:05:00Z')).toBe('justo ahora')
  })

  it('returns "hace unos segundos" for < 60s', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T12:00:00Z'))
    expect(timeAgo('2026-01-01T11:59:30Z')).toBe('hace unos segundos')
  })

  it('returns minutes', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T12:00:00Z'))
    expect(timeAgo('2026-01-01T11:55:00Z')).toBe('hace 5 min')
  })

  it('returns hours', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T12:00:00Z'))
    expect(timeAgo('2026-01-01T09:00:00Z')).toBe('hace 3 h')
  })

  it('returns days', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-10T12:00:00Z'))
    expect(timeAgo('2026-01-05T12:00:00Z')).toBe('hace 5 d')
  })

  it('returns months', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-01T12:00:00Z'))
    expect(timeAgo('2026-03-01T12:00:00Z')).toBe('hace 3 meses')
  })

  it('returns singular "mes"', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-01T12:00:00Z'))
    expect(timeAgo('2026-03-01T12:00:00Z')).toBe('hace 1 mes')
  })

  it('returns years', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2028-01-01T12:00:00Z'))
    expect(timeAgo('2026-01-01T12:00:00Z')).toBe('hace 2 años')
  })

  it('returns singular "año"', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2027-01-01T12:00:00Z'))
    expect(timeAgo('2026-01-01T12:00:00Z')).toBe('hace 1 año')
  })
})
