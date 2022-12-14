<template>
  <div class="subtask-container" id="subtasklist">
    <h5 class="checklist-name">Check List:</h5>
    <div class="add-task-cheklist" >
      <input type="text" autocomplete="off" placeholder="Add new subtask" class="subtask-imput option-input" v-model="newSubtask">
      <button type="submit" class="submit-subclass" title="Add task" @click="addSubtask"></button>
    </div>
    <ul class="task-list">
      <li v-for="(subtask, index) in subtasks" >
        <div class="subtask-item">
          <label class="subtask-list">
              <!-- <input type="checkbox" @click="done" @change="changeStatusSubtaskFunction"> -->
              <button class="cheklist-subtask" @click="done(index)"></button>
              <span class="not-completed ">{{subtask}}</span>
          </label>
          <button @click="remove(index)" title="Delete-subtask" class=" dlt-subtask-btn btn" ></button>
        </div>
      </li>
      <li v-for="(subtask, index) in subtaskDone" >
        <div class="subtask-item">
          <label class="subtask-list">
              <!-- <input type="checkbox" @click="done" @change="changeStatusSubtaskFunction"> -->
              <button class="cheklist-subtask" @click="done(index)"></button>
              <span class="completed">{{subtask}}</span>
          </label>
          <button @click="removeDone(index)" title="Delete-subtask" class=" dlt-subtask-btn btn" ></button>
        </div>
      </li>
    </ul>
    
  </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from "vue";
  import { useTaskStore } from "../stores/task"

const emit = defineEmits(['getSubtask'])
const newSubtask = ref();
let subtasks = ref([]);
let subtaskDone = ref ([])
const props = defineProps({
    task: Object,
});


async function startFunction() { 
  //subtasks.value = await useTaskStore().getSubtask(props.task.id);
  if(props.task.subtask.length !== 0) subtasks.value = props.task.subtask
  // console.log('linia 36',subtasks.value);
  // console.log('linia 37',subtasks.value.length);
}
startFunction();


// variable que recoge las subtasks
const addSubtask = () => {
  if (!newSubtask.value) {
    return
  }else{
  subtasks.value.push(newSubtask.value);
  useTaskStore().replaceSubtask(subtasks.value, props.task.id);
  newSubtask.value = '';
  emit('getSubtask');
  }
};

// borrar subtask

const remove = (index) => {
  subtasks.value.splice(index, 1)
  
  //Seleccionamos el elemento a eliminar con el index
  /*
  let temp = subtasks.value[subtasks.value.length - 1];
  subtasks.value[index] = temp;
  subtasks.value.pop();
  */
  /*Ejemplo del código
  [1,2,3,4,5,6,7,8,9] -> Me quiero cargar, el 7.
  [1,2,3,4,5,6,9,8,9]
  [1,2,3,4,5,6,8,9]
  */
  useTaskStore().replaceSubtask(subtasks.value, props.task.id);
};
const removeDone = (index) => {
  subtaskDone.value.splice(index, 1)
  useTaskStore().replaceSubtask(subtaskDone.value, props.task.id)
}


// marcar como completadas las subtasks... pasan a otro array subtask_done
const changeStatusSubtask = ref(false);
const done = (index) => {

  subtaskDone.value = [...subtaskDone.value,subtasks.value.splice(index, 1)[0]]
  console.log(subtasks.value);
  console.log(subtaskDone.value);
  useTaskStore().replaceSubtask(subtasks.value, props.task.id, subtaskDone.value)
};


// const changeStatusSubtask = ref(false);
// const changeStatusSubtaskFunction = () => {
//   changeStatusSubtask.value = !changeStatusSubtask.value;
// };

  </script>
  
  <style>
  </style>