import type { AxiosProgressEvent } from 'axios'
import { api } from './api'
import type { Document, DocumentUploadResponse } from '../types/document.types'

export const documentService = {
  async fetchDocuments(): Promise<Document[]> {
    const { data } = await api.get<Document[]>('/documents')
    return data
  },

  async uploadDocument(
    file: File,
    onUploadProgress?: (event: AxiosProgressEvent) => void,
  ): Promise<DocumentUploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const { data } = await api.post<DocumentUploadResponse>('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })

    return data
  },

  async deleteDocument(documentId: string): Promise<void> {
    await api.delete(`/documents/${documentId}`)
  },
}