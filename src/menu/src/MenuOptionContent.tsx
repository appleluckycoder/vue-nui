import { computed, defineComponent, h, PropType } from 'vue'
import { ChevronDownFilledIcon } from '../../_internal/icons'
import { render as Render } from '../../_utils'
import { NBaseIcon } from '../../_internal'

export default defineComponent({
  name: 'MenuOptionContent',
  props: {
    collapsed: Boolean,
    disabled: Boolean,
    title: [String, Function],
    icon: Function,
    extra: [String, Function],
    showArrow: Boolean,
    childActive: Boolean,
    hover: Boolean,
    paddingLeft: Number,
    maxIconSize: {
      type: Number,
      required: true
    },
    activeIconSize: {
      type: Number,
      required: true
    },
    iconMarginRight: {
      type: Number,
      required: true
    },
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props) {
    return {
      style: computed(() => {
        const { paddingLeft } = props
        return { paddingLeft: paddingLeft && `${paddingLeft}px` }
      }),
      iconStyle: computed(() => {
        const { maxIconSize, activeIconSize, iconMarginRight } = props
        return {
          width: `${maxIconSize}px`,
          height: `${maxIconSize}px`,
          fontSize: `${activeIconSize}px`,
          marginRight: `${iconMarginRight}px`
        }
      })
    }
  },
  render () {
    const { clsPrefix } = this
    return (
      <div
        onClick={this.onClick}
        role="none"
        class={[
          `${clsPrefix}-menu-item-content`,
          {
            [`${clsPrefix}-menu-item-content--collapsed`]: this.collapsed,
            [`${clsPrefix}-menu-item-content--child-active`]: this.childActive,
            [`${clsPrefix}-menu-item-content--disabled`]: this.disabled,
            [`${clsPrefix}-menu-item-content--hover`]: this.hover
          }
        ]}
        style={this.style}
      >
        {this.icon ? (
          <div
            class={`${clsPrefix}-menu-item-content__icon`}
            style={this.iconStyle}
            role="none"
          >
            <Render render={this.icon} />
          </div>
        ) : null}
        <div class={`${clsPrefix}-menu-item-content-header`} role="none">
          <Render render={this.title} />
          {this.extra ? (
            <span class={`${clsPrefix}-menu-item-content-header__extra`}>
              {' '}
              <Render render={this.extra} />
            </span>
          ) : null}
        </div>
        {this.showArrow ? (
          <NBaseIcon
            ariaHidden={true}
            class={`${clsPrefix}-menu-item-content__arrow`}
            clsPrefix={clsPrefix}
          >
            {{
              default: () => <ChevronDownFilledIcon />
            }}
          </NBaseIcon>
        ) : null}
      </div>
    )
  }
})
