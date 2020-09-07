
import { Vue, i18n } from './init'
import debugRouteMixin from './routes/debug-route-mixin'
import hljs from './hljs'
import demoRouterView from './DemoRouterView'
// import './styles/test-customize-style-scheme.scss' // test customize style scheme
import naive from '../src/index'
import '../src/_styles/index.scss'
import './font'
import { routes, childRoutes } from './routes/routes'
import createRouter from './routes/router'

debugRouteMixin(routes, childRoutes)
const router = createRouter(Vue, routes)

naive.setHljs(hljs)

Vue.use(naive)

new Vue({
  ...demoRouterView,
  router,
  i18n
}).$mount('#app')
