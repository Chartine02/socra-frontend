import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchQuizResults, fetchAssignmentResults, triggerAnalysis } from '../services/canvasPerformanceService'
import { getCanvasTokenStatus } from '../services/canvasService'

export function useCanvasTokenStatus() {
  return useQuery({
    queryKey: ['canvas-token-status'],
    queryFn: getCanvasTokenStatus,
  })
}

export function useQuizResults() {
  return useQuery({
    queryKey: ['canvas-quiz-results'],
    queryFn: () => fetchQuizResults(),
  })
}

export function useAssignmentResults() {
  return useQuery({
    queryKey: ['canvas-assignment-results'],
    queryFn: () => fetchAssignmentResults(),
  })
}

export function useCanvasAnalysis() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: triggerAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canvas-quiz-results'] })
      queryClient.invalidateQueries({ queryKey: ['canvas-assignment-results'] })
    },
  })
}
