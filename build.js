import { execSync } from 'child_process'
import { readFile, writeFile } from 'fs/promises'

// Compile Elm
execSync('elm make src/Main.elm --optimize --output=elm.js', { stdio: 'inherit' })

// Read compiled Elm and CSS
const elmJs = await readFile('elm.js', 'utf-8')
const css = await readFile('src/styles.css', 'utf-8')

// Build HTML
let html = await readFile('src/index.html', 'utf-8')
html = html.replace('<!--INJECT_CSS_HERE-->', () => `<style>${css}</style>`)
html = html.replace('<!--INJECT_JS_HERE-->', () => `<script>${elmJs}</script>`)

await writeFile('index.html', html)

// Clean up
import { unlink } from 'fs/promises'
await unlink('elm.js')

console.log('Build complete: index.html')
