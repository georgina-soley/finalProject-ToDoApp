import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },

    async addTask(title, description, category) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
          category: category,
          subtask: [],
          subtask_done: [],
        },
      ]);
    },

    async deleteTask(id) {
      const { data, error } = await supabase.from("tasks").delete().match({
        id: id,
      });
    },

    async changeTask(title, description, id) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase
        .from("tasks")
        .update({
          title: title,
          description: description,
        })
        .match({ id: id });
    },

    async changeStatus(is_complete, id) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: is_complete })
        .match({ id: id });
    },

    async subtasks(subtask, id) {
      console.log("linia 50", useUserStore().user.id);
      const { data, error } = await supabase
        .from("tasks")
        .update({ subtask: subtask })
        .match({ id: id });
    },

    async replaceSubtask(listSubtask, id, subtaskdone) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ subtask: listSubtask, subtask_done: subtaskdone })
        .match({ id: id });
    },

    async getSubtask(id) {
      const { data: subtasks, error } = await supabase
        .from("tasks")
        .select("subtask");
      return subtasks[0];
    },

    async addSubtask(newSubtask, id) {
      let completeSubtask = this.getSubtask();
      completeSubtask.push(newSubtask);
      const { data, error } = await supabase
        .from("tasks")
        .update({ subtask: completeSubtask })
        .match({ id: id });
    },

    async setupSubtask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .select("subtask_done")
        .match({ id: id });
      return data[0].subtask_done;
    },

    async getSubtaskDoneForCounter(id) {
      const { data: subtasks, error } = await supabase
        .from("tasks")
        .select("subtask")
        .match({ id: id });
      return subtasks[0].subtask;
    },
  },
});
