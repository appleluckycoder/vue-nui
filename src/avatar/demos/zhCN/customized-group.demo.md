# 自定义头像组

```html
<n-avatar-group
  round
  :size="40"
  :max-avatar-count="2"
  :max-avatar-style="{color: 'white', backgroundColor: 'black'}"
>
  <n-tooltip>
    <template #trigger>
      <n-avatar
        :style="{
      color: 'yellow',
      backgroundColor: 'red'
    }"
      >
        1
      </n-avatar>
    </template>
    Naive UI！
  </n-tooltip>
  <n-avatar
    :style="{
      color: 'white',
      backgroundColor: 'green'
    }"
  >
    2
  </n-avatar>
  <n-avatar
    :style="{
      color: 'white',
      backgroundColor: 'blue'
    }"
  >
    3
  </n-avatar>
  <n-avatar>
    <n-icon>
      <md-cash />
    </n-icon>
  </n-avatar>
  <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
</n-avatar-group>
```

```js
import { MdCash } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    MdCash
  }
})
```
