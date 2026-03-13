# Velari – Sitio Web Oficial

Agencia de viajes boutique del Norte Argentino.
**Tagline:** "Armá tu viaje"

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | React 18 + Vite 7 |
| Estilos | Tailwind CSS v3 |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| IA | Anthropic Claude (Haiku) |
| Hosting target | Hostinger (exportación estática) |

---

## Inicio rápido

```bash
# 1. Clonar / descomprimir el proyecto
cd velari

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env y agregar tu VITE_ANTHROPIC_API_KEY

# 4. Servidor de desarrollo
npm run dev
# → http://localhost:3000

# 5. Build para producción
npm run build
# → carpeta dist/ lista para subir a Hostinger
```

---

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `VITE_ANTHROPIC_API_KEY` | API key de Anthropic para el chatbot de IA |

> **Importante:** Esta variable queda incluida en el bundle de cliente.
> Para producción se recomienda usar el proxy PHP (ver sección abajo).

---

## Deploy en Hostinger (Shared Hosting)

### Opción A – Estático puro (recomendado)

1. Ejecutar `npm run build`
2. Subir **todo el contenido de `dist/`** al `public_html/` de Hostinger vía FTP o File Manager
3. Verificar que `public/.htaccess` esté presente (ya incluido en `dist/`)

### Opción B – Con chatbot seguro en PHP

Para no exponer la API key en el frontend, crear `/public_html/api/chat.php`:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://tu-dominio.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$body = json_decode(file_get_contents('php://input'), true);
$apiKey = getenv('ANTHROPIC_API_KEY'); // define en Hostinger → Advanced → PHP Config

$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch, [
  CURLOPT_POST           => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER     => [
    'Content-Type: application/json',
    "x-api-key: $apiKey",
    'anthropic-version: 2023-06-01',
  ],
  CURLOPT_POSTFIELDS => json_encode($body),
]);
$response = curl_exec($ch);
curl_close($ch);
echo $response;
```

Luego en `AIChatbot.jsx`, cambiar la URL de fetch de
`https://api.anthropic.com/v1/messages`
a
`/api/chat.php`
y eliminar los headers de autenticación del cliente.

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Header.jsx           # Navbar + WhatsApp flotante
│   ├── Hero.jsx             # Sección hero con imagen y CTAs
│   ├── BenefitsSection.jsx  # 3 pilares de valor
│   ├── ProcessSection.jsx   # Cómo funciona (3 pasos)
│   ├── ServiciosSection.jsx # Servicios ofrecidos
│   ├── ParaQuienSection.jsx # Buyer personas (3 cards)
│   ├── DiferenciadoresSection.jsx
│   ├── TestimoniosSection.jsx
│   ├── CTAFinal.jsx
│   ├── LeadCaptureForm.jsx  # Formulario de contacto
│   ├── AIChatbot.jsx        # Widget de IA flotante
│   └── Footer.jsx
├── pages/
│   └── HomePage.jsx         # Ensambla todas las secciones
└── index.css                # Estilos base, fonts, tokens
```

---

## Paleta de colores Velari

| Nombre | Hex | Clase Tailwind |
|--------|-----|----------------|
| Azul Profundo | `#1e2b3a` | `bg-velari-deep` |
| Azul Petróleo | `#314053` | `bg-velari-petrol` |
| Arena | `#ceb59c` | `bg-velari-sand` |
| Beige Claro | `#dfd7cb` | `bg-velari-beige` |

---

## Tipografías

Las fuentes de marca se configuran vía `@font-face` en `src/index.css`.
Copiá los archivos de fuente a `public/fonts/`:

| Fuente | Archivo | Uso |
|--------|---------|-----|
| Helony | `Helony.woff2` | Títulos y encabezados |
| Codec Pro | `CodecPro-Regular.woff2`, `CodecPro-Bold.woff2` | Cuerpo de texto |
| Chocolate Covered Raindrops Bold | `ChocolateCoveredRaindrops-Bold.woff2` | Frases destacadas |

Mientras no estén disponibles los archivos, se usan Google Fonts de respaldo:
- Cormorant Garamond (→ Helony)
- Inter (→ Codec Pro)
- Caveat (→ Chocolate Covered Raindrops)

---

## Chatbot IA

El widget flotante en la esquina inferior derecha usa **Claude Haiku** para:
- Responder consultas de viaje en tiempo real
- Sugerir destinos según perfil del usuario
- Recopilar información para derivar al equipo humano

Configura `VITE_ANTHROPIC_API_KEY` en `.env` para activarlo.

---

## Formulario de contacto

En el MVP, el formulario usa `mailto:` para abrir el cliente de correo del usuario.
Para una integración más profesional (sin depender del cliente de correo), reemplazá la función `handleSubmit` en `LeadCaptureForm.jsx` con una llamada a:
- [Resend](https://resend.com) (free tier: 100 emails/día)
- [EmailJS](https://emailjs.com) (free tier, funciona sin backend)
- PHP `mail()` vía endpoint en Hostinger

---

## Actualizar contenido (sin conocimientos técnicos)

Los textos principales están en los propios componentes como strings literales.
Para cambios simples:
1. Abrí el archivo del componente correspondiente
2. Buscá el texto que querés cambiar
3. Editalo y guardá
4. Ejecutá `npm run build` y subí el `dist/` actualizado

---

## Próximos pasos sugeridos

- [ ] Blog SEO (guías de destinos del Norte Argentino)
- [ ] Integración con sistema de email (Resend/EmailJS)
- [ ] Google Analytics / Meta Pixel
- [ ] Área de clientes con itinerarios
- [ ] Proxy PHP para chatbot seguro en producción
- [ ] Reseñas verificadas de Google en sección Testimonios
