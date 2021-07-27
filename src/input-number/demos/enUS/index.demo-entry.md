# Input Number

If you want just input number, use it.

## Demos

```demo
basic
disabled
event
icon
min-max
size
step
validator
show-button
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether to show the border. |
| default-value | `number \| null` | `null` | Default value in uncontrolled mode. |
| disabled | `boolean` | `false` | Whether to disable the input. |
| max | `number` | `undefined` | The max value. |
| min | `number` | `undefined` | The min value. |
| placeholder | `string` | `'Please Input'` |  |
| show-button | `boolean` | `true` | Whether to show buttons. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of input box. |
| step | `number` | `1` | The number to which the current value is increased or decreased. It can be an integer or decimal. |
| validator | `(value) => boolean` | `undefined` | Setup custom validation. |
| value | `number \| null` | `undefined` | Value in controlled mode. |
| on-blur | `(event: FocusEvent) => void` | `undefined` | Callback when blur. |
| on-focus | `(event: FocusEvent) => void` | `undefined` | Callback when focused. |
| on-update:value | `(value: number \| null) => void` | `undefined` | Callback when the component's value changes. |

### Input Slots

| Name   | Parameters | Description                    |
| ------ | ---------- | ------------------------------ |
| prefix | `()`       | Input box prefix content slot. |
| suffix | `()`       | Input box suffix content slot. |
