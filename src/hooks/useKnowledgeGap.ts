import { useQuery } from '@tanstack/react-query'
import { analyticsService } from '../services/analyticsService'

export function useKnowledgeGap(documentId?: string) {
  return useQuery({
    queryKey: ['knowledge-gap', documentId ?? 'all'],
    queryFn: () => analyticsService.fetchKnowledgeGap(documentId),
  })
}

export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: () => analyticsService.fetchDashboardSummary(),
  })
}

export function useStreak() {
  return useQuery({
    queryKey: ['streak'],
    queryFn: () => analyticsService.fetchStreak(),
  })
}

export function useSessionHistory() {
  return useQuery({
    queryKey: ['session-history'],
    queryFn: () => analyticsService.fetchSessionHistory(),
  })
}