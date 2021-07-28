import {
  defineComponent,
  computed,
  inject,
  PropType,
  h,
  renderSlot,
  CSSProperties
} from 'vue'
import { createKey, throwError } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { timelineInjectionKey } from './Timeline'

const timelineItemProps = {
  time: [String, Number] as PropType<string | number>,
  title: String,
  content: String,
  type: {
    type: String as PropType<
    'default' | 'success' | 'error' | 'warning' | 'info'
    >,
    default: 'default'
  }
}

export type TimelineItemProps = ExtractPublicPropTypes<typeof timelineItemProps>

export default defineComponent({
  name: 'TimelineItem',
  props: timelineItemProps,
  setup (props) {
    const NTimeline = inject(timelineInjectionKey)
    if (!NTimeline) {
      throwError(
        'timeline-item',
        '`n-timeline-item` must be placed inside `n-timeline`.'
      )
    }
    return {
      mergedClsPrefix: NTimeline.mergedClsPrefixRef,
      cssVars: computed(() => {
        const {
          props: { size },
          mergedThemeRef
        } = NTimeline
        const { type } = props
        const {
          self: {
            titleTextColor,
            contentTextColor,
            metaTextColor,
            lineColor,
            titleFontWeight,
            contentFontSize,
            [createKey('titleMargin', size)]: titleMargin,
            [createKey('titleFontSize', size)]: titleFontSize,
            [createKey('circleBorder', type)]: circleBorder
          },
          common: { cubicBezierEaseInOut }
        } = mergedThemeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--circle-border': circleBorder,
          '--content-font-size': contentFontSize,
          '--content-text-color': contentTextColor,
          '--line-color': lineColor,
          '--meta-text-color': metaTextColor,
          '--title-font-size': titleFontSize,
          '--title-font-weight': titleFontWeight,
          '--title-margin': titleMargin,
          '--title-text-color': titleTextColor
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-timeline-item`,
          `${mergedClsPrefix}-timeline-item--${this.type}-type`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-timeline-item-timeline`}>
          <div class={`${mergedClsPrefix}-timeline-item-timeline__line`} />
          <div class={`${mergedClsPrefix}-timeline-item-timeline__circle`} />
        </div>
        <div class={`${mergedClsPrefix}-timeline-item-content`}>
          {this.title || this.$slots.header ? (
            <div class={`${mergedClsPrefix}-timeline-item-content__title`}>
              {renderSlot(this.$slots, 'header', undefined, () => [this.title])}
            </div>
          ) : null}
          <div class={`${mergedClsPrefix}-timeline-item-content__content`}>
            {renderSlot(this.$slots, 'default', undefined, () => [
              this.content
            ])}
          </div>
          <div class={`${mergedClsPrefix}-timeline-item-content__meta`}>
            {renderSlot(this.$slots, 'footer', undefined, () => [this.time])}
          </div>
        </div>
      </div>
    )
  }
})
