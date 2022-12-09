<template>
<div class="subtask-container" id="subtasklist">
  <h4 class="checklist-name">Check List:</h4>
  <div class="add-task-cheklist">
    <input type="text" placeholder="Add new subtask" class="subtask-imput">
    <input type="submit" class="submit-subclass" title="Add task">
  </div>
  <ul class="task-list">
    <li>
        <label class="subtask-list">
            <input type="checkbox">
            <span>Task</span>
        </label>
        <span class="delete-subclass" title="Delete subtask"></span>
    </li>
  </ul>
</div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"

// const subtasklist=

</script>

<style>

</style>