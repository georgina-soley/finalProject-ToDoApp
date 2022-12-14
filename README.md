# [](https://github.com/zantonz/final-project/blob/master/README.md)ToDo App

[Click para acceder a la web](https://todo-zantonz.vercel.app/)

Autor: Georgina Soley
Fecha: 5/12/2022 -16/12/2022

## Descripcion

Proyecto final realizado durante el bootcamp de Front End Development en el Ironhack que consiste en una pagina web que te permite gestionar tus tareas.

Es una aplicacion creada con Vue.js que permite a usuarios crear una cuenta, añadir tareas a completar, editarlas, marcarlas como completadas y finalmente borrarlas. Nuestra pagina web esta vinculada a una base de datos (supabase), donde estaremos almacenando todos los datos de usuarios y las tareas.

**El objetivo** de este proyecto es poner en practica los conocimientos de Vue.js obtenidos durante el curos y ademas poder conectarlo a una base de datos externa y gestionarla.

## Tecnologias empleadas:

- **Client:** Vue.js y Vite
- **Router:** Vue Router
- **Store:** Pinia y Pinia Persist para el Log In
- **Database:** Supabase

## Seguimiento del proyecto:

### 5 diciembre:

Empezamos el proyecto, día de mirar el proyecto y empezar a pensar qué se necesita y como hacerlo.

### 6 diciembre:

- Implentar la logica para el Sign Up, Sign In y Sing Out
- Implementar logica / funcionalidades addTask y task Item ( borrar, editar)
- Hacer el fetch de las tareas de Supabase al cargar la pagina y cada vez que se ejecute alguna accion de cambio

### 7 diciembre:

- Finalizar la funcionalidad de taskItem
- diseño HTML y CSS sign in/ sign up
- Añadir el diseño HTML y CSS del componente taskItem

### 8 diciembre:

- HTML y CSS Home + task Item
- lógica para categorizar las tasks
- pensar/probar lógica checklist dentro de cada task

### 9 diciembre:

- HTML y CSS
- Seguir lógica checklist dentro de cada task.
- mirar logica para user zone.

### 12 diciembre:

- Acabar lógica cheklist
- Solucionar algunos problemillas que he encontrado
- Empezar lógica user zone ( empezada... necesidad de probar y investigar)
- CSS

Se ha complicado la lógica de la cheklist, y aún habiendola hecho aparece otra incógnita... si se hace como array de strings, luego no se le puete cambiar el esteado.. dberia ser un array de objetos para poder hacer cosas con cada uno de los elementos independientemente?

### 13 diciembre:

- HTML y CSS Home burger menu + task Item zone Mansory style ( independiente cada item)
- User zone css + probar lógica
- Continuar probando checklist (delete / marcar como hechos)
- revisar responsive

### 13 diciembre:

- lógica interacción subtask (delete/ marcar como hecho)
- filtro categorias
- revisar responsive
