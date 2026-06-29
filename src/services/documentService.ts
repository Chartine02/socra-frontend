import type { AxiosProgressEvent } from 'axios'
import { api, unwrap } from './api'
import type { Document, DocumentUploadResponse } from '../types/document.types'

export const documentService = {
  async fetchDocuments(): Promise<Document[]> {
    const response = await api.get('/documents')
    return unwrap<Document[]>(response)
  },

  async fetchDocument(documentId: string): Promise<Document> {
    const response = await api.get(`/documents/${documentId}`)
    return unwrap<Document>(response)
  },

  async uploadDocument(
    file: File,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
  ): Promise<DocumentUploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await api.post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })

    return unwrap<DocumentUploadResponse>(response)
  },

  async deleteDocument(documentId: string): Promise<void> {
    await api.delete(`/documents/${documentId}`)
  },
}