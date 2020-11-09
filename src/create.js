import version from './version'
import { globalStyle } from './_styles'
import { warn } from './_utils'

function setHljs (hljs) {
  this.hljs = hljs
}

function createLocalesObject (locales) {
  return locales && locales.reduce((localeMap, locale) => {
    localeMap[locale._name] = locale
    return localeMap
  }, {})
}

function createStylesObject (styles) {
  const styleMap = {}
  function traverse (rootStyles) {
    rootStyles.forEach(style => {
      const {
        theme,
        name,
        peer
      } = style
      if (!styleMap[theme]) {
        styleMap[theme] = {}
        styleMap[theme].override = (...args) => {
          styleMap[theme].base.override(...args)
        }
      }
      if (!styleMap[theme][name]) {
        styleMap[theme][name] = style
      }
      if (peer) {
        traverse(peer)
      }
    })
  }
  traverse(styles)
  return styleMap
}

function create (options = {}) {
  const {
    componentPrefix = 'N',
    components = [],
    styles = [],
    locales = [],
    hljs
  } = options
  const fallbackLocale = locales[0]
  if (!fallbackLocale) warn('create', '`locales` is empty.')
  const installTargets = []
  const naive = {
    componentPrefix,
    locales: createLocalesObject(locales),
    fallbackLocale,
    hljs,
    components: {},
    styles: createStylesObject(styles),
    // external
    version,
    setHljs,
    setHighlightjs: setHljs,
    use (plugin) {
      plugin.install(naive)
    },
    install
  }
  function install (app) {
    if (installTargets.includes(app)) return
    globalStyle.mount({
      target: 'naive-ui-global',
      count: false
    })
    installTargets.push(app)
    app.config.globalProperties.$naive = naive
    components.forEach(component => {
      component.install(app, naive)
    })
  }
  if (__DEV__) {
    if (!window.naive) window.naive = {}
    window.naive.styles = styles
  }
  return naive
}

export default create
