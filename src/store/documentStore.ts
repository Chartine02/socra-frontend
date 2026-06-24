import { create } from 'zustand'
import type { Document } from '../types/document.types'

export interface DocumentState {
  documents: Document[]
  selectedDocument: Document | null
  isUploading: boolean
  uploadProgress: number
  setDocuments: (docs: Document[]) => void
  addDocument: (doc: Document) => void
  setSelectedDocument: (doc: Document) => void
  setUploadProgress: (progress: number) => void
}

export const useDocumentStore = create<DocumentState>()((set) => ({
  documents: [],
  selectedDocument: null,
  isUploading: false,
  uploadProgress: 0,
  setDocuments: (documents) => set({ documents }),
  addDocument: (doc) =>
    set((state) => ({
      documents: [doc, ...state.documents],
      selectedDocument: doc,
      isUploading: false,
      uploadProgress: 100,
    })),
  setSelectedDocument: (doc) => set({ selectedDocument: doc }),
  setUploadProgress: (progress) =>
    set({
      uploadProgress: progress,
      isUploading: progress > 0 && progress < 100,
    }),
}))