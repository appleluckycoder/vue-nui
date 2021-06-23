import { ref, computed, inject, watch, ExtractPropTypes } from 'vue'
import {
  addMonths,
  addYears,
  isSameMonth,
  getTime,
  format,
  set,
  getYear,
  getMonth,
  getDate,
  isValid,
  startOfDay,
  startOfSecond
} from 'date-fns'
import { dateArray, strictParse } from '../utils'
import { usePanelCommon } from './use-panel-common'
import { IsSingleDateDisabled, datePickerInjectionKey } from '../interface'
import type { DateItem } from '../utils'

const useCalendarProps = {
  ...usePanelCommon.props,
  actions: {
    type: Array,
    default: () => ['now', 'clear', 'confirm']
  }
} as const

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useCalendar (
  props: ExtractPropTypes<typeof useCalendarProps>,
  type: 'date' | 'datetime'
) {
  const panelCommon = usePanelCommon(props)
  const {
    isValueInvalidRef,
    isDateDisabledRef,
    isDateInvalidRef,
    isTimeInvalidRef,
    isDateTimeInvalidRef,
    isHourDisabledRef,
    isMinuteDisabledRef,
    isSecondDisabledRef,
    localeRef,
    datePickerSlots
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = inject(datePickerInjectionKey)!
  const validation = {
    isValueInvalid: isValueInvalidRef,
    isDateDisabled: isDateDisabledRef,
    isDateInvalid: isDateInvalidRef,
    isTimeInvalid: isTimeInvalidRef,
    isDateTimeInvalid: isDateTimeInvalidRef,
    isHourDisabled: isHourDisabledRef,
    isMinuteDisabled: isMinuteDisabledRef,
    isSecondDisabled: isSecondDisabledRef
  }
  const dateInputValueRef = ref(
    props.value === null || Array.isArray(props.value)
      ? ''
      : format(props.value, props.dateFormat)
  )
  const calendarValueRef = ref(
    props.value === null || Array.isArray(props.value)
      ? Date.now()
      : props.value
  )
  const nowRef = ref(Date.now())
  const dateArrayRef = computed(() => {
    return dateArray(
      calendarValueRef.value,
      props.value,
      nowRef.value,
      localeRef.value.firstDayOfWeek
    )
  })
  const weekdaysRef = computed(() => {
    return dateArrayRef.value.slice(0, 7).map((dateItem) => {
      const { ts } = dateItem
      return format(
        ts,
        localeRef.value.dayFormat,
        panelCommon.dateFnsOptions.value
      )
    })
  })
  const calendarMonthRef = computed(() => {
    return format(
      calendarValueRef.value,
      localeRef.value.monthFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  const calendarYearRef = computed(() => {
    return format(
      calendarValueRef.value,
      localeRef.value.yearFormat,
      panelCommon.dateFnsOptions.value
    )
  })
  watch(calendarValueRef, (value, oldValue) => {
    if (!isSameMonth(value, oldValue)) {
      panelCommon.disableTransitionOneTick()
    }
  })
  watch(
    computed(() => props.value),
    (value) => {
      if (value !== null && !Array.isArray(value)) {
        dateInputValueRef.value = format(
          value,
          props.dateFormat,
          panelCommon.dateFnsOptions.value
        )
        calendarValueRef.value = value
      } else {
        dateInputValueRef.value = ''
      }
    }
  )
  function sanitizeValue (value: number): number {
    if (type === 'datetime') return getTime(startOfSecond(value))
    return getTime(startOfDay(value))
  }
  function mergedIsDateDisabled (ts: number): boolean {
    const {
      isDateDisabled: { value: isDateDisabled }
    } = validation
    if (!isDateDisabled) return false
    return (isDateDisabled as IsSingleDateDisabled)(ts)
  }
  function handleDateInput (value: string): void {
    const date = strictParse(
      value,
      props.dateFormat,
      new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (props.value === null) {
        panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())), false)
      } else if (!Array.isArray(props.value)) {
        const newDateTime = set(props.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        panelCommon.doUpdateValue(
          getTime(sanitizeValue(getTime(newDateTime))),
          false
        )
      }
    } else {
      dateInputValueRef.value = value
    }
  }
  function handleDateInputBlur (): void {
    const date = strictParse(
      dateInputValueRef.value,
      props.dateFormat,
      new Date(),
      panelCommon.dateFnsOptions.value
    )
    if (isValid(date)) {
      if (props.value === null) {
        panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())), false)
      } else if (!Array.isArray(props.value)) {
        const newDateTime = set(props.value, {
          year: getYear(date),
          month: getMonth(date),
          date: getDate(date)
        })
        panelCommon.doUpdateValue(
          getTime(sanitizeValue(getTime(newDateTime))),
          false
        )
      }
    } else {
      deriveDateInputValue()
    }
  }
  function clearSelectedDateTime (): void {
    panelCommon.doUpdateValue(null, true)
    dateInputValueRef.value = ''
    panelCommon.doClose(true)
  }
  function handleNowClick (): void {
    panelCommon.doUpdateValue(getTime(sanitizeValue(Date.now())), true)
    calendarValueRef.value = Date.now()
    panelCommon.doClose(true)
  }
  function handleDateClick (dateItem: DateItem): void {
    if (mergedIsDateDisabled(dateItem.ts)) {
      return
    }
    let newValue: number
    if (props.value !== null && !Array.isArray(props.value)) {
      newValue = props.value
    } else {
      newValue = Date.now()
    }
    newValue = getTime(set(newValue, dateItem.dateObject))
    panelCommon.doUpdateValue(getTime(sanitizeValue(newValue)), type === 'date')
    if (type === 'date') {
      panelCommon.doClose()
    }
  }
  function deriveDateInputValue (time?: number): void {
    // If not selected, display nothing,
    // else update datetime related string
    if (props.value === null || Array.isArray(props.value)) {
      dateInputValueRef.value = ''
      return
    }
    if (time === undefined) {
      time = props.value
    }
    dateInputValueRef.value = format(
      time,
      props.dateFormat,
      panelCommon.dateFnsOptions.value
    )
  }
  function handleConfirmClick (): void {
    if (validation.isDateInvalid.value || validation.isTimeInvalid.value) {
      return
    }
    panelCommon.doConfirm()
    closeCalendar()
  }
  function closeCalendar (): void {
    if (props.active) {
      panelCommon.doClose()
    }
  }
  function nextYear (): void {
    calendarValueRef.value = getTime(addYears(calendarValueRef.value, 1))
  }
  function prevYear (): void {
    calendarValueRef.value = getTime(addYears(calendarValueRef.value, -1))
  }
  function nextMonth (): void {
    calendarValueRef.value = getTime(addMonths(calendarValueRef.value, 1))
  }
  function prevMonth (): void {
    calendarValueRef.value = getTime(addMonths(calendarValueRef.value, -1))
  }
  function handleTimePickerChange (value: number): void {
    panelCommon.doUpdateValue(value, false)
  }
  return {
    dateArray: dateArrayRef,
    calendarYear: calendarYearRef,
    calendarMonth: calendarMonthRef,
    weekdays: weekdaysRef,
    mergedIsDateDisabled,
    nextYear,
    prevYear,
    nextMonth,
    prevMonth,
    handleNowClick,
    handleConfirmClick,
    ...validation,
    ...panelCommon,
    // datetime only
    handleDateClick,
    handleDateInputBlur,
    handleDateInput,
    handleTimePickerChange,
    clearSelectedDateTime,
    timePickerSize: panelCommon.timePickerSize,
    dateInputValue: dateInputValueRef,
    datePickerSlots
  }
}

useCalendar.props = useCalendarProps

export { useCalendar }
