# Día 1 - Backend con Node.js

- No se necesitan muchos recursos para asincronía.

## Introducción

### ¿Que es node.js?
- Es un interprete de javascript.
- Inicialmente para correr en servidores, o apps de comunicaciones.
- Trabaja de forma Asíncrona comodamente.

**Orientado a eventos:**
  - el usuario o los programas clientes son quienes deciden el flujo.

**Servidores de aplicaciones** 
- No necesitamos Tomcar, IIS, etc
- Tampoc necesitamos un servidr web como Apache, nginx, etc.
- Nuestra aplicación realiza todas las funciones de un servidor.
- Podemos ayudarnos de otras herramientas para cosas puntuales como :
  - Servir ficheros muy rapido poriamos apoyarnos de Apache o nginx.

**Motor V8**
- Motor javascript creado por Google.

## Versiones.
- Es usuall usar las versiones LTS.

**Limite de memoria**
- Ejecuta el código en un solo hilo.
- Se recomieda dividir el proceso en varios workers si se llega a los límites.
- Los workers estan limitados a 1gb de memoria.

## Ventajas

Node.js tiene grandes ventajas reales en:
- Aplicaciones de red, 
  - como APIs, 
  - servicios en tiempo real, 
  - servidores de comunicaciones, etc.

- Aplicaciones cuyos clientes están hechos en JAvascript, pues compartimos código y estructuras entre el servidor y el cliente.

- Si se hace una funciona se puede usar tanto el frontend como en el Backend
- Mientras mas javascript aprendo sirve para el frontend como para el Backend.

**ECMAScript 2015 (ES6)**
Desde la version 4.0 de Node.js

Una de las principales mejoras incluyen la libreria V8 en la versión v4.5, incluye de forma estable muchas caracterísiticas de ES2015 que harán nuestra vida más fácil.

Block scoping, classes, typed arrays, generators, Promises, symbols, template strings, collections (MAp, Set, etc) y arrow functions.

## Instalando Node.js

- Desde el instalador oficial nodejs.org
- Instalador de paquetes
  - Chhocolatey (windows)
  - homebrew (macos)
  - en linux: apt en Ubuntu, pacman en arch, etc.
- Compilando manualmente
- nvm : gestor de versiones de noje.js como nvm (node version manager), para tener instalada varias versiones de node.js

> npm : node package manager

## Versiona manager de node

**nvm**

nvm list

nvm install <version>

nvm use <version>

nvm use system  en linux

## Un servidor básico
