import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      if(user) {
        this.user = user;
         const { data: profile } = await supabase
        .from('profiles')
        .select()
        .match({ user_id: this.user.id })

        if (profile) this.profile = profile[0];
        // console.log('user in store: ', this.user);
        // console.log('profile in store: ', this.profile);
      }
    },

    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        // console.log(this.user);

        const { data: profile } = await supabase.from('profiles').insert([
           {
             user_id: this.user.id,
             username: email
           }
         ])
      }
    },

    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      },
      {
        shouldCreateUser: false,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
         const { data: profile } = await supabase
         .from('profiles')
         .select()
         .match({ user_id: this.user.id })

         if (profile) this.profile = profile[0];
        // console.log('profile in store: ', profile);
      }
    },

    async signOut(){
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },

  
async getProfile() {
  await userStore.fetchUser();
  const username = ref();
  const surname = ref()
  const avatar_url = ref(null);
    username.value = userStore.profile.username;
    surname.value = userStore.profile.surname;
    avatar_url.value = userStore.profile.avatar_url;
    nickname.value = userStore.profile.nickname
},
});
