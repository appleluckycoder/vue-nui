import { h, ref, defineComponent, inject, PropType, computed } from 'vue'
import { NScrollbar } from '../../scrollbar'
import { NButton } from '../../button'
import { NBaseFocusDetector } from '../../_internal'
import { getTimeUnits, time } from './utils'
import {
  IsHourDisabled,
  IsMinuteDisabled,
  IsSecondDisabled,
  timePickerInjectionKey
} from './interface'
import PanelCol, { Item } from './PanelCol'
import { MaybeArray } from '../../_utils'

const timePickerPanelProps = {
  actions: {
    type: Array as PropType<Array<'now' | 'confirm'>>,
    default: () => ['now', 'confirm']
  },
  showHour: {
    type: Boolean,
    default: true
  },
  showMinute: {
    type: Boolean,
    default: true
  },
  showSecond: {
    type: Boolean,
    default: true
  },
  showPeriod: {
    type: Boolean,
    default: true
  },
  isHourInvalid: Boolean,
  isMinuteInvalid: Boolean,
  isSecondInvalid: Boolean,
  isValueInvalid: Boolean,
  hourValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  minuteValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  secondValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  isHourDisabled: Function as PropType<IsHourDisabled>,
  isMinuteDisabled: Function as PropType<IsMinuteDisabled>,
  isSecondDisabled: Function as PropType<IsSecondDisabled>,
  onHourClick: {
    type: Function as PropType<(value: number) => void>,
    required: true
  },
  onMinuteClick: {
    type: Function as PropType<(value: number) => void>,
    required: true
  },
  onSecondClick: {
    type: Function as PropType<(value: number) => void>,
    required: true
  },
  onNowClick: Function as PropType<() => void>,
  nowText: String,
  confirmText: String,
  transitionDisabled: Boolean,
  onConfirmClick: Function as PropType<() => void>,
  onFocusin: Function as PropType<(e: FocusEvent) => void>,
  onFocusout: Function as PropType<(e: FocusEvent) => void>,
  onFocusDetectorFocus: Function as PropType<() => void>,
  onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
  hours: [Number, Array] as PropType<MaybeArray<number>>,
  minutes: [Number, Array] as PropType<MaybeArray<number>>,
  seconds: [Number, Array] as PropType<MaybeArray<number>>
}

