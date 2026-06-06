export const resultStatuses = ['success', 'warning', 'danger', 'info'] as const

export type ResultStatus = (typeof resultStatuses)[number]

export interface ResultProps {
  status?: ResultStatus
  title?: string
  subTitle?: string
}
