import type { App, Component, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T extends Component & { name?: string }>(component: T): SFCWithInstall<T> {
  const installable = component as SFCWithInstall<T>

  installable.install = (app: App) => {
    if (component.name) {
      app.component(component.name, component)
    }
  }

  return installable
}

