<template>
  <div class="subtask-container" id="subtasklist">
    <h5 class="checklist-name">Checklist:</h5>
    <div class="add-task-cheklist">
      <input
        type="text"
        autocomplete="off"
        placeholder="Add new subtask"
        class="subtask-iput option-input"
        v-model="newSubtask"
      />
      <button
        type="submit"
        class="submit-subclass"
        title="Add task"
        @click="addSubtask"
      ></button>
    </div>
    <ul class="task-list">
      <li v-for="(subtask, index) in subtasks">
        <div class="subtask-item">
          <label class="subtask-list">
            <button class="cheklist-subtask" @click="done(index)"></button>
            <span class="not-completed">{{ subtask }}</span>
          </label>
          <button
            @click="remove(index)"
            title="Delete-subtask"
            class="dlt-subtask-btn btn"
          ></button>
        </div>
      </li>
      <li v-for="(subtask, index) in subtaskDone">
        <div class="subtask-item">
          <label class="subtask-list">
            <button class="cheklist-subtask" @click="unDone(index)"></button>
            <span class="completed">{{ subtask }}</span>
          </label>
          <button
            @click="removeDone(index)"
            title="Delete-subtask"
            class="dlt-subtask-btn btn"
          ></button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useTaskStore } from "../stores/task";

const emit = defineEmits(["getSubtask"]);
const newSubtask = ref();
let subtasks = ref([]);
let subtaskDone = ref([]);
const taskStore = useTaskStore();
const props = defineProps({
  task: Object,
});

async function startFunction() {
  if (props.task.subtask.length !== 0) subtasks.value = props.task.subtask;
}
startFunction();

// variable que recoge las subtasks
const addSubtask = () => {
  if (!newSubtask.value) {
    return;
  } else {
    subtasks.value.push(newSubtask.value);
    useTaskStore().replaceSubtask(subtasks.value, props.task.id);
    newSubtask.value = "";
    emit("getSubtask");
  }
};

// borrar subtask ( con el .splice() arrancamos el elemento del array a otro que no usamos)
const remove = (index) => {
  subtasks.value.splice(index, 1);
  useTaskStore().replaceSubtask(subtasks.value, props.task.id);
};

// marcar como completadas las subtasks... pasan a otro array subtask_done ( en este caso el .splice() arrancamos el elemento del array pero esta dentro de [] junto con ...subtaskDone porque los elementos que hay aqui se acumulan en el subtaskDone.value)
const done = (index) => {
  subtaskDone.value = [
    ...subtaskDone.value,
    subtasks.value.splice(index, 1)[0],
  ];
  useTaskStore().replaceSubtask(
    subtasks.value,
    props.task.id,
    subtaskDone.value
  );
  emit("getSubtask");
};

// borrar las tareas que estan marcadas
const removeDone = (index) => {
  subtaskDone.value.splice(index, 1);
  useTaskStore().replaceSubtask(subtaskDone.value, props.task.id);
};
// volver a marcar como no completada la subtarea... vuelve al array subtasks esta vez al inicio ( por eso ...subtasks.value esta al final)
const unDone = (index) => {
  subtasks.value = [subtaskDone.value.splice(index, 1)[0], ...subtasks.value];
  useTaskStore().replaceSubtask(
    subtasks.value,
    props.task.id,
    subtaskDone.value
  );
};

const setupSubTask = async () => {
  subtaskDone.value = await taskStore.setupSubtask(props.task.id);
  console.log(props.task.id);
};
setupSubTask();
</script>

<style></style>
