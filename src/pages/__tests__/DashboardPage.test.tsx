import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import DashboardPage from '../DashboardPage'
import { renderWithProviders } from '../../test/test-utils'
import { useAuthStore } from '../../store/authStore'
import { mockUser } from '../../test/mocks'

// Mock the hooks
vi.mock('../../hooks/useKnowledgeGap', () => ({
  useKnowledgeGap: () => ({
    data: {
      topics: [
        { id: '1', topic: 'Recursion', masteryState: 'forgotten', masteryPercentage: 20 },
        { id: '2', topic: 'Sorting', masteryState: 'shaky', masteryPercentage: 55 },
      ],
    },
    isLoading: false,
  }),
  useDashboardSummary: () => ({
    data: {
      totalDocuments: 5,
      totalTopics: 20,
      masteredTopics: 10,
      shakyTopics: 7,
      forgottenTopics: 3,
      overallMasteryPercent: 70,
      currentStreak: 5,
      totalStudySessionsCount: 15,
    },
  }),
  useStreak: () => ({
    data: { currentStreak: 5, lastStudiedAt: '2026-07-18' },
  }),
}))

vi.mock('../../store/notificationStore', () => ({
  useNotificationStore: vi.fn(() => ({
    notifications: [],
    unreadCount: 0,
    loadNotifications: vi.fn(),
    loadUnreadCount: vi.fn(),
    setDropdownOpen: vi.fn(),
    isDropdownOpen: false,
  })),
}))

describe('DashboardPage', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: mockUser,
      isAuthenticated: true,
      token: 'jwt-123',
      isLoading: false,
    })
  })

  it('renders greeting with user first name', () => {
    renderWithProviders(<DashboardPage />, { route: '/dashboard' })
    expect(screen.getByText(/jane/i)).toBeInTheDocument()
  })

  it('renders topic stats', () => {
    renderWithProviders(<DashboardPage />, { route: '/dashboard' })
    expect(screen.getByText('20')).toBeInTheDocument() // totalTopics
    expect(screen.getByText('70%')).toBeInTheDocument() // masteryPercent
  })

  it('renders quick action links', () => {
    renderWithProviders(<DashboardPage />, { route: '/dashboard' })
    expect(screen.getByText('Upload')).toBeInTheDocument()
    expect(screen.getByText('Socratic')).toBeInTheDocument()
    expect(screen.getByText('Quiz')).toBeInTheDocument()
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
  })

  it('shows topics due for review', () => {
    renderWithProviders(<DashboardPage />, { route: '/dashboard' })
    expect(screen.getByText(/10 topics/i)).toBeInTheDocument() // 7 shaky + 3 forgotten
  })

  it('renders streak value', () => {
    renderWithProviders(<DashboardPage />, { route: '/dashboard' })
    // Streak is displayed somewhere on the page
    const streakElements = screen.getAllByText(/5/)
    expect(streakElements.length).toBeGreaterThan(0)
  })
})
