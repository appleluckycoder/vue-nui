import { mount } from '@vue/test-utils'
import { NInputNumber } from '../index'
import { NButton } from '../../button'

describe('n-input-number', () => {
  it('should work with import on demand', () => {
    mount(NInputNumber)
  })

  it('should work with `show-button` prop', async () => {
    const wrapper = mount(NInputNumber)
    expect(wrapper.findComponent(NButton).exists()).toBe(true)

    await wrapper.setProps({ showButton: false })
    expect(wrapper.findComponent(NButton).exists()).toBe(false)
  })

  it('should work with default value', async () => {
    const wrapper = mount(NInputNumber, {
      props: {
        defaultValue: 1
      }
    })
    expect(wrapper.find('input').element.value).toEqual('1')
  })

  it('should not trigger update if value is same', async () => {
    const onUpdateValue = jest.fn()
    const wrapper = mount(NInputNumber, {
      attachTo: document.body,
      props: {
        defaultValue: 1,
        onUpdateValue
      }
    })
    wrapper.find('input').element.value = ''
    await wrapper.find('input').trigger('input')
    expect(onUpdateValue).toHaveBeenCalledWith(null)
    wrapper.unmount()
  })

  it('trigger focus & blur event', () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const wrapper = mount(NInputNumber, {
      attachTo: document.body,
      props: {
        onFocus,
        onBlur
      }
    })
    wrapper.find('input').element.focus()
    expect(onFocus).toHaveBeenCalledTimes(1)
    wrapper.find('input').element.blur()
    expect(onBlur).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
