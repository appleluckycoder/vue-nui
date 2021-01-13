# Code

## Prequisites

<n-alert title="Note" type="warning" style="margin-bottom: 16px;">
  Due to package size, Naive UI doesn't include highlight.js. If you want use Code, make sure you have set highlightjs before using it.
</n-alert>

The following code shows how to set hljs of Code. Importing highlight.js on demand is recommonded, because it can significantly reduce bundle size of your app.

```html
<template>
  <n-config-provider :hljs="hljs">
    <my-app />
  </n-config-provider>
</template>

<script>
  import hljs from 'highlight.js/lib/core'
  import cpp from 'highlight.js/lib/languages/cpp'

  hljs.registerLanguage('cpp', cpp)

  export default {
    setup() {
      return {
        hljs
      }
    }
  }
</script>
```

## Demos

```demo
basic
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| code | `string` | `''` |  |
| hljs | `Object` | `undefined` | If you want to set hljs locally, set it on code by the prop |
| language | `string` | `undefined` |  |
| trim | `boolean` | `true` |  |
