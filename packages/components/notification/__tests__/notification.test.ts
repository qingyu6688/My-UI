import { afterEach, describe, expect, it, vi } from 'vitest'
import { Notification } from '..'

describe('Notification', () => {
  afterEach(() => {
    Notification.closeAll()
    document.body.innerHTML = ''
  })

  it('字符串参数显示通知', async () => {
    Notification('简短消息')
    await Promise.resolve()
    const el = document.querySelector('.my-notification')
    expect(el?.textContent).toContain('简短消息')
  })

  it('按 position 创建独立容器', async () => {
    Notification({ message: 'A', position: 'top-right' })
    Notification({ message: 'B', position: 'bottom-left' })
    await Promise.resolve()
    expect(document.querySelector('.my-notification-wrapper--top-right')).toBeTruthy()
    expect(document.querySelector('.my-notification-wrapper--bottom-left')).toBeTruthy()
  })

  it('type 应用样式类', async () => {
    Notification.success('成功')
    await Promise.resolve()
    expect(document.querySelector('.my-notification--success')).toBeTruthy()
  })

  it('duration 到时触发 onClose 回调', async () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    Notification({ message: '会消失', duration: 1000, onClose })
    await Promise.resolve()
    vi.advanceTimersByTime(1000)
    await Promise.resolve()
    vi.runAllTimers()
    await Promise.resolve()
    expect(onClose).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  it('closeAll 同步移除所有实例', async () => {
    Notification({ message: 'A' })
    Notification({ message: 'B' })
    await Promise.resolve()
    expect(document.querySelectorAll('.my-notification').length).toBe(2)
    Notification.closeAll()
    expect(document.querySelectorAll('.my-notification').length).toBe(0)
  })
})
