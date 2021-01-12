# 类型

`date`、`datetime` 或者 `relative`。

```html
<n-time :time="0" type="date" />
<br />
<n-time :time="time" type="datetime" />
```

```js
export default {
  data () {
    return {
      time: new Date(0)
    }
  }
}
```
