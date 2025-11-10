import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ExcalidrawImportedData } from '@/types/excalidraw'

// Placeholder API functions - to be implemented later
const fetchDiagrams = async (): Promise<ExcalidrawImportedData[]> => {
  // TODO: Implement API call
  return []
}

const createDiagram = async (diagram: Partial<ExcalidrawImportedData>): Promise<ExcalidrawImportedData> => {
  // TODO: Implement API call
  return {
    type: 'excalidraw',
    version: 1,
    source: 'manual',
    elements: [],
  }
}

const updateDiagram = async (id: string, diagram: Partial<ExcalidrawImportedData>): Promise<ExcalidrawImportedData> => {
  // TODO: Implement API call
  return {
    type: 'excalidraw',
    version: 1,
    source: 'manual',
    elements: [],
  }
}

export const useDiagrams = () => {
  return useQuery({
    queryKey: ['diagrams'],
    queryFn: fetchDiagrams,
  })
}

export const useCreateDiagram = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createDiagram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagrams'] })
    },
  })
}

export const useUpdateDiagram = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, diagram }: { id: string; diagram: Partial<ExcalidrawImportedData> }) =>
      updateDiagram(id, diagram),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagrams'] })
    },
  })
}
