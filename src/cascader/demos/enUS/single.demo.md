# Single

```html
<n-space vertical>
  <n-space>
    <n-space><n-switch v-model:value="leafOnly" />Leaf Only</n-space>
    <n-space><n-switch v-model:value="cascade" />Cascade</n-space>
    <n-space><n-switch v-model:value="showPath" />Show Path</n-space>
    <n-space><n-switch v-model:value="hoverTrigger" />Hover Trigger</n-space>
    <n-space><n-switch v-model:value="filterable" />Filterable</n-space>
  </n-space>
  <n-cascader
    v-model:value="value"
    placeholder="Meaningless values"
    :expand-trigger="hoverTrigger ? 'hover' : 'click'"
    :options="options"
    :cascade="cascade"
    :leaf-only="leafOnly"
    :show-path="showPath"
    :filterable="filterable"
  />
</n-space>
```

```js
function getOptions (depth = 3, iterator = 1, prefix = '') {
  const length = 12
  const options = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, '' + String(i))
      })
    } else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0
      })
    } else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
      })
    }
  }
  return options
}

export default {
  data () {
    return {
      leafOnly: true,
      cascade: true,
      showPath: true,
      hoverTrigger: false,
      filterable: false,
      value: null,
      options: getOptions()
    }
  }
}
```
