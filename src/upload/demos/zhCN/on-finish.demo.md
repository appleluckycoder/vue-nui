# 上传完成的回调

你可以在回调中修改文件的属性。

```html
<n-upload
  @finish="handleFinish"
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
>
  <n-button>上传文件</n-button>
</n-upload>
```

```js
export default {
  methods: {
    handleFinish ({ file }) {
      file.url = 'http://www.mocky.io/v2/5e4bafc63100007100d8b70f'
    }
  }
}
```
