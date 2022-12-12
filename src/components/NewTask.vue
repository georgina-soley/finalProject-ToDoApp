<template>
    <div class="newTask-container">
        <h1>Add a new Task</h1>
        <div class="form-add">
            <div class="input form-input">
                <input type="text" class="input-field" placeholder="Your task title" v-model="name">
            </div>
            <div class="input form-input">
                <input type="text" class="input-field" placeholder="Task Description" v-model="description">
            </div>
            <div class="category">
                <h4>Pick a category</h4>
                <div class="category-options">
                    <label>
                        <input 
                        type="radio"
                        name="category"
                        value="business"
                        v-model="category">
                        <span class="bubble business"></span>
                        <div>Business</div>
                    
                    </label>
                    <label>
                        <input 
                        type="radio"
                        name="category"
                        value="work"
                        v-model="category">
                        <span class="bubble work"></span>
                        <div>Work</div>
                    </label>
                    <!-- <label>
                        <input 
                        type="radio"
                        name="category"
                        value="studies"
                        v-model="category">
                        <span class="bubble studies"></span>
                        <div>Studies</div>
                    </label> -->
                    <label>
                        <input 
                        type="radio"
                        name="category"
                        value="personal"
                        v-model="category">
                        <span class="bubble personal"></span>
                        <div>Personal</div>
                    </label>
                    <label>
                        <input 
                        type="radio"
                        name="category"
                        value="familyfriends"
                        v-model="category">
                        <span class="bubble familyfriends"></span>
                        <div>Friends</div>
                    </label>
                
                </div>
            </div>
            <button @click='addTask' class="button-border">Add</button> 
        </div>
        <div v-if="showErrorMessage">
            <p class="error-text errorMsg">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"   
const taskStore = useTaskStore();
const emit = defineEmits(['getTasksHijo'])
// variables para los valors de los inputs
const name = ref('');
const description = ref('');
const category = ref();
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);
// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);
// Arrow function para crear tareas.
const addTask = async() => {
if(name.value.length === 0 || description.value.length === 0 || !category.value){
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.
    showErrorMessage.value = true;
    errorMessage.value = 'Ups!! Something is empty!';
    setTimeout(() => {
    showErrorMessage.value = false;
    }, 5000);
} else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.
   await taskStore.addTask(name.value, description.value, category.value);
    name.value = '';
    description.value = '';
    category.value = '';
    emit ('getTasksHijo')
}
};
</script>

<style></style>
  