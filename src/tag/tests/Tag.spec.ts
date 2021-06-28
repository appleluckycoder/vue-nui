import { mount } from '@vue/test-utils'
import { NTag } from '../index'

describe('n-tag', () => {
  it('should work with import on demand', () => {
    mount(NTag)
  })

  it('should work with bordered prop', () => {
    const wrapper = mount(NTag, {
      props: {
        bordered: true
      }
    })

    expect(wrapper.find('.n-tag__border').exists()).toBe(true)
  })

  it('should be clickable', () => {
    const onClick = jest.fn()
    const wrapper = mount(NTag, {
      props: {
        onClick
      }
    })

    wrapper.trigger('click')
    expect(onClick).toBeCalled()
  })

  it('should be checkable', async () => {
    const wrapper = mount(NTag, {
      props: {
        checkable: true
      }
    })

    await wrapper.setProps({ checked: true })
    expect(wrapper.find('.n-tag').classes()).toContain('n-tag--checkable')

    await wrapper.setProps({ checked: false })
    expect(wrapper.find('.n-tag').classes()).not.toContain('n-tag--checked')
  })

  it('should work with on-update:checked', () => {
    const onChecked = jest.fn()
    const wrapper = mount(NTag, {
      props: {
        checkable: true,
        'onUpdate:checked': onChecked
      }
    })

    wrapper.trigger('click')
    expect(onChecked).toBeCalled()
  })

  it('should work with closable prop', () => {
    const onClose = jest.fn()
    const wrapper = mount(NTag, {
      props: {
        closable: true,
        onClose
      }
    })

    expect(wrapper.find('.n-tag__close').exists()).toBe(true)
    wrapper.find('.n-tag__close').trigger('click')
    expect(onClose).toBeCalled()
  })

  it('should work with disabled prop', async () => {
    const onClose = jest.fn()
    const wrapper = mount(NTag, {
      props: {
        disabled: true,
        closable: true,
        onClose
      }
    })

    expect(wrapper.find('.n-tag').classes()).toContain('n-tag--disabled')
    wrapper.find('.n-tag__close').trigger('click')
    expect(onClose).not.toBeCalled()
  })

  it('should work with round prop', () => {
    const wrapper = mount(NTag, {
      props: {
        round: true
      }
    })

    expect(wrapper.find('.n-tag').classes()).toContain('n-tag--round')
  })

  it('should work with size prop', () => {
    const wrapper = mount(NTag)

    wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()

    wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()

    wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()
  })

  it('should work with type prop', () => {
    const wrapper = mount(NTag)

    wrapper.setProps({ type: 'default' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()

    wrapper.setProps({ type: 'info' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()

    wrapper.setProps({ type: 'success' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()

    wrapper.setProps({ type: 'warning' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()

    wrapper.setProps({ type: 'error' })
    expect(wrapper.find('.n-tag').attributes('style')).toMatchSnapshot()
  })

  it('should work with default slot', () => {
    const wrapper = mount(NTag, {
      slots: {
        default: () => 'default'
      }
    })

    expect(wrapper.find('.n-tag__content').exists()).toBe(true)
    expect(wrapper.find('.n-tag__content').element.textContent).toBe('default')
    expect(wrapper.find('.n-tag__content').html()).toMatchSnapshot()
  })
})
