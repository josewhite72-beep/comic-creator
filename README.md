# Comic Book Creator — AOA English 🎨

PWA educativa para crear tiras cómicas en clases de inglés siguiendo el **Activity-Oriented Approach (AOA)** del currículo MEDUCA Panamá.

## Features
- 5 layouts de paneles (2×3, 3×2, 2×2, tira, wide)
- Personajes SVG, fondos y objetos arrastrables
- Speech bubbles, thought bubbles y caption boxes
- **Generación de historias con IA** (DeepSeek) por tema, grado y fase AOA
- Guardar/cargar cómics en localStorage
- Export a HTML (color) o HTML print (blanco/negro para imprimir)
- PWA instalable en Android/iOS

## Deploy en Vercel

### 1. Clonar el repo
```bash
git clone https://github.com/TU_USUARIO/comic-creator.git
cd comic-creator
```

### 2. Deploy en Vercel
```bash
npx vercel
```
O conecta el repo directamente desde vercel.com

### 3. Agregar variable de entorno en Vercel
En el dashboard de Vercel → Settings → Environment Variables:
```
DEEPSEEK_API_KEY = sk-xxxxxxxxxxxxxxxx
```

### 4. Redeploy
Después de agregar la variable, haz redeploy desde el dashboard.

## Estructura
```
comic-creator/
├── index.html          # App shell
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker (cache offline)
├── vercel.json        # Vercel routing config
├── api/
│   └── generate.js    # Serverless proxy → DeepSeek API
├── css/
│   └── style.css
└── js/
    ├── assets.js      # SVG characters, backgrounds, objects
    ├── stories.js     # Offline story bank (fallback)
    └── app.js         # Main app logic
```

## Uso en clase
1. En casa: abre la PWA, genera la historia con IA, agrega personajes y fondos
2. Exporta como HTML
3. En la escuela: abre el HTML en Chrome y proyecta, o imprime

---
Desarrollado para CEBG Barrigón, Panamá 🇵🇦
