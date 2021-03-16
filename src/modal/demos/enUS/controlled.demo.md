# Controlled

Modal can be controlled.

```html
<n-button @click="handleClick"> Start Me up </n-button>
<n-modal :show="showModal">
  <n-card style="width: 600px;" title="Modal" :bordered="false" size="huge">
    Countdown {{ timeout / 1000 }}s
  </n-card>
</n-modal>
```

```js
export default {
  data () {
    return {
      showModal: false,
      timeout: 6000
    }
  },
  methods: {
    handleClick () {
      this.showModal = true
      this.timeout = 6000
      const countdown = () => {
        if (this.timeout <= 0) {
          this.showModal = false
        } else {
          this.timeout -= 1000
          setTimeout(countdown, 1000)
        }
      }
      countdown()
    }
  }
}
```
