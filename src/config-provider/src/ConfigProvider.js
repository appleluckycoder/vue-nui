import { h } from 'vue'
import { themeable } from '../../_mixins'
import { warn, getSlot } from '../../_utils'

export default {
  name: 'ConfigProvider',
  alias: ['App'],
  mixins: [
    themeable
  ],
  provide () {
    return {
      NConfigProvider: this
    }
  },
  inject: {
    NConfigProvider: {
      default: null
    }
  },
  props: {
    bordered: {
      type: Boolean,
      default: undefined
    },
    tag: {
      type: String,
      default: 'div'
    },
    abstract: {
      type: Boolean,
      default: false
    },
    namespace: {
      type: String,
      default: undefined
    },
    themeEnvironment: {
      type: Object,
      default: undefined
    },
    themeEnvironments: {
      type: Object,
      default: undefined
    },
    language: {
      type: String,
      default: undefined
    },
    lang: {
      type: String,
      default: undefined
    },
    // deprecated
    as: {
      validator () {
        warn('config-provider', '`as` is deprecated, please use `tag` instead.')
        return true
      },
      default: undefined
    }
  },
  computed: {
    compitableThemeEnvironments () {
      return this.themeEnvironments || this.themeEnvironment
    },
    inheritedThemeEnvironments () {
      const { NConfigProvider, compitableThemeEnvironments } = this
      return compitableThemeEnvironments || (NConfigProvider ? NConfigProvider.inheritedThemeEnvironments : null)
    },
    inheritedNamespace () {
      const {
        namespace,
        NConfigProvider
      } = this
      return namespace || (NConfigProvider ? NConfigProvider.inheritedNamespace : null)
    },
    inheritedLanguage () {
      const {
        NConfigProvider,
        language,
        lang
      } = this
      return (language || lang) || (NConfigProvider ? NConfigProvider.inheritedLanguage : null)
    }
  },
  render () {
    return !this.abstract ? h(this.as || this.tag, {
      class: [
        'n-config-provider',
        {
          [`n-${this.theme}-theme`]: this.theme
        }
      ],
      style: this.mergedStyle
    },
    getSlot(this))
      : getSlot(this)
  }
}
