<template>
  <div class="wrapper">
    <Nav />
    <NewTask @getTasksHijo="getTasks" />
    <h2>Here are your tasks:</h2>

    <div class="tasks-container">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @deleteTasksHijo="getTasks"
        @getTasksHijo="getTasks"
      />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import Subtask from "../components/Subtask.vue";
import Footer from "../components/Footer.vue";
import { propsToAttrMap } from "@vue/shared";

const taskStore = useTaskStore();

// Variable para guardar las tareas de supabase
const tasks = ref([]);

// Creamos una función que conecte a la store para conseguir las tareas de supabase
const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
  // console.log('estamos en getTasks');
};

getTasks();

// esto nop
const filterCategory = () => {
  if (value == personal) return props.task.category.value == personal;
  console.log("personal selected");
};
</script>

<style></style>

