const products = [
    {
      id: 1,
      nombre: "Tartera N 20",
      img: ["img/productos/moldes/tarteraDesmontableN20.webp", "img/productos/moldes/tarteraDesmontableN20_1.webp", "img/productos/moldes/tarteraDesmontableN20_2.webp", "img/productos/moldes/tarteraDesmontableN20_3.webp", "img/productos/moldes/tarteraDesmontableN20_4.webp"],
      detalle: "Tartera desmontable antiadherente",
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
      precio: 3800,
    },
    {
      id: 2,
      nombre: "Asadera Molde Rectangular The Kitchen Antiadherente 32cm Color Gris",
      img: ["img/productos/moldes/molde_acero.png","img/productos/moldes/molde_acero1.webp", "img/productos/moldes/molde_acero2.webp", "img/productos/moldes/molde_acero3.webp", "img/productos/moldes/molde_acero4.webp"],
      detalle: "Molde rectangular antiadherente",
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
      precio: 4000,
    },
    {
      id: 3,
      nombre: "Tartera",
      img: ["img/productos/moldes/tartera_silicona.png", "img/productos/moldes/tartera_silicona1.png"],
      detalle: "Tartera de silicona",
      descripcion: `Molde de Silicona Flexible

- Ventajas y Características:
- Apto para utilizar en hornos, microondas, heladera y lavavajillas
- Total anti adherencia: no necesita enmantecar el molde.
- Requiere menos tiempo de cocción.
- No retiene olores ni sabores.
- Irrompible, se puede plegar y ocupa poco espacio de almacenaje.
- Directo al horno. Soporta temperaturas hasta 280 grados.

`,
      precio: 4000,
    },
    {
      id: 4,
      nombre: "Bandeja",
      img: ["img/productos/platos/bandeja_oval_floreada.png"],
      detalle: "Bandeja oval floreada",
      descripcion: `Bandeja oval 25cm x 18cm aprox. Melamina`,
      precio: 1500,
    },
    {
      id: 5,
      nombre: "Bandeja",
      img: ["img/productos/platos/bandeja_oval_verde_claro.png"],
      detalle: "Bandeja oval mandala",
      descripcion: `Bandeja oval 25cm x 18cm aprox. Melamina`,
      precio: 1500,
    },
    {
      id: 6,
      nombre: "Bandeja",
      img: ["img/productos/platos/bandeja_oval_verde.png"],
      detalle: "bandeja oval mandala",
      descripcion: `Bandeja oval 25cm x 18cm aprox. Melamina`,
      precio: 1500,
    },
    {
      id: 7,
      nombre: "Guantes de Silicona",
      img: ["img/productos/guantes/guantes.webp", "img/productos/guantes/guantes1.webp", "img/productos/guantes/guantes2.webp", "img/productos/guantes/guantes3.webp", "img/productos/guantes/guantes4.webp"],
      detalle: "Guantes para lavar",
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
      precio: 3500,
    },
    {
      id: 8,
      nombre: "Remera Champion Deportiva",
      img: ["img/productos/ropa/remeraChampion.webp", "img/productos/ropa/remeraChampion1.webp", "img/productos/ropa/remeraChampion2.webp", "img/productos/ropa/remeraChampion3.webp"],
      detalle: "T M",
      descripcion: `Género: Hombre
                    Edad: Adulto
                    Color predominante: Anaranjado
                    Material Principal: Algodón
                    Temporada: 23-Q4`,
      precio: 15000,
    },
    {
      id: 9,
      nombre: "Mini Linterna",
      img: ["img/productos/varios/linterna.png", "img/productos/varios/linterna1.png", "img/productos/varios/linterna2.png"],
      detalle: "Mini Linterna 9 Leds",
      descripcion: ``,
      precio: 8000,
    },
    {
      id: 10,
      nombre: "Nebulizador SAN-UP",
      img: ["img/productos/nebulizador/nebulizador0.webp", "img/productos/nebulizador/nebulizador1.png", "img/productos/nebulizador/nebulizador2.png", "img/productos/nebulizador/nebulizador3.png", "img/productos/nebulizador/nebulizador4.png"],
      detalle: "Nebulizador",
      descripcion: ``,
      precio: 4000,
    },
    {
      id: 11,
      nombre: "Corta Pizza",
      img: ["img/productos/utensillos/cortaPizza.webp", "img/productos/utensillos/cortaPizza1.webp", "img/productos/utensillos/cortaPizza2.webp", "img/productos/utensillos/cortaPizza3.webp"],
      detalle: "Cortador de Pizza",
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
      precio: 1500,
    },
    {
      id: 12,
      nombre: "Abre Latas",
      img: ["img/productos/utensillos/abreLata.png", "img/productos/utensillos/abreLata1.png"],
      detalle: "Abre Latas The Kitchen Elements",
      descripcion: ``,
      precio: 2000,
    },
  ];