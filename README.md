# Chat App

## Descripción

Chat App es una aplicación web desarrollada con Angular 21 que simula una plataforma de mensajería instantánea similar a WhatsApp. Permite visualizar conversaciones, abrir chats individuales, enviar mensajes y crear nuevos chats mediante formularios reactivos.

La aplicación fue desarrollada utilizando Standalone Components, Angular Router y RxJS, aplicando principios de diseño responsive para adaptarse a dispositivos móviles y de escritorio.

---
## Funcionalidades

* Lista de conversaciones.
* Apertura de chats mediante rutas dinámicas.
* Envío de mensajes.
* Creación de nuevos chats.
* Búsqueda de conversaciones.
* Diseño responsive para dispositivos móviles y escritorio.
* Gestión de datos mediante servicios y observables.

---

## Tecnologías utilizadas

* Angular 21
* TypeScript
* HTML5
* CSS3
* Angular Router
* Reactive Forms
* RxJS

---

## Instalación

### Clonar repositorio

```bash
git clone https://github.com/abenitezS/chat-app.git
```

### Ingresar al proyecto

```bash
cd chat-app
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar la aplicación

```bash
ng serve
```

Abrir en:

```text
http://localhost:4200
```

---

## Estructura del proyecto

```text
src/
├── app/
│   ├── models/
│   │   └── chat.model.ts
│   │
│   ├── services/
│   │   └── chat.service.ts
│   │
│   ├── components/
│   │   ├── chat-layout/
│   │   ├── chat-list/
│   │   ├── chat/
│   │   ├── new-chat/
│   │   └── empty-chat/
│   │
│   ├── app.routes.ts
│   └── app.component.ts
│
├── main.ts
├── styles.css
└── index.html
```
---
## Estructura de navegación

### Lista de chats

Ruta:

```text
/chats
```
- Inicio
![Captura de pantalla](/public/capturas/pantalla-inicio.png)      

Pagina de inicio 
Permite visualizar todas las conversaciones disponibles y realizar búsquedas.

### Conversación individual

Ruta:

```text
/chats/:id
```
 Chat con el contacto seleccionado 
![Captura de pantalla](/public/capturas/pantalla-Chat.png)      

Muestra los mensajes correspondientes al contacto seleccionado y permite enviar nuevos mensajes.

### Nuevo chat
Ruta:
```text
/nuevo
```
- Nuevo

![Captura de pantalla](/public/capturas/crear_nuevo_chat.png)      
Formulario para crear una nueva conversación seleccionando nombre y avatar.

### Buscar en chats
```text
/Chats
```

- Buscador chats

![Captura de pantalla](/public/capturas/pantalla-buscar.png)     

En la lista de chats existe un buscado para filtrar y buscar por nombre.
---
## Diseño Responsive

La aplicación adapta su interfaz según el tamaño de pantalla podremos ver panel derecho o panel izquierdo 
- Inicio

![Captura de pantalla](/public/capturas/pantalla-inicio-responsive.png) 

Cuando presiona el flecha a izquieda se muestra lista de chats   

![Captura de pantalla](/public/capturas/lista_chats_responsive.png)   

- Conversación 
![Captura de pantalla](/public/capturas/pantalla-Chat_responsive.png)   

- Nuevo Chat

![Captura de pantalla](/public/capturas/crear_nuevo_chat_responsive.png)  

- Buscador de chat

![Captura de pantalla](/public/capturas/pantalla-buscar-responsive.png)  



### Escritorio

* Lista de chats en panel lateral.
* Conversación visible simultáneamente.
* Navegación tipo dos columnas.

### Dispositivos móviles

* Lista de chats a pantalla completa.
* Conversación a pantalla completa.
* Navegación mediante botón de retorno.
* Sidebar adaptable al ancho completo de la pantalla.

---
## Despliegue
- Plataforma elegida: Vercel

https://chat-app-beta.vercel.app

## Créditos del autor

- **Estudiante:** Alicia Benitez
- **Curso:** Desarrollo con Angular
- **Trabajo Final Integrador:**  Desarrollo de un Clon de Chat

---

## Bibliografía

* Angular Documentation: https://angular.dev
* Angular Router Guide: https://angular.dev/guide/routing
* RxJS Documentation: https://rxjs.dev
* TypeScript Documentation: https://www.typescriptlang.org/docs/

---

## Créditos

Proyecto desarrollado con fines educativos y académicos.

Las imágenes de avatar utilizadas corresponden a recursos de demostración utilizados únicamente para prácticas educativas.
