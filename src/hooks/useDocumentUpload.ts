import { useMutation, useQueryClient } from '@tanstack/react-query'
import { documentService } from '../services/documentService'
import { useDocumentStore } from '../store/documentStore'

export function useDocumentUpload() {
  const queryClient = useQueryClient()
  const setUploadProgress = useDocumentStore((state) => state.setUploadProgress)
  const addUploadingDoc = useDocumentStore((state) => state.addUploadingDoc)
  const removeUploadingDoc = useDocumentStore((state) => state.removeUploadingDoc)

  return useMutation({
    mutationFn: async (file: File) => {
      const tempId = `uploading-${Date.now()}`
      addUploadingDoc({ tempId, fileName: file.name })

      try {
        const result = await documentService.uploadDocument(file, (event) => {
          const total = event.total ?? file.size
          const progress = total > 0 ? Math.round(((event.loaded ?? 0) / total) * 100) : 0
          setUploadProgress(progress)
        })
        removeUploadingDoc(tempId)
        return result
      } catch (error) {
        removeUploadingDoc(tempId)
        throw error
      }
    },
    onSuccess: () => {
      setUploadProgress(100)
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
    onError: () => {
      setUploadProgress(0)
    },
  })
}