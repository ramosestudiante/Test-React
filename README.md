# Proyecto React con TypeScript, Vite y Tailwind CSS

Este es un proyecto de Prueba Frontend que utiliza **React**, **TypeScript**, **Vite** y **Tailwind CSS** como tecnologías principales.

## Requisitos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) (gestor de paquetes)

## Instalación

Sigue estos pasos para configurar el proyecto localmente.

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio

2. **Copia el .env.example:**

   ```
   copia el contenido del archivo a un archivo que crees que sea .env

3. **Inicia el proyecto con:**

   ```
   npm i
   ``` 
   para instalar todas las dependencias
   ```
   npm run dev 
   ```
   para levantar el proyecto


## Inicia con Docker

 **En el proyecto hay un makeFile:**

   Este makeFile es un archivo de script para automatizar el trabajo con Docker:
   ```
   make run-local 
   ```
   incias el contenedor de docker para este proyecto
   el cual instala las dependencias que estan en el proyecto y con la version de node utilizada


## Decisiones Técnicas y Arquitectónicas

### ¿Cómo decidiste las opciones técnicas y arquitectónicas utilizadas como parte de su solución?

Para este proyecto,decidi utilizar React con Typescript y Vite , ya que Typescript me permite tipados para la deteccion de errores y mejora la mantenibilidad de codigo.

En cuanto a la arquitectura utilizada comenze organizando el proyecto de acuerdo a patrones de diseño, estableciendo una estructura de carpetas clara y modular.Para manejar el estado global, use Redux ya que facilita la gestion de estados,Ademas
las rutas de la aplicacion se gestionan a travez de react router lo que permite una navegacion entre las diferentes vistas del proyecto.
Tambien implemente un sistema de servicios para interactuar con la API externa de libros, lo cual permite una separacion clara entre la logica de negocio y la interfaz de usuario. En cuanto a la interfaz de usuario organize componentes en carpetas como pages,components y layouts para mantener el enfoque limpio y escalable, asegurando que sean componentes reutilizables.

Con estos patrones de diseño me asegure de que el proyecto sea escalable y facil de mantener, permitiendo agregar nuevas funcionalidades o mejorar las existentes sin comprometer la calidad de codigo.


### ¿Hay alguna mejora que dejaste pendiente de hacer en su envío?

Algunas mejoras que podrían haberse implementado incluyen:

- Añadir más pruebas unitarias e integradas utilizando herramientas como **Jest** o **React Testing Library**, para asegurar la fiabilidad de los componentes.

### ¿Qué harías de manera diferente si se le asignara más tiempo?

Con más tiempo, consideraría lo siguiente:

- **Optimización del rendimiento**: Implementaría la carga diferida de componentes con React Lazy y Suspense para reducir el tiempo de carga inicial y mejorar la experiencia de usuario.
- **Integración de una base de datos**: Si el proyecto fuera más grande, incluiría una base de datos y crear una API para manejar la persistencia de datos. ya que la API de libros no era muy consistente.
- **Mejoras en el diseño**: Incluiría más características de diseño responsivo, asegurando que la aplicación se vea bien en una variedad de dispositivos, desde móviles hasta escritorios.
