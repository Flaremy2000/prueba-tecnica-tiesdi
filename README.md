# Prueba Técnica Tiesdi - Gestor de Personas

Esta aplicación es una solución a la prueba técnica de React Native, que consiste en un CRUD (Crear, Leer, Actualizar, Eliminar) completo para gestionar una lista de personas, siguiendo altos estándares de calidad de código y arquitectura de software.

## Funcionalidades Implementadas

- **CRUD Completo**: Se puede Crear, Leer, Actualizar y Eliminar personas.
- **Gestión de Fotos**: Permite añadir, cambiar y eliminar la foto de perfil de cada persona.
- **Persistencia de Datos**: La información se guarda localmente usando `AsyncStorage` para los datos y `FileSystem` para las imágenes, asegurando que los datos no se pierdan al cerrar la app.
- **Diseño Moderno**: La lista se presenta en formato de tarjetas flotantes individuales, con animaciones suaves para una experiencia de usuario fluida.
- **Validaciones**: El formulario valida que solo se puedan ingresar caracteres de texto en los campos de nombre y apellido.

---

## Guía de Uso

#### ¿Cómo agregar una nueva persona?

1.  En la pantalla principal, presiona el **botón flotante azul** con el símbolo `+` en la esquina inferior derecha.
2.  Se abrirá un formulario modal. Rellena los campos **Nombre** y **Apellido**.
3.  Para añadir una foto, presiona **"Seleccionar Foto"** y elígela de tu galería.
4.  Una vez completado, presiona **"Guardar"**.

#### ¿Cómo editar una persona existente?

1.  Busca la tarjeta de la persona que deseas editar en la lista.
2.  Presiona el **ícono del lápiz** (✏️) en la tarjeta.
3.  Se abrirá el formulario con la información actual. Modifica el nombre, apellido o la foto.
4.  Para **eliminar solo la foto**, presiona el **ícono de basura** (🗑️) que aparece sobre la imagen.
5.  Cuando termines, presiona **"Guardar"**.

#### ¿Cómo eliminar a una persona?

1.  Busca la tarjeta de la persona que deseas eliminar.
2.  Presiona el **ícono de basura** (🗑️) en la tarjeta.
3.  Aparecerá un diálogo de confirmación para evitar borrados accidentales. Presiona **"Eliminar"** para confirmar.

---

## Arquitectura y Estructura del Proyecto

El código está organizado siguiendo principios de **Clean Code** y **Separación de Responsabilidades (SoC)**.

- **`app/`**: Contiene las pantallas de la aplicación, usando el sistema de ruteo de Expo Router.
- **`components/`**: Componentes de React reutilizables y centrados en la UI.
- **`hooks/`**: Hooks de React personalizados que encapsulan la lógica de negocio.
  - **`usePeopleManager.ts`**: Hook central que maneja toda la lógica del CRUD. Actúa como una **Fachada (Facade)** que simplifica la interacción entre la UI y los servicios de bajo nivel.
- **`services/`**: Módulos que interactúan directamente con APIs o sistemas nativos.
  - **`storage.ts`**: Abstracción para manejar operaciones con `AsyncStorage`.
  - **`file.ts`**: Abstracción para guardar y eliminar imágenes del `FileSystem`.
- **`styles/`**: Archivos de estilos centralizados para mantener la consistencia visual.
  - **`globalStyles.ts`**: Define colores y estilos comunes.
  - **`components/` y `screens/`**: Contienen los estilos específicos para cada componente y pantalla, manteniendo los archivos de componentes (`.tsx`) libres de código de estilos.
- **`types/`**: Definiciones de tipos de TypeScript (ej. la interfaz `Person`).

---

## Preguntas Técnicas

Respuestas a las preguntas incluidas en el documento de la prueba.

#### 1. ¿Cuál es la diferencia principal entre React Native y ReactJS?

La diferencia fundamental reside en el **entorno de renderizado**:

-   **ReactJS (o React)** es una librería para construir interfaces de usuario para la **web**. Renderiza componentes en el **DOM (Document Object Model)** del navegador, utilizando etiquetas HTML como `<div />`, `<p />`, etc.
-   **React Native** es un **framework** para construir aplicaciones **móviles nativas** (iOS y Android). Aunque usa la misma sintaxis y principios de React (componentes, estado, props), no renderiza en un DOM. En su lugar, utiliza un "puente" (bridge) para comunicarse con las APIs nativas del sistema operativo y renderizar **componentes de UI nativos** reales, como `UIView` en iOS o `android.view` en Android. Por eso usamos componentes como `<View />` y `<Text />` en lugar de `<div>` y `<p>`.

#### 2. Explique cómo funciona el ciclo de vida de un componente en React Native.

En el React moderno, que se usa en este proyecto con componentes funcionales, el ciclo de vida se gestiona principalmente con el hook **`useEffect`**. Este hook unifica los conceptos de los antiguos métodos de ciclo de vida de los componentes de clase (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`):

-   **Montaje (Mounting)**: Cuando se quiere ejecutar código una sola vez, justo después de que el componente se renderiza por primera vez, se usa `useEffect` con un array de dependencias vacío (`[]`).
    ```javascript
    useEffect(() => {
      // Se ejecuta una vez, similar a componentDidMount
      console.log('Componente montado');
    }, []);
    ```
-   **Actualización (Updating)**: Para ejecutar código cada vez que una prop o un estado específico cambia, se incluye esa variable en el array de dependencias.
    ```javascript
    useEffect(() => {
      // Se ejecuta cada vez que 'someValue' cambia
    }, [someValue]);
    ```
-   **Desmontaje (Unmounting)**: Para ejecutar código de limpieza justo antes de que el componente se elimine de la UI (por ejemplo, para cancelar suscripciones o timers), se retorna una función desde `useEffect`.
    ```javascript
    useEffect(() => {
      // ...
      return () => {
        // Código de limpieza, similar a componentWillUnmount
        console.log('Componente desmontado');
      };
    }, []);
    ```

#### 3. ¿Qué es AsyncStorage y en qué casos es recomendable usarlo?

**AsyncStorage** es un sistema de almacenamiento de datos **persistente, asíncrono y no encriptado** para React Native, que funciona con un modelo de **clave-valor (key-value)**.

Es recomendable usarlo para:
-   **Pequeñas cantidades de datos no sensibles**: Como configuraciones de usuario (ej. modo oscuro), tokens de autenticación, o datos de una aplicación pequeña como en esta prueba.
-   **Almacenamiento simple**: Cuando no se necesita la complejidad de una base de datos relacional.

**No** es recomendable para:
-   **Grandes volúmenes de datos**: Su rendimiento puede degradarse.
-   **Datos complejos o estructurados**: No es una base de datos, por lo que no se pueden hacer consultas complejas.
-   **Datos sensibles o secretos**: Ya que no está encriptado por defecto.

#### 4. ¿Cuál es la diferencia entre usar FlatList y ScrollView en React Native?

Ambos componentes permiten mostrar contenido que excede el tamaño de la pantalla, pero lo hacen de formas muy diferentes:

-   **`ScrollView`**: Es un contenedor genérico que renderiza **todos sus componentes hijos de una sola vez**, incluso los que no son visibles en la pantalla. Es ideal para listas cortas o para el contenido de una sola pantalla que necesita ser desplazable (como un formulario largo).

-   **`FlatList`**: Es un componente altamente optimizado para mostrar **listas largas de datos**. Su principal ventaja es la **virtualización**: solo renderiza los elementos que están actualmente visibles en la pantalla (más algunos elementos extra como buffer). A medida que el usuario se desplaza, `FlatList` recicla los componentes que salen de la pantalla y renderiza los nuevos que entran. Esto resulta en un rendimiento mucho mayor y un uso de memoria significativamente menor en comparación con `ScrollView` para listas largas.

En resumen: usa `ScrollView` para contenido simple y corto, y `FlatList` para cualquier lista de datos que pueda crecer.

---

## Cómo Empezar (Setup)

1.  Instalar dependencias:
    ```bash
    npm install
    ```
2.  Iniciar la aplicación:
    ```bash
    npx expo start
    ```