export default defineComponent({
  name: 'TimePickerPanel',
  props: timePickerPanelProps,
  setup (props) {
    const {
      mergedThemeRef,
      mergedClsPrefixRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(timePickerInjectionKey)!

    const hoursRef = computed<Item[]>(() => {
      const { isHourDisabled, hours } = props

      return getTimeUnits(time.hours, hours).map((hour) => {
        return {
          value: hour,
          disabled: isHourDisabled ? isHourDisabled(Number(hour)) : false
        }
      })
    })
    const minutesRef = computed<Item[]>(() => {
      const { isMinuteDisabled, minutes } = props

      return getTimeUnits(time.minutes, minutes).map((minute) => {
        return {
          value: minute,
          disabled: isMinuteDisabled
            ? isMinuteDisabled(Number(minute), props.hourValue)
            : false
        }
      })
    })
    const secondsRef = computed<Item[]>(() => {
      const { isSecondDisabled, seconds } = props

      return getTimeUnits(time.seconds, seconds).map((second) => {
        return {
          value: second,
          disabled: isSecondDisabled
            ? isSecondDisabled(
              Number(second),
              props.minuteValue,
              props.hourValue
            )
            : false
        }
      })
    })
    return {
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      hours: hoursRef,
      minutes: minutesRef,
      seconds: secondsRef,
      hourScrollRef: ref(null),
      minuteScrollRef: ref(null),
      secondScrollRef: ref(null)
    }
  },
  render () {
    const { mergedClsPrefix, mergedTheme } = this
    return h(
      'div',
      {
        tabindex: 0,
        class: `${mergedClsPrefix}-time-picker-panel`,
        onFocusin: this.onFocusin,
        onFocusout: this.onFocusout,
        onKeydown: this.onKeydown
      },
      [
        <div class={`${mergedClsPrefix}-time-picker-cols`}>
          {this.showHour ? (
            <div
              class={[
                `${mergedClsPrefix}-time-picker-col`,
                {
                  [`${mergedClsPrefix}-time-picker-col--invalid`]:
                    this.isHourInvalid,
                  [`${mergedClsPrefix}-time-picker-col--transition-disabled`]:
                    this.transitionDisabled
                }
              ]}
            >
              <NScrollbar
                ref="hourScrollRef"
                theme={mergedTheme.peers.Scrollbar}
                themeOverrides={mergedTheme.peerOverrides.Scrollbar}
              >
                {{
                  default: () => [
                    <PanelCol
                      clsPrefix={mergedClsPrefix}
                      data={this.hours}
                      activeValue={this.hourValue}
                      onItemClick={this.onHourClick}
                    />,
                    <div
                      class={`${mergedClsPrefix}-time-picker-col__padding`}
                    />
                  ]
                }}
              </NScrollbar>
            </div>
          ) : null}
          {this.showMinute ? (
            <div
              class={[
                `${mergedClsPrefix}-time-picker-col`,
                {
                  [`${mergedClsPrefix}-time-picker-col--transition-disabled`]:
                    this.transitionDisabled,
                  [`${mergedClsPrefix}-time-picker-col--invalid`]:
                    this.isMinuteInvalid
                }
              ]}
            >
              <NScrollbar
                ref="minuteScrollRef"
                theme={mergedTheme.peers.Scrollbar}
                themeOverrides={mergedTheme.peerOverrides.Scrollbar}
              >
                {{
                  default: () => [
                    <PanelCol
                      clsPrefix={mergedClsPrefix}
                      data={this.minutes}
                      activeValue={this.minuteValue}
                      onItemClick={this.onMinuteClick}
                    />,
                    <div
                      class={`${mergedClsPrefix}-time-picker-col__padding`}
                    />
                  ]
                }}
              </NScrollbar>
            </div>
          ) : null}
          {this.showSecond ? (
            <div
              class={[
                `${mergedClsPrefix}-time-picker-col`,
                {
                  [`${mergedClsPrefix}-time-picker-col--invalid`]:
                    this.isSecondInvalid,
                  [`${mergedClsPrefix}-time-picker-col--transition-disabled`]:
                    this.transitionDisabled
                }
              ]}
            >
              <NScrollbar
                ref="secondScrollRef"
                theme={mergedTheme.peers.Scrollbar}
                themeOverrides={mergedTheme.peerOverrides.Scrollbar}
              >
                {{
                  default: () => [
                    <PanelCol
                      clsPrefix={mergedClsPrefix}
                      data={this.seconds}
                      activeValue={this.secondValue}
                      onItemClick={this.onSecondClick}
                    />,
                    <div
                      class={`${mergedClsPrefix}-time-picker-col__padding`}
                    />
                  ]
                }}
              </NScrollbar>
            </div>
          ) : null}
        </div>,
        <div class={`${mergedClsPrefix}-time-picker-actions`}>
          {this.actions?.includes('now') ? (
            <NButton
              size="tiny"
              theme={mergedTheme.peers.Button}
              themeOverrides={mergedTheme.peerOverrides.Button}
              onClick={this.onNowClick}
            >
              {{ default: () => this.nowText }}
            </NButton>
          ) : null}
          {this.actions?.includes('confirm') ? (
            <NButton
              size="tiny"
              type="primary"
              class={`${mergedClsPrefix}-time-picker-actions__confirm`}
              theme={mergedTheme.peers.Button}
              themeOverrides={mergedTheme.peerOverrides.Button}
              disabled={this.isValueInvalid}
              onClick={this.onConfirmClick}
            >
              {{ default: () => this.confirmText }}
            </NButton>
          ) : null}
        </div>,
        <NBaseFocusDetector onFocus={this.onFocusDetectorFocus} />
      ]
    )
  }
})
