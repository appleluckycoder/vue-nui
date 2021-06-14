# Button

Button is used to trigger some actions.

## Demos

```demo
basic
dashed
size
text
tag
disabled
icon
events
shape
ghost
loading
color
group
icon-button
```

## Props

### Button Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| attr-type | `'button' \| 'submit' \| 'reset'` | `'button'` | The DOM `type` attribute of the button. |
| block | `boolean` | `false` |  |
| bordered | `boolean` | `true` |  |
| circle | `boolean` | `false` |  |
| color | `string` | `undefined` | Only support `#FFF`, `#FFFFFF`, `rgb(0, 0, 0)` formatted colors. |
| dashed | `boolean` | `false` |  |
| disabled | `boolean` | `false` |  |
| ghost | `boolean` | `false` |  |
| icon-placement | `'left' \| 'right'` | `'left'` |  |
| keyboard | `boolean` | `true` | Whether is supports keyboard operation. |
| loading | `boolean` | `false` |  |
| round | `boolean` | `false` |  |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` |  |
| text | `boolean` | `false` |  |
| type | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` |  |

### Button Group Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `undefined` | The buttons' size in button group. If set, the button's size prop inner group won't work. |
| vertical | `boolean` | `false` |  |

## Slots

### Button Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |
| icon    | `()`       |             |

### Button Group Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |
