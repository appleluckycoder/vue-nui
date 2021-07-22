# Color Picker

Compared with real world, its space is discrete.

## Demos

```demo
basic
alpha
size
modes
form
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-show | `boolean` | `undefined` | Whether to show panel by default. |
| default-value | `string` | Black color value of 1st mode's corresponding value. | Default value of the picker. |
| modes | `Array<'rgb' \| 'hex' \| 'hsl' \| 'hsv'>` | `['rgb', 'hex', 'hsl']` | The value format of the picker. Notice that value will follow the mode once you select a new value from the picker. |
| to | `string \| HTMLElement` | `'body'` | Where to detach the panel. |
| show | `boolean` | `undefined` | Whether to show the panel. |
| show-alpha | `boolean` | `true` | Whether alpha can be adjusted. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the picker. |
| value | `string \| null` | `undefined` | Value of the picker. |
| on-complete | `(value: string) => void` | `undefined` | Callback once the value is changed completely (not called during mousemove). |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback once panel show status is changed. |
| on-update:value | `(value: string) => void` | `undefined` | Callback once the value is changed. |
| actions | `Array<'confirm'> \| null` | `null` | Show the type of button |
