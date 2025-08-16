# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

---

# Prueba Técnica Tiesdi - Gestor de Personas

Esta aplicación es una solución a la prueba técnica de React Native, que consiste en un CRUD (Crear, Leer, Actualizar, Eliminar) completo para gestionar una lista de personas.

## Funcionalidades Implementadas

- **Crear Persona**: A través de un formulario modal, se puede añadir una nueva persona con nombre, apellido y una foto opcional.
- **Leer Personas**: La lista de personas se muestra en la pantalla principal, cargada desde el almacenamiento local.
- **Actualizar Persona**: Se puede editar la información de cualquier persona, incluyendo cambiar o eliminar su foto.
- **Eliminar Persona**: Se puede eliminar a una persona de la lista, lo que también borra su foto del sistema de archivos.
- **Persistencia de Datos**: Toda la información se guarda localmente usando `AsyncStorage` para los datos de texto y `FileSystem` para las imágenes.
- **UI Mejorada**: La aplicación cuenta con una interfaz limpia, iconos, animaciones suaves y validaciones en los campos del formulario.

## Estructura del Proyecto

El código está organizado siguiendo principios de Clean Code y Separación de Responsabilidades.

- **`app/`**: Contiene las pantallas de la aplicación, usando el sistema de ruteo de Expo Router.
  - **`(tabs)/`**: Define las pantallas que se muestran en la barra de pestañas.
    - **`personList.tsx`**: Pantalla principal que renderiza la lista de personas.
    - **`_layout.tsx`**: Configuración de la barra de pestañas (títulos, iconos).
- **`components/`**: Componentes de React reutilizables.
  - **`PersonItem.tsx`**: Muestra una fila de la lista de personas.
  - **`PersonForm.tsx`**: Formulario para crear y editar personas.
- **`hooks/`**: Hooks de React personalizados que encapsulan la lógica de negocio.
  - **`usePeopleManager.ts`**: Hook central que maneja toda la lógica del CRUD, interactuando con los servicios de almacenamiento y archivos.
- **`services/`**: Módulos que interactúan con APIs o sistemas de bajo nivel.
  - **`storage.ts`**: Abstracción para manejar operaciones con `AsyncStorage`.
  - **`file.ts`**: Abstracción para guardar y eliminar imágenes del `FileSystem`.
- **`styles/`**: Archivos de estilos centralizados.
  - **`globalStyles.ts`**: Define colores y estilos comunes para toda la aplicación.
- **`types/`**: Definiciones de tipos de TypeScript (ej. la interfaz `Person`).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.