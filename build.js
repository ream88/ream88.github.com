import { readFile, writeFile } from 'fs/promises'

const result = await Bun.build({
  entrypoints: ['src/index.js'],
  minify: true
})

let html = await readFile('src/index.html', 'utf-8')

for (const output of result.outputs) {
  let text = await output.text()
  if (output.path.endsWith('.css')) {
    // Use function to avoid $ replacement patterns
    html = html.replace('<!--INJECT_CSS_HERE-->', () => `<style>${text}</style>`)
  } else if (output.path.endsWith('.js')) {
    // Escape script tags to prevent HTML parser issues
    text = text.replaceAll('<script>', '<\\script>')
    text = text.replaceAll('</script>', '<\\/script>')
    html = html.replace('<!--INJECT_JS_HERE-->', () => `<script>${text}</script>`)
  }
}

await writeFile('index.html', html)
