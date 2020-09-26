import { h } from 'vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import styleScheme from '../../_utils/naive/styleScheme'
import { warn } from '../../_utils/naive/warn'

export default {
  name: 'Element',
  mixins: [
    withapp,
    themeable
  ],
  props: {
    as: {
      validator () {
        warn('element', '`as` is deprecated, please use `tag` instead.')
        return true
      },
      default: undefined
    },
    tag: {
      type: String,
      default: 'div'
    },
    onThemeChange: {
      type: Function,
      default: undefined
    }
  },
  watch: {
    syntheticTheme: function (value, oldValue) {
      const {
        onThemeChange
      } = this
      if (onThemeChange) onThemeChange(value, oldValue)
    }
  },
  render () {
    const {
      as,
      tag,
      syntheticTheme,
      NConfigProvider,
      syntheticThemeEnvironment,
      $slots
    } = this
    return h(as || tag, {
      class: {
        [`n-${syntheticTheme}-theme`]: syntheticTheme
      }
    }, ($slots.default && $slots.default({
      theme: syntheticTheme,
      namespace: NConfigProvider ? NConfigProvider.inheritedNamespace : null,
      themeEnvironment: syntheticThemeEnvironment,
      styleScheme: syntheticTheme ? styleScheme[syntheticTheme] : null
    })) || null)
  }
}
