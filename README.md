

## Objetivo del Proyecto

- La idea general era crear una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa [spoonacular](https://spoonacular.com/food-api) y a partir de ella poder, entre otras cosas:

  - Buscar recetas
  - Filtrarlas / Ordenarlas
  - Crear nuevas recetas propias
  - Creación y logueo de usuarios
  - Autenticación (JWT)


#### Tecnologías que se implementaron:
- [ ] React
- [ ] Redux Toolkit
- [ ] Express
- [ ] MongoDB
- [ ] Css Puro

#### Features


__Pagina inicial__: Una landing page con
- [ ] Un video de fondo representativo al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: Contiene
- [ ] Input de búsqueda para encontrar recetas por nombre
- [ ] Área donde se ve el listado de recetas. Muestra:
  - Imagen
  - Nombre
  - Cantidad de comensales
  - Tiempo de preparación
- [ ] Botones/Opciones para filtrar por por tipo de dieta
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
- [ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.



__Ruta de detalle de receta__: Contiene
- [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
- [ ] Resumen del plato
- [ ] Puntuación
- [ ] Nivel de "comida saludable"
- [ ] Paso a paso

__Ruta de creación de recetas__: Contiene
- [ ] Un formulario __controlado__ con los siguientes campos
  - Nombre
  - Resumen del plato
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
- [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
- [ ] Botón/Opción para crear una nueva receta

#### Base de datos

El modelo de la base de datos contiene las siguientes entidades (Aquellas propiedades marcadas con asterisco son obligatorias):

- [ ] Receta con las siguientes propiedades:
  - ID: *
  - Nombre *
  - Resumen del plato *
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
- [ ] Tipo de dieta con las siguientes propiedades:
  - ID
  - Nombre


#### Backend

Se desarrolló un servidor en Node/Express con las siguientes rutas:


- [ ] __GET /recipes?name="..."__:
  - Obtiene un listado de las recetas que contengan la palabra ingresada como query parameter
  - Si no existe ninguna receta muestra un mensaje adecuado
- [ ] __GET /recipes/{idReceta}__:
  - Obtiene el detalle de una receta en particular
  - Trae solo los datos pedidos en la ruta de detalle de receta
  - Incluye los tipos de dieta asociados
- [ ] __GET /types__:
  - Obtiene todos los tipos de dieta posibles
- [ ] __POST /recipe__:
  - Recibe los datos recolectados desde un formulario controlado de la ruta de creación de recetas por body
  - Crea una receta en la base de datos

## Como correr el proyecto


En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `food`

El contenido de `client` fue creado usando: Create React App.


![Api-Food](https://user-images.githubusercontent.com/84089185/146578294-bebdafc2-796b-4be7-b433-1d289a4bcd30.png)
![Api-Food1](https://user-images.githubusercontent.com/84089185/146578307-9579a835-7b6c-48e0-b6b3-62f2c60e1299.png)
![Api-Food2](https://user-images.githubusercontent.com/84089185/146578319-4b85c979-2939-435a-a8ac-cb4e71cee679.png)


### Ingresa a la app desde [Aqui](https://healthy-recipes.vercel.app/)
