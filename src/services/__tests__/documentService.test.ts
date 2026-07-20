import { describe, it, expect, vi, beforeEach } from 'vitest'
import { documentService } from '../documentService'
import { api } from '../api'
import { mockDocument } from '../../test/mocks'

vi.mock('../api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
  unwrap: vi.fn((response) => response.data.data),
}))

describe('documentService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchDocuments', () => {
    it('calls GET /documents', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: [mockDocument] },
      })

      const result = await documentService.fetchDocuments()

      expect(api.get).toHaveBeenCalledWith('/documents')
      expect(result).toEqual([mockDocument])
    })
  })

  describe('fetchDocument', () => {
    it('calls GET /documents/:id', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: { success: true, data: mockDocument },
      })

      const result = await documentService.fetchDocument('doc-1')

      expect(api.get).toHaveBeenCalledWith('/documents/doc-1')
      expect(result).toEqual(mockDocument)
    })
  })

  describe('uploadDocument', () => {
    it('calls POST /documents with FormData', async () => {
      const uploadResponse = { id: 'doc-1', fileName: 'test.pdf', fileSize: 1024, mimeType: 'application/pdf', processingStatus: 'PROCESSING' }
      vi.mocked(api.post).mockResolvedValue({
        data: { success: true, data: uploadResponse },
      })

      const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' })
      const onProgress = vi.fn()
      const result = await documentService.uploadDocument(file, onProgress)

      expect(api.post).toHaveBeenCalledWith('/documents', expect.any(FormData), expect.objectContaining({
        headers: { 'Content-Type': 'multipart/form-data' },
      }))
      expect(result).toEqual(uploadResponse)
    })
  })

  describe('deleteDocument', () => {
    it('calls DELETE /documents/:id', async () => {
      vi.mocked(api.delete).mockResolvedValue({ data: { success: true } })

      await documentService.deleteDocument('doc-1')

      expect(api.delete).toHaveBeenCalledWith('/documents/doc-1')
    })
  })
})
