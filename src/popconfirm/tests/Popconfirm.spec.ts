import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NPopconfirm } from '../index'
import { NButton } from '../../button'

describe('n-popconfirm', () => {
  it('should work with import on demand', () => {
    mount(NPopconfirm, {
      slots: {
        trigger: () => 'star kirby'
      }
    })
  })

  it('should work with `negative-text` `positive-text`', async () => {
    const wrapper = mount(NPopconfirm, {
      attachTo: document.body,
      props: {
        'negative-text': 'negative',
        'positive-text': 'positive'
      },
      slots: {
        default: () => 'test-text',
        trigger: () => h(NButton, null, { default: () => 'test-button' })
      }
    })

    await wrapper.find('button').trigger('click')
    expect(document.querySelectorAll('.n-button__content')[1].textContent).toBe(
      'negative'
    )
    expect(document.querySelectorAll('.n-button__content')[2].textContent).toBe(
      'positive'
    )
  })
})
