# AllShop

Bienvenido a **AllShop**, tu ecommerce completo para adquirir productos de calidad en un entorno intuitivo y fácil de usar. Este proyecto está diseñado para ofrecer una experiencia de compra moderna, eficiente y atractiva.

## Características principales

- **Catálogo dinámico de productos:** Explora una amplia variedad de productos con información detallada.
- **Carrito de compras interactivo:** Agrega, elimina o ajusta la cantidad de productos en tiempo real.
- **Cálculo de totales y descuentos:** Aplica cupones de descuento y visualiza el total actualizado.
- **Integración con WhatsApp:** Finaliza tu compra enviando un mensaje directo con los productos seleccionados y el total.
- **Responsive Design:** Compatible con dispositivos móviles, tablets y escritorio.

## Tecnologías utilizadas

- **HTML5 y CSS3:** Para la estructura y estilos visuales.
- **JavaScript:** Para la interacción y funcionalidades dinámicas.
- **Swiper.js:** Carrusel interactivo para productos destacados.
- **SweetAlert2:** Alertas personalizadas y amigables para los usuarios.
- **Tawk.to:** Chat en vivo para atención al cliente.

## Cómo instalar y ejecutar

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/AngelChaile/AllShop.git
   ```

2. **Abre el proyecto en tu editor de texto favorito.**

3. **Visualiza el proyecto en tu navegador:**
   - Puedes abrir el archivo `index.html` directamente en tu navegador.
   - O utiliza una extensión como Live Server para una mejor experiencia.

## Estructura del proyecto

```plaintext
Ecommerce/
├── index.html            # Página principal
├── productDetails.html   # Detalles de productos
├── cart.html             # Carrito de compras
├── about.html            # Información sobre AllShop
├── contact.html          # Formulario de contacto
├── css/
│   └── styles.css        # Estilos personalizados
├── js/
│   ├── menu.js           # Menú interactivo
│   ├── cart.js           # Lógica del carrito
│   ├── products.js       # Gestión de productos
│   ├── productDetails.js # Detalles del producto
│   └── alerts.js         # Alertas personalizadas
└── images/
    └── ...              # Imágenes de productos y diseño
```

## Funcionalidades destacadas

### Carrito de compras
- Muestra los productos agregados, el subtotal y el total con descuentos aplicados.
- Evita que se agregue más cantidad de productos de los disponibles en stock.
- Incluye un botón para finalizar la compra a través de WhatsApp.

### Finalización de compra por WhatsApp
- Al presionar el botón **Finalizar compra**, se genera un mensaje automático con el listado de productos y el total actualizado, listo para enviarse.

### Diseño responsive
- La interfaz se adapta perfectamente a cualquier dispositivo, brindando una experiencia fluida y amigable.

## Contribución

Si deseas contribuir a **AllShop**, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad o mejora:
   ```bash
   git checkout -b nombre-de-la-rama
   ```
3. Realiza tus cambios y realiza un commit:
   ```bash
   git commit -m "Descripción de los cambios"
   ```
4. Envía tus cambios:
   ```bash
   git push origin nombre-de-la-rama
   ```
5. Abre un Pull Request en este repositorio.

## Licencia

Este proyecto está bajo la licencia MIT. Puedes ver más detalles en el archivo LICENSE incluido en este repositorio.

---

¡Gracias por visitar **AllShop**! Si tienes preguntas, comentarios o sugerencias, no dudes en comunicarte a través del formulario de contacto o del chat en vivo en la página. 😊
