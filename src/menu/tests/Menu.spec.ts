import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { sleep } from 'seemly'
import { NMenu } from '../index'

describe('n-menu', () => {
  it('should work with import on demand', () => {
    mount(NMenu)
  })
  it('props.onUpdateValue type', () => {
    const stringCb = (v: string): void => {}
    const numberCb = (v: number): void => {}
    const snCb = (v: string | number): void => {}
    const stringArrCb = (v: string[]): void => {}
    const numberArrCb = (v: number[]): void => {}
    const snArrCb = (v: Array<string | number>): void => {}
    mount(NMenu, {
      props: {
        onUpdateValue: stringCb,
        onUpdateExpandedKeys: stringArrCb
      }
    })
    mount(NMenu, {
      props: {
        onUpdateValue: numberCb,
        onUpdateExpandedKeys: numberArrCb
      }
    })
    mount(NMenu, {
      props: {
        onUpdateValue: snCb,
        onUpdateExpandedKeys: snArrCb
      }
    })
  })
  it('should tooltip work with `render-label` props', async () => {
    const options = [
      {
        label: () =>
          h(
            'a',
            {
              href: 'test1',
              target: '_blank',
              rel: 'test1'
            },
            'test1'
          ),
        key: 'test1'
      },
      {
        label: 'test2',
        key: 'test2'
      }
    ]
    const renderLabel = (option: any): any => {
      if (typeof option.label === 'function') {
        return option.label()
      }
      return h(
        'a',
        {
          href: option.key,
          rel: option.key
        },
        { default: () => option.label }
      )
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options
      }
    })
    expect(wrapper.find('[href="test1"]').exists()).toBe(true)
    expect(wrapper.find('[href="test2"]').exists()).toBe(false)

    await wrapper.setProps({ renderLabel: renderLabel })
    expect(wrapper.find('[href="test1"]').exists()).toBe(true)
    expect(wrapper.find('[target="_blank"]').exists()).toBe(true)
    expect(wrapper.find('[href="test2"]').exists()).toBe(true)
  })
  it('should dropdown work with `render-label` props', async () => {
    const options = [
      {
        label: 'jj',
        key: 'jj'
      },
      {
        label: 'jay',
        key: 'jay',
        children: [
          {
            type: 'group',
            label: 'song-group',
            key: 'group',
            children: [
              {
                label: 'fantasy',
                key: 'fantasy'
              },
              {
                label: 'mojito',
                key: 'mojito'
              }
            ]
          }
        ]
      }
    ]
    const renderLabel = (option: any): any => {
      return h(
        'a',
        {
          class: option.key,
          href: option.key,
          rel: option.key
        },
        { default: () => option.label }
      )
    }
    const wrapper = mount(NMenu, {
      props: {
        options: options,
        collapsed: true,
        renderLabel: renderLabel
      }
    })
    expect(wrapper.find('.n-submenu').exists()).toBe(true)
    await wrapper.find('.n-submenu').trigger('mouseenter')
    // Popover has delay, so we need to wait
    await sleep(150)
    expect(document.body.querySelector('.n-dropdown')).not.toEqual(null)
    expect(document.querySelectorAll('a').length).toEqual(3)
    expect(document.querySelectorAll('a.fantasy').length).toEqual(1)
  })
})
