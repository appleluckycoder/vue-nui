# 时间线 Timeline

这个世界有两个纬度：时间、事件。

## 演示

```demo
basic
size
item-placement
```

## Props

### Timeline Props

| 名称           | 类型                  | 默认值     | 说明 |
| -------------- | --------------------- | ---------- | ---- |
| item-placement | `'left' \| 'right'`   | `'left'`   |      |
| size           | `'medium' \| 'large'` | `'medium'` |      |

### Timeline Item Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | `string` | `undefined` |  |
| time | `string` | `undefined` |  |
| title | `string` | `undefined` |  |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` |  |

## Slots

### Timeline Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

### Timeline Item Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |
| footer  | `()` |      |
| header  | `()` |      |
