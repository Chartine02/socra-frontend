import { useQuery } from '@tanstack/react-query'
import { analyticsService } from '../services/analyticsService'

export function useKnowledgeGap(documentId: string) {
  return useQuery({
    queryKey: ['knowledge-gap', documentId],
    queryFn: () => analyticsService.fetchGapMap(documentId),
    enabled: Boolean(documentId),
  })
}