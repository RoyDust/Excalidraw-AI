import { create } from 'zustand'
import { ExcalidrawImportedData } from '@/types/excalidraw'

interface DiagramStore {
  currentDiagram: ExcalidrawImportedData | null
  diagrams: ExcalidrawImportedData[]
  isLoading: boolean
  error: string | null

  // Actions
  setCurrentDiagram: (diagram: ExcalidrawImportedData | null) => void
  addDiagram: (diagram: ExcalidrawImportedData) => void
  updateDiagram: (id: string, diagram: Partial<ExcalidrawImportedData>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useDiagramStore = create<DiagramStore>((set) => ({
  currentDiagram: null,
  diagrams: [],
  isLoading: false,
  error: null,

  setCurrentDiagram: (diagram) => set({ currentDiagram: diagram }),

  addDiagram: (diagram) =>
    set((state) => ({
      diagrams: [...state.diagrams, diagram],
    })),

  updateDiagram: (id, diagramUpdate) =>
    set((state) => ({
      diagrams: state.diagrams.map((d, i) =>
        i.toString() === id ? { ...d, ...diagramUpdate } : d
      ),
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),
}))
