import { Navigate, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import CanvasSSOPage from '../pages/auth/CanvasSSOPage'
import EmailVerificationPage from '../pages/auth/EmailVerificationPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '../pages/auth/ResetPasswordPage'
import SignInPage from '../pages/auth/SignInPage'
import SignUpPage from '../pages/auth/SignUpPage'
import DashboardPage from '../pages/DashboardPage'
import DocumentDetailPage from '../pages/DocumentDetailPage'
import DocumentLibraryPage from '../pages/DocumentLibraryPage'
import KnowledgeGapPage from '../pages/KnowledgeGapPage'
import LandingPage from '../pages/LandingPage'
import PostSessionPage from '../pages/PostSessionPage'
import SettingsPage from '../pages/SettingsPage'
import StudyNotesPage from '../pages/StudyNotesPage'
import OnboardingLayout from '../pages/onboarding/OnboardingLayout'
import ProfileStep from '../pages/onboarding/ProfileStep'
import StudyModeStep from '../pages/onboarding/StudyModeStep'
import UploadStep from '../pages/onboarding/UploadStep'
import CanvasPerformancePage from '../pages/CanvasPerformancePage'
import FlashcardPage from '../pages/study/FlashcardPage'
import QuizPage from '../pages/study/QuizPage'
import SocraticPage from '../pages/study/SocraticPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/verify-email',
    element: <EmailVerificationPage />,
  },
  {
    path: '/canvas-launch',
    element: <CanvasSSOPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/onboarding',
        element: <OnboardingLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="profile" replace />,
          },
          {
            path: 'profile',
            element: <ProfileStep />,
          },
          {
            path: 'upload',
            element: <UploadStep />,
          },
          {
            path: 'mode',
            element: <StudyModeStep />,
          },
        ],
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/documents',
        element: <DocumentLibraryPage />,
      },
      {
        path: '/documents/:documentId',
        element: <DocumentDetailPage />,
      },
      {
        path: '/documents/:documentId/notes',
        element: <StudyNotesPage />,
      },
      {
        path: '/knowledge-gap',
        element: <KnowledgeGapPage />,
      },
      {
        path: '/performance',
        element: <CanvasPerformancePage />,
      },
      {
        path: '/study/socratic/:documentId',
        element: <SocraticPage />,
      },
      {
        path: '/study/quiz/:documentId',
        element: <QuizPage />,
      },
      {
        path: '/study/flashcard/:documentId',
        element: <FlashcardPage />,
      },
      {
        path: '/session/summary',
        element: <PostSessionPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
])