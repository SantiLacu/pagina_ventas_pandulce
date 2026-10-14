import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PRODUCTS_DIR = join(__dirname, '..', 'public', 'products')
const MANIFEST_PATH = join(PRODUCTS_DIR, 'manifest.json')
const IMG_EXTENSIONS = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i

function naturalCompare(a, b) {
  const ax = [], bx = []
  a.replace(/(\d+)|(\D+)/g, (_, $1, $2) => ax.push([$1 || Infinity, $2 || '']))
  b.replace(/(\d+)|(\D+)/g, (_, $1, $2) => bx.push([$1 || Infinity, $2 || '']))
  while (ax.length && bx.length) {
    const an = ax.shift(), bn = bx.shift()
    const nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1])
    if (nn) return nn
  }
  return ax.length - bx.length
}

function parseDataTxt(content) {
  const lines = content.split(/\r?\n/)
  const result = {
    nombre: '',
    descripcion: '',
    precio: 0,
    subtipos: [],
  }
  let inSubtipos = false

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      if (inSubtipos) inSubtipos = false
      continue
    }

    if (line.toLowerCase().startsWith('subtipos:')) {
      inSubtipos = true
      continue
    }

    if (inSubtipos) {
      const parts = line.split('|').map((p) => p.trim())
      if (parts.length >= 2) {
        const precio = parseInt(parts[1].replace(/\D/g, ''), 10)
        if (!isNaN(precio)) {
          result.subtipos.push({ nombre: parts[0], precio })
        }
      }
      continue
    }

    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue

    const key = line.slice(0, colonIdx).trim().toLowerCase()
    const value = line.slice(colonIdx + 1).trim()

    if (key === 'nombre') result.nombre = value
    else if (key === 'descripcion') result.descripcion = value
    else if (key === 'precio') {
      const n = parseInt(value.replace(/\D/g, ''), 10)
      if (!isNaN(n)) result.precio = n
    }
  }

  return result
}

function scanProductFolder(slug) {
  const folder = join(PRODUCTS_DIR, slug)
  const dataPath = join(folder, 'data.txt')

  if (!existsSync(dataPath)) {
    console.warn(`[skip] ${slug}: falta data.txt`)
    return null
  }

  const dataContent = readFileSync(dataPath, 'utf-8')
  const parsed = parseDataTxt(dataContent)

  const allFiles = readdirSync(folder)
  const images = allFiles
    .filter((f) => IMG_EXTENSIONS.test(f))
    .sort(naturalCompare)
    .map((f) => `/products/${slug}/${f}`)

  if (images.length === 0) {
    console.warn(`[warn] ${slug}: no tiene imágenes`)
  }

  return {
    slug,
    nombre: parsed.nombre || slug,
    descripcion: parsed.descripcion || '',
    precio: parsed.precio,
    subtipos: parsed.subtipos,
    imagenes: images,
  }
}

function main() {
  if (!existsSync(PRODUCTS_DIR)) {
    console.error(`No existe ${PRODUCTS_DIR}`)
    process.exit(1)
  }

  const entries = readdirSync(PRODUCTS_DIR, { withFileTypes: true })
  const productFolders = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)

  const products = []
  for (const slug of productFolders) {
    const product = scanProductFolder(slug)
    if (product) products.push(product)
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(products, null, 2), 'utf-8')
  console.log(`✓ manifest.json generado con ${products.length} producto(s)`)
  for (const p of products) {
    console.log(`  - ${p.slug} (${p.imagenes.length} img, ${p.subtipos.length} subtipos)`)
  }
}

main()
