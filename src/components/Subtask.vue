<template>
  <div class="subtask-container" id="subtasklist">
    <h5 class="checklist-name">Check List:</h5>
    <div class="add-task-cheklist" >
      <input type="text" autocomplete="off" placeholder="Add new subtask" class="subtask-imput option-input" v-model="newSubtask">
      <button type="submit" class="submit-subclass" title="Add task" @click="addSubtask"></button>
    </div>
    <ul class="task-list">
      <li v-for="subtask in subtasks">
          <label class="subtask-list ">
              <input type="checkbox">
              <span>{{subtask}}</span>
          </label>
          <span class="delete-subclass" title="Delete subtask"></span>
      </li>
    </ul>
  </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from "vue";
  import { useTaskStore } from "../stores/task"

const emit = defineEmits(['getSubtask'])
const newSubtask = ref('');
let subtasks = ref([]);
const props = defineProps({
    task: Object,
});


async function startFunction() { 
  //subtasks.value = await useTaskStore().getSubtask(props.task.id);
  if(props.task.subtask.length !== 0) subtasks.value = props.task.subtask
  console.log('linia 36',subtasks.value);
  console.log('linia 37',subtasks.value.length);
}
startFunction();


// variable que recoge las subtasks
const addSubtask = () => {
  subtasks.value.push(newSubtask.value);
  useTaskStore().replaceSubtask(subtasks.value, props.task.id);
  newSubtask.value = '';
  emit('getSubtask');
};

  </script>
  
  <style>
  </style>