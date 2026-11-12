# public/products/

## Descripción
Aquí vive el **catálogo real**. El usuario agrega productos creando una carpeta por producto. El resto de la app consume el `manifest.json` generado.

## Archivos de este directorio
| Archivo | Función |
|---|---|
| `manifest.json` | Array con todos los productos. **AUTO-GENERADO**, no editar a mano. |

## Estructura de cada producto
Cada producto es una subcarpeta con un `slug` (nombre corto en minúsculas, guiones en vez de espacios):

```
public/products/torta-angel/
├── 1.jpg          # foto principal (obligatoria)
├── 2.jpg          # foto secundaria (opcional)
├── 3.webp         # más fotos...
└── data.txt       # metadatos del producto
```

## Formato de `data.txt`
```
nombre: Torta Angel
descripcion: Bizcocho de chocolate blanco con crema de frambuesa.
precio: 75000
subtipos:
Porción individual | 15000
Torta entera 1kg | 75000
Caja x6 porciones | 85000
terminaciones:
Glaseado | 0
Bañado | 2000
```

- `precio` es el precio base (se usa si no hay subtipos).
- Tras `subtipos:`, cada línea es `nombre del subtipo | precio`.
- Tras `terminaciones:` (opcional), cada línea es `nombre de la terminación | adicional`. El adicional se **suma** al precio del subtipo seleccionado. La primera opción es la que viene seleccionada por defecto (usar `Glaseado | 0` como primera). Usado en los pan dulces: `Bañado` suma $2000.
- Las fotos se ordenan numéricamente por nombre de archivo.

## Cómo agregar un producto
1. Crear carpeta con el slug deseado.
2. Agregar fotos (1.jpg, 2.jpg, ...)
3. Crear `data.txt` con el formato anterior.
4. Ejecutar `npm run sync` desde la raíz.
