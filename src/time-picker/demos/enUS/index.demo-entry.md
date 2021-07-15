# Time Picker

Like a digital clock.

## Demos

```demo
basic
size
disabled-time
step-time
format
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` |  |
| default-value | `number \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| format | `string` | `'HH:mm:ss'` |  |
| hours | `number \| number[]` | `undefined` | The hours to be displayed. If it's a number, it'll be viewed as step. |
| minutes | `number \| number[]` | `undefined` | The minutes to be displayed. If it's a number, it'll be viewed as step. |
| seconds | `number \| number[]` | `undefined` | The seconds to be displayed. If it's a number, it'll be viewed as step. |
| is-hour-disabled | `(hour: number) => boolean` | `() => false` |  |
| is-minute-disabled | `(minute: number, hour: number) => boolean` | `() => false` |  |
| is-second-disabled | `(second: number, minute: number, hour: number) => boolean` | `() => false` |  |
| placeholder | `string` | `'Select Time'` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `number \| null` | `undefined` |  |
| on-blur | `() => void` | `undefined` |  |
| on-focus | `() => void` | `undefined` |  |
| on-update:value | `(value: number \| null) => void` | `undefined` |  |
