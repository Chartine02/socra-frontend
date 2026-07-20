import { describe, it, expect, vi, beforeEach } from 'vitest'
import { api } from '../api'
import {
  connectCanvasToken,
  getCanvasTokenStatus,
  disconnectCanvas,
  fetchCanvasCourses,
  fetchCanvasModules,
  triggerSync,
  getSyncStatus,
} from '../canvasService'

vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
  unwrap: vi.fn((response) => response.data.data),
}))

describe('canvasService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('connectCanvasToken posts token', async () => {
    vi.mocked(api.post).mockResolvedValue({ data: { success: true } })

    await connectCanvasToken('canvas-token-abc')

    expect(api.post).toHaveBeenCalledWith('/canvas/token', { accessToken: 'canvas-token-abc' })
  })

  it('getCanvasTokenStatus gets connection status', async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: { success: true, data: { connected: true } },
    })

    const result = await getCanvasTokenStatus()

    expect(api.get).toHaveBeenCalledWith('/canvas/token/status')
    expect(result.connected).toBe(true)
  })

  it('disconnectCanvas calls delete', async () => {
    vi.mocked(api.delete).mockResolvedValue({ data: { success: true } })

    await disconnectCanvas()

    expect(api.delete).toHaveBeenCalledWith('/canvas/token')
  })

  it('fetchCanvasCourses returns courses', async () => {
    const courses = [{ id: 1, name: 'CS101', course_code: 'CS' }]
    vi.mocked(api.get).mockResolvedValue({
      data: { success: true, data: { courses } },
    })

    const result = await fetchCanvasCourses()

    expect(api.get).toHaveBeenCalledWith('/canvas/courses')
    expect(result).toEqual(courses)
  })

  it('fetchCanvasModules passes course ID', async () => {
    const modules = [{ id: 1, name: 'Module 1', position: 1, itemsCount: 3 }]
    vi.mocked(api.get).mockResolvedValue({
      data: { success: true, data: { modules } },
    })

    const result = await fetchCanvasModules('course-1')

    expect(api.get).toHaveBeenCalledWith('/canvas/modules', { params: { canvasCourseId: 'course-1' } })
    expect(result).toEqual(modules)
  })

  it('triggerSync sends course and module IDs', async () => {
    const syncResponse = { modules: 2, documents: 2, errors: [] }
    vi.mocked(api.post).mockResolvedValue({
      data: { success: true, data: syncResponse },
    })

    const result = await triggerSync('course-1', ['mod-1', 'mod-2'])

    expect(api.post).toHaveBeenCalledWith('/canvas/sync', {
      canvasCourseId: 'course-1',
      moduleIds: ['mod-1', 'mod-2'],
    })
    expect(result).toEqual(syncResponse)
  })

  it('getSyncStatus returns sync status', async () => {
    const syncStatus = {
      courseName: 'CS101',
      lastSyncedAt: '2026-07-18',
      modules: [],
    }
    vi.mocked(api.get).mockResolvedValue({
      data: { success: true, data: syncStatus },
    })

    const result = await getSyncStatus('course-1')

    expect(api.get).toHaveBeenCalledWith('/canvas/sync/status', { params: { canvasCourseId: 'course-1' } })
    expect(result.courseName).toBe('CS101')
  })
})
