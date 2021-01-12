import { h, computed, inject, ref, Transition, defineComponent } from 'vue'
import { VBinder, VTarget, VFollower } from 'vueuc'
import { useMemo } from 'vooks'
import { ChevronRightIcon } from '../../_base/icons'
import { useDeferredTrue } from '../../_utils/composable'
import { render } from '../../_utils'
import { NIcon } from '../../icon'
import { isSubmenuNode } from './utils'
import NDropdownMenu from './DropdownMenu'

export default defineComponent({
  name: 'DropdownOption',
  provide () {
    return {
      NDropdownOption: this
    }
  },
  inject: ['NDropdown', 'NDropdownMenu'],
  props: {
    tmNode: {
      type: Object,
      required: true
    },
    parentKey: {
      type: [String, Number],
      default: null
    },
    placement: {
      type: String,
      default: 'right-start'
    }
  },
  setup (props) {
    const NDropdown = inject('NDropdown')
    const NDropdownOption = inject('NDropdownOption', null)
    const rawNodeRef = computed(() => props.tmNode.rawNode)
    const hasSubmenuRef = computed(() => {
      return isSubmenuNode(props.tmNode.rawNode)
    })
    const showSubmenuRef = computed(() => {
      if (!hasSubmenuRef.value) return false
      const {
        hoverKey,
        keyboardKey,
        lastToggledSubmenuKey,
        pendingKeyPath
      } = NDropdown
      const { key } = props.tmNode
      if (hoverKey !== null) return pendingKeyPath.includes(key)
      if (keyboardKey !== null) {
        return (
          pendingKeyPath.includes(key) &&
          pendingKeyPath[pendingKeyPath.length - 1] !== key
        )
      }
      if (lastToggledSubmenuKey !== null) return pendingKeyPath.includes(key)
      return false
    })
    const shouldDelayRef = computed(() => {
      return NDropdown.keyboardKey === null && NDropdown.animated === false
    })
    const delayedSubmenuRef = useDeferredTrue(
      showSubmenuRef,
      300,
      shouldDelayRef
    )
    const parentEnteringSubmenuRef = computed(() => {
      return !!(NDropdownOption && NDropdownOption.enteringSubmenu)
    })
    return {
      enteringSubmenu: ref(false),
      mergedShowSubmenu: computed(() => {
        return delayedSubmenuRef.value && !parentEnteringSubmenuRef.value
      }),
      rawNode: rawNodeRef,
      hasSubmenu: hasSubmenuRef,
      pending: useMemo(() => {
        const { pendingKeyPath } = NDropdown
        const { key } = props.tmNode
        return pendingKeyPath.includes(key)
      }),
      active: useMemo(() => {
        const { activeKeyPath } = NDropdown
        const { key } = props.tmNode
        return activeKeyPath.includes(key)
      }),
      NDropdownOption
    }
  },
  methods: {
    handleSubmenuBeforeEnter () {
      this.enteringSubmenu = true
    },
    handleSubmenuAfterEnter () {
      this.enteringSubmenu = false
    },
    handleMouseEnter () {
      const { NDropdown, parentKey, tmNode } = this
      if (!NDropdown.mergedShow) return
      NDropdown.lastToggledSubmenuKey = parentKey
      NDropdown.keyboardKey = null
      NDropdown.hoverKey = tmNode.key
    },
    handleMouseMove (e) {
      const { NDropdown, tmNode } = this
      if (!NDropdown.mergedShow) return
      if (NDropdown.hoverKey === tmNode.key) return
      this.handleMouseEnter(e)
    },
    handleMouseLeave (e) {
      const { NDropdown } = this
      if (!NDropdown.mergedShow) return
      const { relatedTarget } = e
      if (relatedTarget && !relatedTarget.getAttribute('n-dropdown-option')) {
        NDropdown.hoverKey = null
      }
    },
    handleClick () {
      const { NDropdown, hasSubmenu, tmNode } = this
      if (!NDropdown.mergedShow) return
      if (!hasSubmenu && !tmNode.disabled) {
        NDropdown.doSelect(tmNode.key)
        NDropdown.doUpdateShow(false)
      }
    }
  },
  render () {
    const {
      NDropdown: { animated },
      rawNode,
      mergedShowSubmenu
    } = this
    const submenuVNode = mergedShowSubmenu
      ? h(NDropdownMenu, {
        tmNodes: this.tmNode.children,
        parentKey: this.tmNode.key
      })
      : null
    return h(
      'div',
      {
        class: 'n-dropdown-option'
      },
      [
        h(
          'div',
          {
            class: [
              'n-dropdown-option-body',
              {
                'n-dropdown-option-body--pending': this.pending,
                'n-dropdown-option-body--active': this.active
              }
            ],
            onMouseMove: this.handleMouseMove,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onClick: this.handleClick
          },
          [
            h(
              'div',
              {
                class: [
                  'n-dropdown-option-body__prefix',
                  {
                    'n-dropdown-option-body__prefix--show-icon': this
                      .NDropdownMenu.showIcon
                  }
                ],
                'n-dropdown-option': true
              },
              [h(render, { render: rawNode.icon })]
            ),
            h(
              'div',
              {
                class: 'n-dropdown-option-body__label',
                'n-dropdown-option': true
              },
              // TODO: Workaround, menu campatible
              [h(render, { render: rawNode.label ?? rawNode.title })]
            ),
            h(
              'div',
              {
                class: [
                  'n-dropdown-option-body__suffix',
                  {
                    'n-dropdown-option-body__suffix--has-submenu': this
                      .NDropdownMenu.hasSubmenu
                  }
                ],
                'n-dropdown-option': true
              },
              [
                this.hasSubmenu
                  ? h(NIcon, null, {
                    default: () => h(ChevronRightIcon)
                  })
                  : null
              ]
            )
          ]
        ),
        this.hasSubmenu
          ? h(VBinder, null, {
            default: () => {
              return h(VTarget, null, {
                default: () => {
                  return h(
                    'div',
                    {
                      class: 'n-dropdown-offset-container'
                    },
                    [
                      h(
                        VFollower,
                        {
                          show: this.mergedShowSubmenu,
                          teleportDisabled: true,
                          placement: this.placement
                        },
                        {
                          default: () => {
                            return h(
                              'div',
                              {
                                class: 'n-dropdown-menu-wrapper'
                              },
                              [
                                animated
                                  ? h(
                                    Transition,
                                    {
                                      onBeforeEnter: this
                                        .handleSubmenuBeforeEnter,
                                      onAfterEnter: this
                                        .handleSubmenuAfterEnter,
                                      name: 'n-fade-in-scale-up-transition',
                                      appear: true
                                    },
                                    {
                                      default: () => submenuVNode
                                    }
                                  )
                                  : submenuVNode
                              ]
                            )
                          }
                        }
                      )
                    ]
                  )
                }
              })
            }
          })
          : null
      ]
    )
  }
})
