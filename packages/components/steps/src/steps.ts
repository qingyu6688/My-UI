import type { ComputedRef, InjectionKey, Ref } from 'vue'

export const stepsDirections = ['horizontal', 'vertical'] as const
export const stepStatuses = ['wait', 'process', 'finish', 'error'] as const

export type StepsDirection = (typeof stepsDirections)[number]
export type StepStatus = (typeof stepStatuses)[number]

export interface StepsContext {
  active: Ref<number>
  direction: Ref<StepsDirection>
  registerStep: (uid: number) => number
  unregisterStep: (uid: number) => void
  total: ComputedRef<number>
}

export const stepsKey: InjectionKey<StepsContext> = Symbol('MySteps')

export interface StepsProps {
  active?: number
  direction?: StepsDirection
}

export interface StepProps {
  title?: string
  description?: string
  status?: StepStatus
}
