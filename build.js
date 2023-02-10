import esbuild from 'esbuild'
import { sassPlugin } from 'esbuild-sass-plugin'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import postcssCalc from 'postcss-calc'
import postcssColorFunction from 'postcss-color-function'
import postcssCustomMedia from 'postcss-custom-media'
import postcssCustomProperties from 'postcss-custom-properties'
import postcssPresetEnv from 'postcss-preset-env'

import fs from 'fs/promises'

const { outputFiles } = await esbuild
  .build({
    entryPoints: ['src/index.js'],
    bundle: true,
    write: false,
    minify: true,
    outfile: 'index.js',
    loader: { '.js': 'jsx' },
    plugins: [
      sassPlugin({
        async transform (source, resolveDir) {
          const plugins = [
            autoprefixer,
            postcssCalc,
            postcssColorFunction,
            postcssCustomMedia,
            postcssCustomProperties,
            postcssPresetEnv({ stage: 0 })
          ]

          const { css } = await postcss(plugins).process(source, { from: undefined })
          return css
        }
      })
    ]
  })

let html = await fs.readFile('src/index.html', 'utf-8')

html = outputFiles.reduce((html, { path, text }) => {
  if (path.endsWith('.css')) {
    return html.replace('<!--INJECT_CSS_HERE-->', `<style>${text}</style><!--INJECT_CSS_HERE-->`)
  } else if (path.endsWith('.js')) {
    return html.replace('<!--INJECT_JS_HERE-->', `<script>${text}</script><!--INJECT_JS_HERE-->`)
  } else {
    return html
  }
}, html)

await fs.writeFile('index.html', html)
