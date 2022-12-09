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
        },
      ]);
    },

    async deleteTask(id){
      const { data, error } = await supabase.from("tasks").delete().match({
        id: id,
      });
    },

    async changeTask(title, description, id) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").update({title:title, description:description}).match({id:id});
    },
    
    async changeStatus(is_complete, id) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").update({is_complete:is_complete}).match({id:id});
    },

    async selectCategory(category, id) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").update({category:category}).match({id:id});
    },



  }
});