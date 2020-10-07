import moveoutsideDelegate from '../_utils/delegate/moveoutsideDelegate'

const ctx = '@@mmoContext'

function lazyHandler (handler) {
  let called = false
  return function (e) {
    if (called) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[mousemoveoutside] called')
      }
      handler(e)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[mousemoveoutside] lazy called')
      }
      called = true
    }
  }
}

const mousemoveoutside = {
  beforeMount (el, bindings) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[mousemoveoutside]: bind $el')
    }
    if (typeof bindings.value === 'function') {
      el[ctx] = {
        handler: bindings.modifiers.lazy ? lazyHandler(bindings.value) : bindings.value
      }
      moveoutsideDelegate.registerHandler(el, el[ctx].handler)
    }
  },
  mounted () {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[mousemoveoutside]: inserted')
    }
  },
  updated (el, bindings) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[mousemoveoutside]: componentUpdated')
    }
    if (typeof bindings.value === 'function') {
      if (el[ctx] && el[ctx].handler) {
        if (el[ctx].handler !== bindings.value) {
          moveoutsideDelegate.unregisterHandler(el[ctx].handler)
          el[ctx].handler = bindings.value
          moveoutsideDelegate.registerHandler(el, el[ctx].handler)
        }
      } else {
        el[ctx].handler = bindings.value
        moveoutsideDelegate.registerHandler(el, el[ctx].handler)
      }
    } else {
      console.error(
        '[naive-ui/mousemoveoutside]: Binding value is not a function.'
      )
    }
  },
  unmounted (el) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[mousemoveoutside]: unbind')
    }
    moveoutsideDelegate.unregisterHandler(el[ctx].handler)
  }
}

export default mousemoveoutside
