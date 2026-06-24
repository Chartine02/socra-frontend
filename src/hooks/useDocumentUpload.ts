import { useMutation, useQueryClient } from '@tanstack/react-query'
import { documentService } from '../services/documentService'
import { useDocumentStore } from '../store/documentStore'

export function useDocumentUpload() {
  const queryClient = useQueryClient()
  const addDocument = useDocumentStore((state) => state.addDocument)
  const setUploadProgress = useDocumentStore((state) => state.setUploadProgress)

  return useMutation({
    mutationFn: async (file: File) =>
      documentService.uploadDocument(file, (event) => {
        const total = event.total ?? file.size
        const progress = total > 0 ? Math.round(((event.loaded ?? 0) / total) * 100) : 0
        setUploadProgress(progress)
      }),
    onSuccess: (response) => {
      addDocument(response.document)
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
    onError: () => {
      setUploadProgress(0)
    },
  })
}