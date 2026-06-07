export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

export interface UploadFile {
  uid: number
  name: string
  size?: number
  status: UploadStatus
  percentage?: number
  raw?: File
  url?: string
}

export interface UploadProps {
  modelValue?: UploadFile[]
  accept?: string
  multiple?: boolean
  disabled?: boolean
  drag?: boolean
  limit?: number
  autoUpload?: boolean
  action?: string
  showFileList?: boolean
}

export interface UploadEmits {
  'update:modelValue': [files: UploadFile[]]
  change: [file: UploadFile, files: UploadFile[]]
  exceed: [files: File[]]
  remove: [file: UploadFile]
}
