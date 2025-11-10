// Excalidraw数据类型定义
export interface ExcalidrawElement {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  angle: number
  strokeColor: string
  backgroundColor: string
  fillStyle: string
  strokeWidth: number
  strokeStyle: string
  version: number
  versionNonce: number
  isDeleted: boolean
  boundElements?: Record<string, unknown>
  groupIds?: string[]
  frameId?: string | null
  roundness?: {
    type: number
    value?: number
  }
  seed?: number
  lock?: unknown
  link?: unknown
  updated: number
  links?: unknown[]
  url?: string
  status?: string
  fileId?: string
  scale?: number[]
}

export interface ExcalidrawImportedData {
  type: string
  version: number
  source: string
  elements: ExcalidrawElement[]
  appState?: {
    gridSize?: number
    viewBackgroundColor?: string
  }
  files?: Record<string, unknown>
}
