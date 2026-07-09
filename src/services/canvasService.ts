import { api, unwrap } from './api'

export interface CanvasCourse {
  id: number
  name: string
  course_code: string
}

export interface CanvasModule {
  id: number
  name: string
  position: number
  itemsCount: number
}

export interface SyncResponse {
  modules: number
  documents: number
  errors: string[]
}

export interface SyncStatusModule {
  moduleId: string
  title: string
  documentId: string | null
  synced: boolean
}

export interface SyncStatus {
  courseName: string
  lastSyncedAt: string | null
  modules: SyncStatusModule[]
}

export interface TokenStatus {
  connected: boolean
}

export async function connectCanvasToken(accessToken: string): Promise<void> {
  await api.post('/canvas/token', { accessToken })
}

export async function getCanvasTokenStatus(): Promise<TokenStatus> {
  const res = await api.get('/canvas/token/status')
  return unwrap<TokenStatus>(res)
}

export async function disconnectCanvas(): Promise<void> {
  await api.delete('/canvas/token')
}

export async function fetchCanvasCourses(): Promise<CanvasCourse[]> {
  const res = await api.get('/canvas/courses')
  return unwrap<{ courses: CanvasCourse[] }>(res).courses
}

export async function fetchCanvasModules(canvasCourseId: string): Promise<CanvasModule[]> {
  const res = await api.get('/canvas/modules', { params: { canvasCourseId } })
  return unwrap<{ modules: CanvasModule[] }>(res).modules
}

export async function triggerSync(canvasCourseId: string, moduleIds: string[]): Promise<SyncResponse> {
  const res = await api.post('/canvas/sync', { canvasCourseId, moduleIds })
  return unwrap<SyncResponse>(res)
}

export async function getSyncStatus(canvasCourseId: string): Promise<SyncStatus> {
  const res = await api.get('/canvas/sync/status', { params: { canvasCourseId } })
  return unwrap<SyncStatus>(res)
}
