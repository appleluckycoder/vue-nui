# Modal

It just pops and shows you something.

## Demos

```demo
basic
controlled
mask-closable
custom-position
preset-card
preset-confirm
preset-confirm-slot
```

## Props

### Modal

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| display-directive | `'if' \| 'show'` | `'if'` | Use which directive to control the rendering of modal body. |
| mask-closable | `boolean` | `true` | Whether to emit `hide` event when click mask. |
| preset | `'card' \| 'confirm'` | `undefined` |  |
| show | `boolean` | `false` | Whether to show modal. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback when modal's display status is changed. |

### Modal with Preset Card

See [Card props](card#Props)

### Modal with Preset Dialog

See [Dialog props](dialog#Props)

## Slots

### Modal without Preset

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |

### Modal with Preset Card

See [Card slots](card#Slots)

### Modal with Preset Dialog

See [Dialog slots](dialog#Slots)
