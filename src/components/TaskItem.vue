<template>
    <div class="container taskItem-box" :class="isComplete ? 'taskItem-box-completed': 'taskItem-box-not-completed' ">
      <div class="taskItem-box-info">
        <h3 v-bind:class="isComplete ? 'completed': 'not-completed' ">{{task.title}}</h3>
        <h4 class="tagCategory" :class= "computedClass">{{task.category}}</h4>
        <p v-bind:class="isComplete ? 'completed': 'not-completed' ">{{task.description}}</p>
     </div>  
     <!-- <div class="taskItem-box-buttons"> -->
        <div class="positive-btns">
            <button @click="changeStatus" class=" btn" v-bind:class="!isComplete ? 'complet-btn': 'not-complete-btn'"></button>
            <button @click="changeBooleanFunction" title="Edit" class="edit-btn btn" v-bind:class="changeBoolean ? 'not-edit-btn': 'edit-btn'"></button>
            <button @click="addsubtaskFunction" title="Add subtask" class="checklist-btn btn"></button>
            
        </div>  
        <button @click="deleteTask" title="Delete" class="delete-btn btn" ></button>
    <!-- </div>   -->
    <div class="taskItems-optional">
        <div v-show="changeBoolean" class="edit-option">
                <input type="text" placeholder="Edit your name" v-model="name" class="option-input"/>
                <input type="text" placeholder="Edit your description" v-model="description" class="option-input"/>
                <button @click="changeTask">Save changes</button>
        </div>
        
        <div v-show="addsubtask">
            <Subtask :task="props.task" @getSubtask="emit('getTasksHijo')"/>    
        </div>
    </div>
         
    </div>
</template>

<script setup>
import { ref , reactive, computed} from 'vue';
import { useTaskStore } from '../stores/task';
import { supabase } from '../supabase';
import Subtask from './Subtask.vue';
const taskStore = useTaskStore();
const emit = defineEmits([ 'getTasksHijo']);
const name = ref(props.task.title);
const description = ref(props.task.description);
const props = defineProps({
    task: Object,
});

// aquí estamos cammbiando el color según la category que se escoge
const computedClass = computed(() => {
    if (props.task.category === "business") return "category-tag-busines"
    else if (props.task.category === "personal") return "category-tag-personal"
    else if (props.task.category === "work") return "category-tag-work"
    else if (props.task.category === "familyfriends") return "category-tag-friends"
    
})
// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async() => {
    await taskStore.deleteTask(props.task.id);
    emit ('getTasksHijo')
};
// Function para cambiar task
const changeTask = async () => {
    await taskStore.changeTask(name.value, description.value, props.task.id);
    changeBoolean.value = false;
    emit("getTasksHijo");
};
const changeBoolean = ref(false);
const changeBooleanFunction = () => {
    changeBoolean.value = !changeBoolean.value;
};
// Function para cambiar status del proyecto
const isComplete = ref(props.task.is_complete);
const changeStatus = async () => {
    isComplete.value = !isComplete.value;
    await taskStore.changeStatus(isComplete.value, props.task.id);
    console.log(isComplete.value)
    emit("getTasksHijo")
};
// función para add subtasks
const addsubtask = ref()
 const addsubtaskFunction = () => {
     addsubtask.value = !addsubtask.value;
};

</script>

<style>

</style>