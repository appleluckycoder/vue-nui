const path = require('path')
const fse = require('fs-extra')
const marked = require('marked')
const camelCase = require('lodash/camelCase')
const createRenderer = require('./md-renderer')
const projectPath = require('./project-path')
const mdRenderer = createRenderer()

async function resolveDemoTitle (fileName, demoEntryPath) {
  const demoStr = await fse.readFile(
    path.resolve(projectPath, demoEntryPath, '..', fileName),
    'utf-8'
  )
  return demoStr.match(/# ([^\n]+)/)[1]
}

async function resolveDemoInfos (literal, url, env) {
  const ids = literal
    .split('\n')
    .map((line) => line.trim())
    .filter((id) => id.length)
  const infos = []
  for (const id of ids) {
    if (
      env === 'production' &&
      (id.includes('debug') || id.includes('Debug'))
    ) {
      continue
    }
    const fileName = `${id}.demo.md`
    const variable = `${camelCase(id)}Demo`
    infos.push({
      id,
      variable,
      fileName,
      title: await resolveDemoTitle(fileName, url),
      tag: `<${variable} />`
    })
  }
  return infos
}

function genDemosTemplate (demoInfos, colSpan) {
  return `<component-demos :span="${colSpan}">${demoInfos
    .map(({ tag }) => tag)
    .join('\n')}</component-demos>`
}

function genAnchorTemplate (children, options = {}) {
  return `<n-anchor :top="32" :bound="16" position="absolute" affix style="width: 144px;" :ignore-gap="${options.ignoreGap}">${children}</n-anchor>`
}

function genDemosAnchorTemplate (demoInfos) {
  const links = demoInfos.map(
    ({ id, title }) => `<n-anchor-link
    v-if="true"
    title="${title}"
    href="#${id}"
  />`
  )
  return genAnchorTemplate(links.join('\n'))
}

function genPageAnchorTemplate (tokens) {
  const titles = tokens
    .filter((token) => token.type === 'heading' && token.depth === 2)
    .map((token) => token.text)
  const links = titles.map((title) => {
    const href = title.replace(/ /g, '-')
    return `<n-anchor-link title="${title}" href="#${href}"/>`
  })
  return genAnchorTemplate(links.join('\n'), { ignoreGap: true })
}

function genScript (demoInfos, components = [], url, forceShowAnchor) {
  const showAnchor = !!(demoInfos.length || forceShowAnchor)
  const importStmts = demoInfos
    .map(({ variable, fileName }) => `import ${variable} from './${fileName}'`)
    .concat(
      components.map(
        (component) => `import ${camelCase(component)} from './${component}'`
      )
    )
    .join('\n')
  const componentStmts = demoInfos
    .map(({ variable }) => variable)
    .concat(components)
    .join(',\n')
  const script = `<script>
${importStmts}
import { computed } from 'vue'
import { useBreakpoint, useMemo } from 'vooks'

export default {
  components: {
    ${componentStmts}
  },
  setup () {
    const breakpointRef = useBreakpoint()
    const isMobileRef = useMemo(() => {
      return breakpointRef.value === 'xs'
    })
    const showAnchorRef = computed(() => {
      if (isMobileRef.value) {
        return false
      }
      return ${showAnchor}
    })
    return {
      showAnchor: showAnchorRef,
      wrapperStyle: computed(() => {
        return !isMobileRef.value
          ? 'display: flex; flex-wrap: nowrap; padding: 32px 24px 24px 56px;'
          : 'padding: 16px;'
      }),
      contentStyle: computed(() => {
        return !isMobileRef.value
          ? 'width: calc(100% - 180px); margin-right: 36px;'
          : 'width: 100%'; 
      }),
      url: ${JSON.stringify(url)}
    }
  }
}
</script>`
  return script
}

async function convertMd2ComponentDocumentation (
  text,
  url,
  env = 'development'
) {
  const forceShowAnchor = !!~text.search('<!--anchor:on-->')
  const colSpan = ~text.search('<!--single-column-->') ? 1 : 2
  const tokens = marked.lexer(text)
  // resolve external components
  const componentsIndex = tokens.findIndex(
    (token) => token.type === 'code' && token.lang === 'component'
  )
  let components = []
  if (~componentsIndex) {
    components = tokens[componentsIndex].text
    components = components
      .split('\n')
      .map((component) => component.trim())
      .filter((component) => component.length)
    tokens.splice(componentsIndex, 1)
  }
  // add edit on github button on title
  const titleIndex = tokens.findIndex(
    (token) => token.type === 'heading' && token.depth === 1
  )
  if (titleIndex > -1) {
    const titleText = JSON.stringify(tokens[titleIndex].text)
    const btnTemplate = `<edit-on-github-header relative-url="${url}" text=${titleText}></edit-on-github-header>`
    tokens.splice(titleIndex, 1, {
      type: 'html',
      pre: false,
      text: btnTemplate
    })
  }
  // resolve demos, debug demos are removed from production build
  const demosIndex = tokens.findIndex(
    (token) => token.type === 'code' && token.lang === 'demo'
  )
  let demoInfos = []
  if (~demosIndex) {
    demoInfos = await resolveDemoInfos(tokens[demosIndex].text, url, env)
    tokens.splice(demosIndex, 1, {
      type: 'html',
      pre: false,
      text: genDemosTemplate(demoInfos, colSpan)
    })
  }
  const docMainTemplate = marked.parser(tokens, {
    gfm: true,
    renderer: mdRenderer
  })
  // generate page
  const docTemplate = `
<template>
  <div
    class="n-documentation"
    :style="wrapperStyle"
  >
    <div :style="contentStyle">
      ${docMainTemplate}
    </div>
    <div style="width: 144px;" v-if="showAnchor">
      ${
        demoInfos.length
          ? genDemosAnchorTemplate(demoInfos)
          : genPageAnchorTemplate(tokens)
      }
    </div>
  </div>
</template>`
  const docScript = await genScript(demoInfos, components, url, forceShowAnchor)
  return `${docTemplate}\n\n${docScript}`
}

module.exports = convertMd2ComponentDocumentation
