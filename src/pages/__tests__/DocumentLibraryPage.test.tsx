import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import DocumentLibraryPage from '../DocumentLibraryPage'
import { renderWithProviders } from '../../test/test-utils'
import { useAuthStore } from '../../store/authStore'
import { useDocumentStore } from '../../store/documentStore'
import { mockUser } from '../../test/mocks'

vi.mock('../../services/documentService', () => ({
  documentService: {
    fetchDocuments: vi.fn().mockResolvedValue([
      {
        id: 'doc-1',
        fileName: 'algorithms.pdf',
        overallMastery: 65,
        knowledgeUnits: [{ id: 'ku-1' }],
        uploadedAt: '2026-07-10',
        processingStatus: 'READY',
        summary: 'Algorithm notes',
      },
    ]),
  },
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

vi.mock('../../hooks/useKnowledgeGap', () => ({
  useStreak: () => ({ data: { currentStreak: 3 } }),
}))

describe('DocumentLibraryPage', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: mockUser,
      isAuthenticated: true,
      token: 'jwt-123',
      isLoading: false,
    })
    useDocumentStore.setState({
      documents: [],
      uploadingDocs: [],
      uploadProgress: 0,
      isUploading: false,
    })
  })

  it('renders page heading', () => {
    renderWithProviders(<DocumentLibraryPage />, { route: '/documents' })
    expect(screen.getByText('Knowledge Repository')).toBeInTheDocument()
  })

  it('renders upload button', () => {
    renderWithProviders(<DocumentLibraryPage />, { route: '/documents' })
    expect(screen.getByText(/upload/i)).toBeInTheDocument()
  })

  it('renders Canvas import button', () => {
    renderWithProviders(<DocumentLibraryPage />, { route: '/documents' })
    expect(screen.getByText(/import from canvas/i)).toBeInTheDocument()
  })

  it('renders subtitle text', () => {
    renderWithProviders(<DocumentLibraryPage />, { route: '/documents' })
    expect(screen.getByText(/manage your academic sources/i)).toBeInTheDocument()
  })
})
