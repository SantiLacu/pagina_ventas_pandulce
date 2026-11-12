// ============================================
// fix-images.js — Adapta las imágenes a los
// contenedores donde se muestran, sin recortarlas.
// ============================================
// Contenedores del sitio:
//   - Tarjeta de producto, modal, thumbnails,
//     carrito y checkout: todos cuadrados
//     (aspect-square + object-cover)  -> objetivo 1:1
//   - Hero (pantalla completa):        -> objetivo 16:9
// Estrategia:
//   - Productos: "contain" sobre fondo navidad-crema
//     (#FFFBF0, igual que el fondo de las tarjetas).
//   - Hero: "contain" sobre una copia de la misma
//     imagen ampliada, desenfocada y oscurecida.
// Las imágenes originales se respaldan una sola vez
// en .backup-imagenes/ (no se commitea).
// ============================================
import { execFileSync } from 'node:child_process'
import {
  readdirSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  renameSync,
} from 'node:fs'
import { join, extname, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BACKUP_DIR = join(ROOT, '.backup-imagenes')

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

const CARMA = '#FFFBF0' // navidad-crema (fondo de tarjetas)

/** Lista recursiva de archivos de imagen bajo `dir`. */
function listImages(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return listImages(full)
    return IMAGE_EXT.has(extname(entry.name).toLowerCase()) ? [full] : []
  })
}

/** Respalda el archivo una sola vez, preservando la ruta relativa. */
function backupOnce(file) {
  const dest = join(BACKUP_DIR, relative(ROOT, file))
  if (existsSync(dest)) return
  mkdirSync(dirname(dest), { recursive: true })
  copyFileSync(file, dest)
}

/** Ejecuta magick mogrify sobre el archivo y lo reemplaza in-place. */
function runMagick(args) {
  execFileSync('magick', args, { stdio: 'inherit' })
}

/** Productos: contain + padding crema hasta 1200x1200. */
function fixProductImage(file) {
  backupOnce(file)
  const tmp = `${file}.tmp${extname(file)}`
  runMagick([
    file,
    '-resize', '1200x1200',
    '-background', CARMA,
    '-gravity', 'center',
    '-extent', '1200x1200',
    tmp,
  ])
  renameSync(tmp, file)
}

/** Hero: contain sobre copia desenfocada de la misma imagen, 1920x1080. */
function fixHeroImage(file) {
  backupOnce(file)
  const tmp = `${file}.tmp${extname(file)}`
  runMagick([
    file,
    '(', '+clone',
    '-resize', '1920x1080^', '-gravity', 'center', '-extent', '1920x1080',
    '-blur', '0x30', '-modulate', '60,80',
    ')',
    '(', '-clone', '0', '-resize', '1920x1080', ')',
    '-delete', '0',
    '-gravity', 'center',
    '-composite',
    tmp,
  ])
  renameSync(tmp, file)
}

function main() {
  const productsDir = join(ROOT, 'public', 'products')
  const heroDir = join(ROOT, 'src', 'assets', 'hero')

  const productImages = listImages(productsDir)
  const heroImages = listImages(heroDir)

  console.log(`Productos (→ 1200x1200, fondo ${CARMA}): ${productImages.length}`)
  for (const file of productImages) {
    fixProductImage(file)
    console.log(`  ✓ ${relative(ROOT, file)}`)
  }

  console.log(`Hero (→ 1920x1080, fondo difuminado): ${heroImages.length}`)
  for (const file of heroImages) {
    fixHeroImage(file)
    console.log(`  ✓ ${relative(ROOT, file)}`)
  }

  console.log('\nListo. Originales respaldados en .backup-imagenes/')
}

main()
