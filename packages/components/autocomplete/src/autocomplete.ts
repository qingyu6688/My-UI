export interface AutocompleteItem {
  value: string
  [prop: string]: unknown
}

export interface AutocompleteProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  fetchSuggestions?: (query: string, cb: (items: AutocompleteItem[]) => void) => void
  triggerOnFocus?: boolean
}

export interface AutocompleteEmits {
  'update:modelValue': [value: string]
  select: [item: AutocompleteItem]
  change: [value: string]
}
