import type { InjectionKey } from 'vue'
import type { PopperPlacement } from '../../../hooks/use-popper'

export const dropdownTriggers = ['hover', 'click'] as const

export type DropdownTrigger = (typeof dropdownTriggers)[number]
export type DropdownCommand = string | number

export interface DropdownContext {
  handleCommand: (command: DropdownCommand, disabled: boolean) => void
}

export const dropdownKey: InjectionKey<DropdownContext> = Symbol('MyDropdown')

export interface DropdownProps {
  trigger?: DropdownTrigger
  placement?: PopperPlacement
  disabled?: boolean
  hideOnClick?: boolean
}

export interface DropdownEmits {
  command: [command: DropdownCommand]
  visibleChange: [visible: boolean]
}

export interface DropdownItemProps {
  command?: DropdownCommand
  disabled?: boolean
  divided?: boolean
}
