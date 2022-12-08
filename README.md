# [](https://github.com/zantonz/final-project/blob/master/README.md)ToDo App

[Click para acceder a la web](https://todo-zantonz.vercel.app/)

Autor: Anton Zyrianov
Fecha: 25/08/2022

## Descripcion

![Pagina Home](https://i.postimg.cc/m2rV83dV/Captura-de-pantalla-2022-08-25-a-las-10-38-46.png)

Se trata del proyecto final realizado durante el bootcamp de Front End Development en el Ironhack que consiste en una pagina web que te permite gestionar tus tareas.

Es una aplicacion creada con Vue.js que permite a usuarios crear una cuenta, añadir tareas a completar, editarlas, marcarlas como completadas y finalmente borrarlas. Nuestra pagina web esta vinculada a una base de datos, donde estaremos almacenando todos los datos de usuarios y las tareas. En este caso, para gestionarlo utilizaremos Supabase, que nos ofrece un subconjunto de funcionalidades de Back End que nos permite gestionarlo como un servicio.

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
