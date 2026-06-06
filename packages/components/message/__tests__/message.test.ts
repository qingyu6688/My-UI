import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { Message } from '..'

describe('Message', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    Message.closeAll()
    vi.runAllTimers()
    vi.useRealTimers()
    document.querySelectorAll('.my-message-wrapper').forEach((node) => node.remove())
  })

  it('调用后挂载消息到 body', async () => {
    Message.success('保存成功')
    await Promise.resolve()
    const el = document.querySelector('.my-message')
    expect(el?.textContent).toContain('保存成功')
    expect(el?.classList.contains('my-message--success')).toBe(true)
  })

  it('字符串与配置对象两种入参', async () => {
    Message('普通')
    Message({ message: '警告', type: 'warning' })
    await Promise.resolve()
    const items = document.querySelectorAll('.my-message')
    expect(items.length).toBe(2)
  })

  it('grouping 合并相同消息并显示计数', async () => {
    Message({ message: '重复', grouping: true })
    Message({ message: '重复', grouping: true })
    Message({ message: '重复', grouping: true })
    await Promise.resolve()
    const items = document.querySelectorAll('.my-message')
    expect(items.length).toBe(1)
    expect(document.querySelector('.my-message__badge')?.textContent).toBe('3')
  })

  it('duration 到时后自动触发关闭', async () => {
    const onClose = vi.fn()
    Message({ message: '短暂', duration: 1000, onClose })
    await Promise.resolve()
    expect(document.querySelectorAll('.my-message').length).toBe(1)

    // 推进到自动关闭时间点 + 离场过渡
    vi.advanceTimersByTime(1000)
    await Promise.resolve()
    vi.runAllTimers()
    await Promise.resolve()

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('duration 为 0 时不自动关闭', async () => {
    Message({ message: '常驻', duration: 0 })
    await Promise.resolve()
    vi.advanceTimersByTime(10000)
    await Promise.resolve()
    expect(document.querySelectorAll('.my-message').length).toBe(1)
  })
})
