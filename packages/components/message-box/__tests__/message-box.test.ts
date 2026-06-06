import { describe, expect, it, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { MessageBox } from '..'

afterEach(() => {
  document.querySelectorAll('.my-message-box__wrapper').forEach((node) => {
    node.closest('div')?.remove()
  })
  document.body.innerHTML = ''
})

async function flush(): Promise<void> {
  await nextTick()
  await Promise.resolve()
}

describe('MessageBox', () => {
  it('alert 渲染标题与消息，确定后 resolve', async () => {
    const promise = MessageBox.alert('内容', '标题')
    await flush()
    expect(document.querySelector('.my-message-box__title')?.textContent).toBe('标题')
    expect(document.querySelector('.my-message-box__message')?.textContent).toBe('内容')

    ;(document.querySelector('.my-message-box__btn.is-primary') as HTMLElement).click()
    const result = await promise
    expect(result.action).toBe('confirm')
  })

  it('confirm 显示取消按钮，取消后 reject', async () => {
    const promise = MessageBox.confirm('确定删除？')
    await flush()
    const buttons = document.querySelectorAll('.my-message-box__btn')
    expect(buttons.length).toBe(2)

    ;(buttons[0] as HTMLElement).click()
    await expect(promise).rejects.toMatchObject({ action: 'cancel' })
  })

  it('prompt 渲染输入框，确定返回输入值', async () => {
    const promise = MessageBox.prompt('请输入名称', '输入')
    await flush()
    const input = document.querySelector('.my-message-box__input input') as HTMLInputElement
    expect(input).toBeTruthy()
    input.value = '小明'
    input.dispatchEvent(new Event('input'))
    await flush()

    ;(document.querySelector('.my-message-box__btn.is-primary') as HTMLElement).click()
    const result = await promise
    expect(result.action).toBe('confirm')
    expect(result.value).toBe('小明')
  })

  it('prompt 校验不通过时不关闭', async () => {
    const promise = MessageBox.prompt('邮箱', '输入', {
      inputPattern: /^\S+@\S+$/,
      inputErrorMessage: '邮箱格式不正确',
    })
    await flush()
    const input = document.querySelector('.my-message-box__input input') as HTMLInputElement
    input.value = 'invalid'
    input.dispatchEvent(new Event('input'))
    await flush()

    ;(document.querySelector('.my-message-box__btn.is-primary') as HTMLElement).click()
    await flush()
    expect(document.querySelector('.my-message-box__error')?.textContent).toBe('邮箱格式不正确')
    // 仍然存在，未关闭
    expect(document.querySelector('.my-message-box')).toBeTruthy()

    promise.catch(() => undefined)
  })

  it('字符串入参等价于 confirm', async () => {
    const promise = MessageBox('提示内容')
    await flush()
    expect(document.querySelectorAll('.my-message-box__btn').length).toBe(2)
    ;(document.querySelector('.my-message-box__btn.is-primary') as HTMLElement).click()
    await expect(promise).resolves.toMatchObject({ action: 'confirm' })
  })
})
