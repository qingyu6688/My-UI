import { describe, expect, it } from 'vitest'
import { ruleTriggers, validateRule, validateRules } from '../validator'

describe('validateRule', () => {
  it('required 空值报错', async () => {
    const error = await validateRule('', { required: true })
    expect(error?.message).toBe('该项必填')
  })

  it('required 通过非空', async () => {
    const error = await validateRule('x', { required: true })
    expect(error).toBeNull()
  })

  it('email 类型校验', async () => {
    const bad = await validateRule('abc', { type: 'email' })
    const good = await validateRule('a@b.com', { type: 'email' })
    expect(bad?.message).toBe('邮箱格式不正确')
    expect(good).toBeNull()
  })

  it('min/max 校验字符串长度', async () => {
    const tooShort = await validateRule('ab', { min: 3 })
    const okay = await validateRule('abc', { min: 3, max: 5 })
    const tooLong = await validateRule('abcdef', { max: 5 })
    expect(tooShort?.message).toContain('不能小于')
    expect(okay).toBeNull()
    expect(tooLong?.message).toContain('不能大于')
  })

  it('自定义 validator 返回字符串作为错误信息', async () => {
    const error = await validateRule('xxx', {
      validator: () => '账号已存在',
    })
    expect(error?.message).toBe('账号已存在')
  })

  it('异步 validator 解析为 false 时报错', async () => {
    const error = await validateRule('a', {
      validator: () => Promise.resolve(false),
      message: '远程校验失败',
    })
    expect(error?.message).toBe('远程校验失败')
  })

  it('空值且非 required 时跳过其它规则', async () => {
    const error = await validateRule('', { type: 'email' })
    expect(error).toBeNull()
  })
})

describe('validateRules', () => {
  it('返回首个失败的规则', async () => {
    const error = await validateRules('', [
      { required: true, message: '必填' },
      { type: 'email', message: '邮箱不对' },
    ])
    expect(error?.message).toBe('必填')
  })
})

describe('ruleTriggers', () => {
  it('默认触发 change/blur', () => {
    expect(ruleTriggers({})).toEqual(['change', 'blur'])
  })

  it('数组直接返回', () => {
    expect(ruleTriggers({ trigger: ['submit'] })).toEqual(['submit'])
  })

  it('字符串包装成数组', () => {
    expect(ruleTriggers({ trigger: 'blur' })).toEqual(['blur'])
  })
})
