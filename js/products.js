const products = [
  {
    id: 1,
    nombre: "BUZO CHAMPION HOMBRE",
    img: [
      "img/productos/ropa/buzoChampionGrey.webp",
      "img/productos/ropa/buzoChampionGrey1.webp",
      "img/productos/ropa/buzoChampionGrey2.webp",
      "img/productos/ropa/buzoChampionGrey3.jpg",
      "img/productos/ropa/buzoChampionGrey4.jpg",
    ],
    detalle: "Champion",
    descripcion: `
Especificaciones generales

Género: Hombre
Edad: Adulto
Color predominante: Gris
Material Principal: Algodón
Temporada: 24-Q3
Talle XS:     
`,
    stock: 1,
    precio: 45000,
    precioOferta: 28000,
  },

  {
    id: 2,
    nombre: "BUZO CHAMPION",
    img: [
      "img/productos/ropa/buzoChampionNegro.webp",
      "img/productos/ropa/buzoChampionNegro1.webp",
      "img/productos/ropa/buzoChampionNegro2.webp",
    ],
    detalle: "Champión",
    descripcion: `
SKU	CHHCOGF88H01-006
Marca:	Champion
Color:	Negro
Diseño: Tela	Liso
Género:	Hombre
Material:	Algodón
Modelo:	Cuello redondo
Bolsillos	-
Calce:	Regular Fit
Temporada:	Atemporal
Talle: M`,
    stock: 1,
    precio: 48000,
    precioOferta: 40000,
  },

  {
    id: 3,
    nombre: "BUZO CHAMPION",
    img: [
      "img/productos/ropa/buzoChampionLetras.webp",
      "img/productos/ropa/buzoChampionLetras1.webp",
      "img/productos/ropa/buzoChampionLetras2.webp",
      "img/productos/ropa/buzoChampionLetras3.webp",
    ],
    detalle: "Champión",
    descripcion: `
Buzo Champion Con Capucha Estampado

Estilo y comodidad

El Buzo Champion Logo es la definición de estilo y comodidad. Este buzo destaca por su diseño moderno y el icónico logo de Champion estampado. Los puños con diseño a rayas de colores añaden un toque de estilo único y vibrante, haciendo que este buzo sea perfecto para cualquier ocasión. Confeccionado con materiales de alta calidad, proporciona una sensación suave y cómoda. Ya sea para relajarte en casa o para salir con amigos, el Buzo Champion Logo asegura un look casual pero elegante que nunca pasa de moda.

Talle: M`,
    stock: 1,
    precio: 68799,
    precioOferta: 55000,
  },

  {
    id: 4,
    nombre: "REMERA CHAMPIÓN",
    img: [
      "img/productos/ropa/remeraChampionNegra.webp",
      "img/productos/ropa/remeraChampionNegra1.webp",
    ],
    detalle: "Champion",
    descripcion: `
Especificaciones generales

Talle: XS
Género: Hombre
Edad: Adulto
Color predominante: Negro
Material Principal: Algodón
Temporada: 24-Q2
`,
    stock: 1,
    precio: 29099,
    precioOferta: 22000,
  },

  {
    id: 5,
    nombre: "PANTALON CHAMPIÓN UNISEX",
    img: [
      "img/productos/ropa/pantalonChampionBordo.jpeg",
      "img/productos/ropa/pantalonChampionBordo1.jpeg",
      "img/productos/ropa/pantalonChampionBordo2.jpeg",
      "img/productos/ropa/pantalonChampionBordo3.jpeg",
    ],
    detalle: "Champión",
    descripcion: `
Género: Unisex
Color: Rojo
Disciplina: Moda
Marca: CHAMPIÓN
Talle: M
`,
    stock: 1,
    precio: 85700,
    precioOferta: 40000,
  },
  {
    id: 10,
    nombre: "PANTALON JOGGER NEGRO",
    img: [
      "img/productos/ropa/pantalonChampionNegro.jpg",
      "img/productos/ropa/pantalonChampionNegro1.jpg",
      "img/productos/ropa/pantalonChampionNegro2.jpg",
    ],
    detalle: "Champión",
    descripcion: `
Pantalón Deportivo CH Hombre Logo estampado

Cintura con elastico reforzado

Detalle de puños al tobillo 

Corte Jogger 

con bolsillos laterales

Detalle en pierna de firma champion engomado 

Confeccionado en Algodón

Temporada	Atemporal

Colores 👇

NEGRO


Talles 👇👇

XS`,
    stock: 0,
    precio: 45000,
    precioOferta: 40000,
  },
  {
    id: 25,
    nombre: "PANTALON JOGGER AZUL",
    img: [
      "img/productos/ropa/pantalonAzulChampion.jpg",
      "img/productos/ropa/pantalonAzulChampion1.webp",
      "img/productos/ropa/pantalonAzulChampion2.webp",
    ],
    detalle: "Champión",
    descripcion: `
Características técnicas
Detalles:
Actividad: Moda
Características Técnicas:
Adecuado para: Todo el día.
Material: Algodón.
Cintura: Con Elástico y Cordón.
Bolsillo: Con Bolsillo.
Estilo de indumentaria: Liso.
Composición: 100% Algodón.
Color: Negro.
Talle: M`,
    stock: 1,
    precio: 40000,
    precioOferta: 28000,
  },
  {
    id: 26,
    nombre: "PANTALON JOGGER NEGRO",
    img: [
      "img/productos/ropa/pantalonMujerChampion.webp",
      "img/productos/ropa/pantalonMujerChampion1.webp",
      "img/productos/ropa/pantalonMujerChampion2.webp",
    ],
    detalle: "Champión",
    descripcion: `
Género:     Mujer
Color:      Negro
Disciplina: Moda
Marca:      CHAMPION
Talle:      XS`,
    stock: 1,
    precio: 38000,
    precioOferta: 20000,
  },

  {
    id: 6,
    nombre: "REMERA CHAMPION",
    img: [
      "img/productos/ropa/remeraChampionNaranja.webp",
      "img/productos/ropa/remeraChampionNaranja1.webp",
      "img/productos/ropa/remeraChampionNaranja2.webp",
    ],
    detalle: "Champión",
    descripcion: `Remera Champion

La remera Champion es una prenda básica y esencial, confeccionada con algodón de alta calidad que garantiza comodidad y suavidad durante todo el día. Su diseño clásico y versátil la convierte en una opción ideal para cualquier ocasión, ya sea para actividades casuales o deportivas. El tejido de algodón permite una excelente transpirabilidad, manteniéndote fresco y cómodo. Con un ajuste perfecto, esta remera es una elección confiable para quienes buscan una combinación de estilo y confort en su vestimenta diaria.

Especificaciones

talle:        M 
material:     algodón rustico
color:        naranja
género:       hombre
disciplina:   casual
marca:        champion
`,
    stock: 1,
    precio: 29099,
    precioOferta: 22000,
  },
  {
    id: 27,
    nombre: "REMERA CHAMPION S/MANGA",
    img: [
      "img/productos/ropa/musculosaChampion.jpg",
      "img/productos/ropa/musculosaChampion1.jpg",
      "img/productos/ropa/musculosaChampion2.jpg",
    ],
    detalle: "Champión",
    descripcion: `
Especificaciones

Marca	Champion
Color	Gris 
Género	Hombre
Diseño Tela	Liso
Bolsillos	1
Largo manga	Sin manga
Modelo	Con capucha
Calce	Regular Fit
Material	Algodón
Temporada	Atemporal
Talle: XS
`,
    stock: 1,
    precio: 20000,
    precioOferta: 16000,
  },
  {
    id: 11,
    nombre: "REMERA CHAMPIÓN",
    img: [
      "img/productos/ropa/remeraChampion.webp",
      "img/productos/ropa/remeraChampion1.webp",
    ],
    detalle: "Champión",
    descripcion: `
Género: Hombre
Edad: Adulto
Talle: M
Color predominante: Anaranjado
Material Principal: Algodón
Temporada: 23-Q4`,
    stock: 0,
    precio: 20000,
    precioOferta: 15000,
  },
  {
    id: 7,
    nombre: "CAMPERA CHAMPION ROMPEVIENTO",
    img: [
      "img/productos/ropa/camperaChampionAzul.webp",
      "img/productos/ropa/camperaChampionAzul1.webp",
      "img/productos/ropa/camperaChampionAzul2.webp",
      "img/productos/ropa/camperaChampionAzul3.webp",
    ],
    detalle: "Champion",
    descripcion: `
Características generales
Género: Hombre
Marca: Champion
Modelo: Full Zip
Talle: S

Otras características
Composición: 100% Poliéster
Es impermeable: No
Es térmica: No
Usos recomendados: Urbano
Cantidad de bolsillos externos: 2
Material principal: Poliéster
Es ultra liviana: Si
Con bolsillos: Si
Con capucha: Si

Características principales
Tipo de prenda: Campera Rompeviento
Edad: Adulto
Color: Azul marino
SKU: CHICHHV1015549369072   
`,
    stock: 0,
    precio: 40000,
    precioOferta: 35000,
  },

  {
    id: 10,
    nombre: "REMERA CHAMPIÓN",
    img: [
      "img/productos/ropa/remeraChampionGris.jpg",
      "img/productos/ropa/remeraChampionGris1.jpg",
    ],
    detalle: "Champión",
    descripcion: `Complementá tu look con CHAMPION.
Logo CHAMPION estampado y aplicado.

Especificaciones generales

Talle: M y S
Género: Hombre
Edad: Adulto
Color predominante: Gris
Material Principal: Algodón
Temporada: 24-Q2`,
    stock: 2,
    precio: 29099,
    precioOferta: 22000,
  },

 



  {
    id: 8,
    nombre: "BUZO CHAMPIÓN DAMA",
    img: [
      "img/productos/ropa/buzoBeigeChampion.webp",
      "img/productos/ropa/buzoBeigeChampion1.webp",
      "img/productos/ropa/buzoBeigeChampion2.webp",
      "img/productos/ropa/buzoBeigeChampion3.webp",
    ],
    detalle: "Champión",
    descripcion: `
BUZO CHAMPION DEPORTIVO DE MUJER
ICHMWL9307 006

Características del producto

Talle: M
Marca: Champion
Material principal: Algodón
Capucha: Sí
Modelo: DEPORTIVO
Género: Mujer
Edad: Adultos
Tipo de prenda: Hoodie


Usos recomendados: Urbano
Material principal: Algodón
Composición: 100% algodón
`,
    stock: 1,
    precio: 72000,
    precioOferta: 50000,
  },

  {
    id: 12,
    nombre: "SHORT RUSTICO CHAMPION",
    img: [
      "img/productos/ropa/shortBlanco.webp",
      "img/productos/ropa/shortBlanco1.webp",
      "img/productos/ropa/shortBlanco2.webp",
      "img/productos/ropa/shortBlanco3.webp",
    ],
    detalle: "Champion",
    descripcion: `
SHORT RUSTICO CHAMPION MUJER XL

Cintura con elastico alto,Bolsillos laterales sin cierre,Diseño de short corto
Material Algodon
Color    Blanco
Talle    L   
`,
    stock: 1,
    precio: 33000,
    precioOferta: 20000,
  },

  {
    id: 9,
    nombre: "CAMPERA CHAMPIÓN",
    img: [
      "img/productos/ropa/camperaChampionGris.jpg",
      "img/productos/ropa/camperaChampionGris1.jpg",
      "img/productos/ropa/camperaChampionGris2.jpg",
      "img/productos/ropa/camperaChampionGris3.jpg",
    ],
    detalle: "Champión",
    descripcion: `Destacá tu estilo con CHAMPION.
Capucha con cordón de ajuste.
Cintura y puños elastizados.
Posee cierre frontal.
Bolsillos laterales.
Logo CHAMPION aplicado y estampado.
    Campera clásica con capucha.

Talle M
`,
    stock: 0,
    precio: 60699,
    precioOferta: 35000,
  },

 



  {
    id: 13,
    nombre: "CONJUNTO LOTTO",
    img: [
      "img/productos/ropa/conjuntoLotto.png",
      "img/productos/ropa/conjuntoLotto0.jpeg",
      "img/productos/ropa/conjuntoLotto1.jpeg",
      "img/productos/ropa/conjuntoLotto2.jpeg",
    ],
    detalle: "Lotto",
    descripcion: `
Género: Mujer
Edad: Adulto
Talle: S
Color predominante: Lila y Negro

********************************

Atencion! este es un producto usado pero en excelente estado
es un conjunto marca Lotto Original!`,
    stock: 1,
    precio: 30000,
    precioOferta: 25000,
  },

  {
    id: 14,
    nombre: "BUZO CHAMPION C/ CAPUCHA",
    img: [
      "img/productos/ropa/buzoChampionGris.webp",
      "img/productos/ropa/buzoChampionGris1.webp",
      "img/productos/ropa/buzoChampionGris2.webp",
    ],
    detalle: "Champión",
    descripcion: `
Productos 100% originales.
Buzo Champion Logo Jersey Rustico C/ Capucha Casual Urbano.

Edad: Adultos
Tipo de prenda: Hoodie
Material principal: Algodón
Con capucha: Sí
Es oversize: Sí
Tipo de tela: Algodón
Composición: 100% algodón
Usos recomendados: Urbano

TALLE XS`,
    stock: 1,
    precio: 42000,
    precioOferta: 26000,
  },

  {
    id: 15,
    nombre: "NEBULIZADOR SAN-UP",
    img: [
      "img/productos/nebulizador/nebulizador0.webp",
      "img/productos/nebulizador/nebulizador1.webp",
      "img/productos/nebulizador/nebulizador2.png",
      "img/productos/nebulizador/nebulizador3.png",
      "img/productos/nebulizador/nebulizador4.png",
    ],
    detalle: "San-Up",
    descripcion: `
El nebulizador San-Up 3058 Micrón está indicado para diferentes afecciones respiratorias. Convierte el medicamento líquido en vapor para ser inhalado y hace que llegue directamente a las zonas afectadas provocando menores efectos secundarios y mayor eficacia.

La salud de tu familia en buenas manos
Al ser ultrasónico, es ligero y su tamaño es reducido. Te permite realizar la nebulización de grandes cantidades de líquido de forma rápida y con menos ruido que aquellos que funcionan a pistón. Su uso resulta excelente para los niños que se inquietan fácilmente con este tipo de tratamientos. Es ideal para disminuir la inflamación de la garganta, facilitar el paso del aire por la laringe y normalizar la frecuencia respiratoria.

Trae accesorios
Además, para posibilitar su funcionamiento cuenta con boquilla.

Sistema monocámara
Esta característica hace posible administrar directamente el fármaco o la solución fisiológica, sin necesidad de agregar agua.

Dimensiones: 1.2kg de ancho, 125mm de alto, 175mm de profundidad.

*********************************************************

Este es un producto usado pero en excelente estado!

La primer imagen es ilustrativa no es una foto real
`,
    stock: 1,
    precio: 234000,
    precioOferta: 40000,
  },

  {
    id: 16,
    nombre: "BANDEJA OVAL",
    img: [
      "img/productos/platos/bandeja_oval_floreada.png",
      "img/productos/platos/bandeja_oval_verde_claro.png",
      "img/productos/platos/bandeja_oval_verde.png",
    ],
    detalle: "The Kitchen Elements",
    descripcion: `Bandeja oval 25cm x 18cm aprox. Melamina`,
    stock: 0,
    precio: 3000,
    precioOferta: 1500,
  },

  /* {
    id: 17,
    nombre: "TARTERA DE SILICONA",
    img: [
      "img/productos/moldes/tarteraSilicona.png",
      "img/productos/moldes/tarteraSilicona1.png",
      "img/productos/moldes/tarteraSilicona3.jpeg",
    ],
    detalle: "The Kitchen Elements",
    descripcion: `Molde de Silicona Flexible

- Ventajas y Características:
- Apto para utilizar en hornos, microondas, heladera y lavavajillas
- Total anti adherencia: no necesita enmantecar el molde.
- Requiere menos tiempo de cocción.
- No retiene olores ni sabores.
- Irrompible, se puede plegar y ocupa poco espacio de almacenaje.
- Directo al horno. Soporta temperaturas hasta 280 grados.

`,
    stock: 8,
    precio: 3500,
  }, */
  /*  {
    id: 18,
    nombre: "BATIDOR MANUAL",
    img: [
      "img/productos/utensillos/batidor.webp",
      "img/productos/utensillos/batidor1.webp",
      "img/productos/utensillos/batidor2.webp",
      "img/productos/utensillos/batidor3.webp",
    ],
    detalle: "The Kitchen Elements",
    descripcion: `
Fuerte y duradero: este batidor de cocina está hecho de acero inoxidable duradero de alta calidad y pera de silicona que no rayan los platos.

Diseño ergonómico para un excelente equilibrio y control para una diferencia que realmente puedes sentir en la mano.

Multifuncional: los batidores de globos hacen que cocinar sea mucho más fácil y agradable.
Fácil de almacenar: los extremos del mango de acero inoxidable son fáciles de colgar en cualquier gancho de tu cocina, lo que permite un fácil almacenamiento. Imprescindible para cocineros caseros y chefs de restaurantes.

Material del batidor: Silicona
Material del mango: Acero inoxidable
Largo total: 25 cm
`,
    stock: 0,
    precio: 2000,
  },
 */
  {
    id: 17,
    nombre: "ASADERA MOLDE RECTANGULAR",
    img: [
      "img/productos/moldes/molde_acero.png",
      "img/productos/moldes/molde_acero1.webp",
      "img/productos/moldes/molde_acero2.webp",
      "img/productos/moldes/molde_acero3.webp",
      "img/productos/moldes/molde_acero4.webp",
    ],
    detalle: "The Kitchen Elements",
    descripcion: `ASADERA ANTIADHERENTE THE KITCHEN LINEA YO COCINO

Disfruta del aroma del pan o de la torta al horno que llena la casa con las mejores sensaciones. Para un mejor resultado de tus recetas, es importante la calidad de las asaderas y moldes.

El espesor del acero y las capas de antiadherente de esta linea permiten una cocción uniforme, dejando tus creaciones más sabrosas.

Con diferentes formatos, se pueden utilizar en hornos a gas y eléctricos y son aptos para lavavajillas. Se caracteriza por ser un teflón reforzado, de mayor durabilidad asegurando una cocción rápida y uniforme.

CARACTERISTICAS
Fácil de limpiar
Acero con revestimiento antiadherente
Apto para lavavajillas
Material: Teflón
Linea: Yo Cocino
Medidas: 32x22x4.5cm`,
    stock: 0,
    precio: 6500,
    precioOferta: 4000,
  },
  {
    id: 18,
    nombre: "TARTERA DESMONTABLE ANTIADHERENTE",
    img: [
      "img/productos/moldes/tarteraDesmontableN20.webp",
      "img/productos/moldes/tarteraDesmontableN20_1.webp",
      "img/productos/moldes/tarteraDesmontableN20_2.webp",
      "img/productos/moldes/tarteraDesmontableN20_3.webp",
      "img/productos/moldes/tarteraDesmontableN20_4.webp",
    ],
    detalle: "The Kitchen Elements",
    descripcion: `
Molde Tartera 20cm Base Desmontable Teflón Antiadherente Color Gris

TARTERA CON BASE DESMONTABLE ANTIADHERENTE THE KITCHEN LINEA YO COCINO

El aroma de tus tartas o postres llena la casa con las mejores sensaciones. Para un mejor resultado de sus recetas, observe la calidad de las asaderas y moldes.

El espesor del acero y las capas de antiadherente de esta linea permiten cocción uniforme, dejando sus creaciones más sabrosas.

Con diferentes formatos, se pueden utilizar en hornos a gas y eléctricos y llevarse a lavavajillas. Se caracteriza por ser un teflón reforzado, de mayor durabilidad asegurando una cocción rápida y uniforme.

CARACTERISTICAS
Fácil de limpiar
Acero con revestimiento antiadherente
Apto para lavavajillas
Material: Teflón
Linea: Yo Cocino
Medidas: 20 Diámetro x 3cm altura`,
    stock: 0,
    precio: 6500,
    precioOferta: 3800,
  },
  {
    id: 28,
    nombre: "MOLDE FLAN DONUTS X6",
    img: [
      "img/productos/moldes/flanera1.webp",
      "img/productos/moldes/flanera4.webp",
      "img/productos/moldes/flanera3.webp",
      "img/productos/moldes/flanera.webp",
      "img/productos/moldes/flanera2.webp",
    ],
    detalle: "The Kitchen Elements",
    descripcion: `
MOLDE IDEAL PARA FLAN O DONATS AL HORNO, X6 UNIDADES EN 1 MOLDE.

El aroma de tus postres llena la casa con las mejores sensaciones. Para un mejor resultado de sus recetas, observe la calidad de las asaderas y moldes.

El espesor del acero y las capas de antiadherente de esta linea permiten cocción uniforme, dejando sus creaciones más sabrosas.

Con diferentes formatos, se pueden utilizar en hornos a gas y eléctricos y llevarse a lavavajillas. Se caracteriza por ser un teflón reforzado, de mayor durabilidad asegurando una cocción rápida y uniforme.

CARACTERISTICAS
Fácil de limpiar
Acero con revestimiento antiadherente
Apto para lavavajillas
Material: Teflón
Linea: Yo Cocino

Otras características
Forma: Rectangular
Material: Acero
Uso recomendado: Repostería
Es apto para lavavajillas: Sí
Incluye tapa: No
Es antiadherente: Sí
Es descartable: No
`,
    stock: 6,
    precio: 10000,
    precioOferta: 5000,
  } /*
  {
    id: 7,
    nombre: "CORTA PIZZA",
    img: [
      "img/productos/utensillos/cortaPizza.webp",
      "img/productos/utensillos/cortaPizza1.webp",
      "img/productos/utensillos/cortaPizza2.webp",
      "img/productos/utensillos/cortaPizza3.webp",
    ],
    detalle: "The Kitchen Elements",
    descripcion: `
  Nuestro cortador de pizza grande tiene un borde afilado y corta con precisión rebanadas de pizza, panes planos, gofres o pasteles sin comprometer las fijaciones o la corteza, hace que cortar más ahorro de trabajo
  
  Diseño ergonómico: la rueda cortadora de pizza está diseñada para un corte cómodo con diseño de mango en ángulo. Se adapta naturalmente a los contornos de tu mano
  
  Limpieza sin problemas: nuestro cortador de ruedas de pizza son que es fácil de usar y mucho más fácil de almacenar con el agujero para colgar.
  
  Otras características
  Material del mango: Plástico
  Material de la rueda: Acero
  Cantidad de ruedas: 1
  Diámetro de la rueda: 7 cm
  Largo total: 19 cm
  Es apto para lavavajillas: No`,
    stock: 0,
    precio: 1500,
  },
 */,
  {
    id: 19,
    nombre: "GUANTES DE SILICONA PAR LAVAR",
    img: [
      "img/productos/varios/guantes.webp",
      "img/productos/varios/guantes1.webp",
      "img/productos/varios/guantes2.webp",
      "img/productos/varios/guantes3.webp",
      "img/productos/varios/guantes4.webp",
    ],
    detalle: "The Kitchen Elements",
    descripcion: `Guantes esponja de limpieza de silicona: ¡es hora de actualizar su esponja de plástico de cocina habitual!

Nuestros guantes están hechos de MATERIAL NATURAL AUTÉNTICO: estos guantes de limpieza de silicona están hechos de materias primas de gel de sílice puro 100% biodegradable , gel de sílice de grado alimenticio 100%, detectado por material de la FDA, que no tiene manchas ni olor.


CARACTERISTICAS:
- Son cómodos y flexibles.
- Colocar directamente el detergente en la palma del guante.
- Los dientes de silicona en la palma permiten llegar a las zonas mas difíciles.
- Gran elasticidad y resistencia.
- Superficie antideslizantes.
- Resistente al aceite y agua.
- SIN BPA
- La resistencia a la temperatura de los productos de gel de sílice es de -40 °C - 230 °C.
- Resistencia al desgaste
- Amigable con el medio ambiente
- Durabilidad, impermeabilidad y fácil limpieza.
- Peso: 140g
- Espesor: 2 cm
- Se puede esterilizar en agua hervida, microondas o lavavajillas.`,
    stock: 6,
    precio: 6034,
    precioOferta: 3500,
  },

  {
    id: 20,
    nombre: "MOLDE SILICONA PARA CUPCAKES",
    img: [
      "img/productos/moldes/molde_muffins.webp",
      "img/productos/moldes/molde_muffins1.webp",
      "img/productos/moldes/molde_muffins2.webp",
      "img/productos/moldes/molde_muffins3.webp",
      "img/productos/moldes/molde_muffins4.webp",
      "img/productos/moldes/molde_muffins5.webp",
    ],
    detalle: "The Kitchen Elements",
    descripcion: `
Molde siliconado para postres, cupcakes y más, resistente al calor y super flexible, antiadherente, fácil de lavar y almacenar, disponible en varios colores

Características principales
Marca:	The Kitchen Life
Línea:	yo cocino
Modelo:	Cupcake
Cantidad de ranuras:	6
Capacidad en volumen:	600 mL
Material: Silicona
Uso recomendado: hornear
Es apto para lavavajillas: Sí
Incluye tapa: No
`,
    stock: 20,
    precio: 6500,
    precioOferta: 4000,
  },
  {
    id: 21,
    nombre: "MINI LINTERNA 9 LEDS",
    img: [
      "img/productos/varios/linterna.png",
      "img/productos/varios/linterna1.webp",
      "img/productos/varios/linterna2.png",
    ],
    detalle: "Sylvania",
    descripcion: `Práctica linterna de mano ideal para llevar a todos lados. Con sus 9 leds tiene una gran potencia de iluminación.
  Es liviana y su cuerpo de aluminio la hace resistente pero a la vez portable y de fácil manipulación, resistente al agua y antideslizante.
  Es bajo consumo y utiliza pilas triple AAA (No vienen incluidas)`,
    stock: 2,
    precio: 9000,
    precioOferta: 5000,
  },

  {
    id: 22,
    nombre: "PISA PAPAS DE ACERO ",
    img: [
      "img/productos/utensillos/pisaPapas.png",
      "img/productos/utensillos/pisaPapas1.png",
    ],
    detalle: "The Kitchen Elements",
    descripcion: ``,
    stock: 5,
    precio: 7000,
    precioOferta: 3500,
  },

  {
    id: 23,
    nombre: "BOMBILLAS",
    img: ["img/productos/utensillos/bombillas.png"],
    detalle: "Bombillas Varios Colores",
    descripcion: `Bombillas de acero distintos tipos de colores!

Elegi el que mas te guste!`,
    stock: 20,
    precio: 2000,
    precioOferta: 1000,
  },

  {
    id: 24,
    nombre: "ESPUMADERA NYLON C/ MANGO ACERO",
    img: [
      "img/productos/utensillos/espumaderaNegra.webp",
      "img/productos/utensillos/espumaderaNegra1.webp",
      "img/productos/utensillos/espumaderaNegra2.webp",
      "img/productos/utensillos/espumaderaNegra3.webp",
    ],
    detalle: "The Kitchen Elements",
    descripcion: `
Largo total: 35 cm
Material del mango: Acero
Material de la espumadera: Nylon
Es apto para lavavajillas: Sí

UTENSILIO DE COCINA ESPUMADERA

LINEA PREMIUM MANGO DE ACERO INOXIDABLE Y NYLON    
`,
    stock: 2,
    precio: 4300,
    precioOferta: 2000,
  },
/*   {
    id: 29,
    nombre: "LUCES NAVIDEÑAS LED 100",
    img: [
      "img/productos/varios/lucesNavideñas.webp",
      "img/productos/varios/lucesNavideñas1.webp",
      "img/productos/varios/lucesNavideñas2.webp",
    ],
    detalle: "The Kitchen Elements",
    descripcion: `
100 Luces Led Multicolor en caja x unidad.

• Medidas: Largo 10 mts.
• Color: Cable Verde.
• Bajo consumo.
• Larga duración.
• Luz fría, no generan calor.
• Con 8 funciones, utilice el botón para elegir una especifica.    
`,
    stock: 2,
    precio: 4300,
    precioOferta: 2000,
  }, */
];
