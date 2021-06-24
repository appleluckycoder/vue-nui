import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NButton, NButtonGroup, NxButton } from '../index'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { NIcon } from '../../icon'

describe('n-button', () => {
  it('should work with import on demand', () => {
    mount(NButton)
  })
  it('clickable', async () => {
    const onClick = jest.fn()
    const inst = mount(NButton, {
      props: {
        onClick
      }
    })
    await inst.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })
  it('disabled', async () => {
    const onClick = jest.fn()
    const inst = mount(NButton, {
      props: {
        disabled: true,
        onClick
      }
    })
    await inst.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })
  it('passed native event & attr tsx type checking', () => {
    ;<div>
      <NxButton onMousedown={() => {}} />
      <NxButton formaction="" />
    </div>
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NButton)

    await wrapper.setProps({ type: 'primary' })
    expect(wrapper.find('button').classes()).toContain('n-button--primary-type')

    await wrapper.setProps({ type: 'info' })
    expect(wrapper.find('button').classes()).toContain('n-button--info-type')

    await wrapper.setProps({ type: 'success' })
    expect(wrapper.find('button').classes()).toContain('n-button--success-type')

    await wrapper.setProps({ type: 'warning' })
    expect(wrapper.find('button').classes()).toContain('n-button--warning-type')

    await wrapper.setProps({ type: 'error' })
    expect(wrapper.find('button').classes()).toContain('n-button--error-type')
  })

  it('should work with `dashed` prop', async () => {
    const wrapper = mount(NButton)

    await wrapper.setProps({ dashed: true })
    expect(wrapper.find('button').classes()).toContain('n-button--dashed')
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(NButton)

    await wrapper.setProps({ bordered: false })
    expect(wrapper.find('.n-button__border').exists()).toBe(false)
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NButton)

    await wrapper.setProps({ size: 'tiny' })
    expect(wrapper.find('button').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('button').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('button').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('button').attributes('style')).toMatchSnapshot()
  })

  it('should work with `text` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        text: true
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('button').attributes('style')).toMatchSnapshot()
    expect(wrapper.find('.n-button__content').element.textContent).toBe('test')
  })

  it('should work with `tag` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        text: true,
        tag: 'a',
        href: 'https://www.naiveui.com',
        target: '_blank',
        type: 'primary'
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('a').attributes('style')).toMatchSnapshot()
    expect(wrapper.find('a').classes()).toContain('n-button--primary-type')
    expect(wrapper.find('a').attributes('type')).toContain('button')
    expect(wrapper.find('a').attributes('disabled')).toContain('false')
    expect(wrapper.find('a').attributes('href')).toContain(
      'https://www.naiveui.com'
    )
    expect(wrapper.find('a').attributes('target')).toContain('_blank')
    expect(wrapper.find('.n-button__content').element.textContent).toBe('test')
  })

  it('should work with `icon` slot', async () => {
    const wrapper = mount(NButton, {
      slots: {
        icon: () =>
          h(NIcon, null, {
            default: () => h(CashIcon)
          }),
        default: () => 'test'
      }
    })

    expect(wrapper.find('span').classes('n-button__icon')).toBe(true)
    expect(wrapper.find('div').classes('n-icon-slot')).toBe(true)
    expect(wrapper.find('i').classes('n-icon')).toBe(true)
    expect(wrapper.find('i').classes('n-icon')).toBe(true)
    expect(wrapper.find('.n-button__content').element.textContent).toBe('test')
    expect(wrapper.find('button').element.children[1].textContent).toBe('test')

    await wrapper.setProps({ iconPlacement: 'right' })
    expect(wrapper.find('button').element.children[0].textContent).toBe('test')
  })

  it('should work with `shape` ', async () => {
    const wrapper = mount(NButton, {
      props: {
        circle: true
      },
      slots: {
        icon: () =>
          h(NIcon, null, {
            default: () => h(CashIcon)
          })
      }
    })
    const circleStyle = [
      '--width: 34px;',
      '--padding: initial;',
      '--border-radius: 34px;'
    ]
    let buttonStyle = wrapper.find('button').attributes('style')
    expect(circleStyle.every((i) => buttonStyle.includes(i))).toBe(true)

    await wrapper.setProps({ circle: false, round: true })
    const roundStyle = [
      '--width: initial;',
      '--padding: 0 18px;',
      '--border-radius: 34px;'
    ]
    buttonStyle = wrapper.find('button').attributes('style')
    expect(roundStyle.every((i) => buttonStyle.includes(i))).toBe(true)

    await wrapper.setProps({ circle: false, round: false })
    const defaultStyle = [
      '--width: initial;',
      '--padding: 0 14px;',
      '--border-radius: 3px;'
    ]
    buttonStyle = wrapper.find('button').attributes('style')
    expect(defaultStyle.every((i) => buttonStyle.includes(i))).toBe(true)
  })

  it('should work with `ghost` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        ghost: true
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('button').classes()).toContain('n-button--ghost')
  })

  it('should work with `loading` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        loading: true
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.n-icon-slot').classes()).toContain('n-base-loading')
    expect(wrapper.find('.n-icon-slot').attributes('aria-label')).toContain(
      'loading'
    )
  })

  it('should work with `color` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        color: '#8a2be2'
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('button').classes()).toContain('n-button--color')
    const colorStyle = [
      '--color: #8a2be2;',
      '--color-disabled: #8a2be2;',
      '--ripple-color: #8a2be2;'
    ]
    const buttonStyle = wrapper.find('button').attributes('style')
    expect(colorStyle.every((i) => buttonStyle.includes(i))).toBe(true)
  })

  it('should work with `button group`', async () => {
    const wrapper = mount(NButtonGroup, {
      slots: {
        default: () => [
          h(NButton, null, {
            default: () => 'test1'
          }),
          h(NButton, null, {
            default: () => 'test2'
          }),
          h(NButton, null, {
            default: () => 'test3'
          })
        ]
      }
    })

    expect(wrapper.find('[role="group"]').classes()).toContain('n-button-group')
    expect(wrapper.findAll('button').length).toBe(3)

    await wrapper.setProps({ vertical: true })
    expect(wrapper.find('[role="group"]').classes()).toContain(
      'n-button-group--vertical'
    )
  })
})
