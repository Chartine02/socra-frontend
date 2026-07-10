import { api, unwrap } from './api'
import type { AnalysisCycleResult, AssignmentResult, QuizResult } from '../types/canvas.types'

export async function fetchQuizResults(canvasCourseId?: string): Promise<QuizResult[]> {
  const res = await api.get('/canvas/quiz-results', {
    params: canvasCourseId ? { canvasCourseId } : undefined,
  })
  return unwrap<{ results: QuizResult[] }>(res).results
}

export async function fetchAssignmentResults(canvasCourseId?: string): Promise<AssignmentResult[]> {
  const res = await api.get('/canvas/assignment-results', {
    params: canvasCourseId ? { canvasCourseId } : undefined,
  })
  return unwrap<{ results: AssignmentResult[] }>(res).results
}

export async function triggerAnalysis(): Promise<AnalysisCycleResult> {
  const res = await api.post('/canvas/analyze')
  return unwrap<AnalysisCycleResult>(res)
}
