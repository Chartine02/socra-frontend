import { describe, it, expect, beforeEach } from 'vitest'
import { useDocumentStore } from '../documentStore'
import { mockDocument } from '../../test/mocks'

describe('documentStore', () => {
  beforeEach(() => {
    useDocumentStore.setState({
      documents: [],
      selectedDocument: null,
      isUploading: false,
      uploadProgress: 0,
      uploadingDocs: [],
    })
  })

  it('has correct initial state', () => {
    const state = useDocumentStore.getState()
    expect(state.documents).toEqual([])
    expect(state.selectedDocument).toBeNull()
    expect(state.isUploading).toBe(false)
    expect(state.uploadProgress).toBe(0)
    expect(state.uploadingDocs).toEqual([])
  })

  it('setDocuments replaces the document list', () => {
    useDocumentStore.getState().setDocuments([mockDocument])
    expect(useDocumentStore.getState().documents).toEqual([mockDocument])
  })

  it('addDocument prepends to list and sets selected', () => {
    const secondDoc = { ...mockDocument, id: 'doc-2', fileName: 'second.pdf' }
    useDocumentStore.getState().setDocuments([mockDocument])
    useDocumentStore.getState().addDocument(secondDoc)

    const state = useDocumentStore.getState()
    expect(state.documents[0]).toEqual(secondDoc)
    expect(state.documents).toHaveLength(2)
    expect(state.selectedDocument).toEqual(secondDoc)
    expect(state.isUploading).toBe(false)
    expect(state.uploadProgress).toBe(100)
  })

  it('setSelectedDocument updates selection', () => {
    useDocumentStore.getState().setSelectedDocument(mockDocument)
    expect(useDocumentStore.getState().selectedDocument).toEqual(mockDocument)
  })

  it('setUploadProgress updates progress and uploading state', () => {
    useDocumentStore.getState().setUploadProgress(50)
    const state = useDocumentStore.getState()
    expect(state.uploadProgress).toBe(50)
    expect(state.isUploading).toBe(true)
  })

  it('setUploadProgress at 100 sets isUploading false', () => {
    useDocumentStore.getState().setUploadProgress(100)
    expect(useDocumentStore.getState().isUploading).toBe(false)
  })

  it('setUploadProgress at 0 sets isUploading false', () => {
    useDocumentStore.getState().setUploadProgress(0)
    expect(useDocumentStore.getState().isUploading).toBe(false)
  })

  it('addUploadingDoc and removeUploadingDoc manage temp docs', () => {
    const tempDoc = { tempId: 'temp-1', fileName: 'uploading.pdf' }
    useDocumentStore.getState().addUploadingDoc(tempDoc)

    expect(useDocumentStore.getState().uploadingDocs).toHaveLength(1)
    expect(useDocumentStore.getState().uploadingDocs[0]).toEqual(tempDoc)

    useDocumentStore.getState().removeUploadingDoc('temp-1')
    expect(useDocumentStore.getState().uploadingDocs).toHaveLength(0)
  })
})
