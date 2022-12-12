<template>
  <Nav />
  <div>
   <h1>Hey: {{username}}</h1>
   <img :src="avatar_url ? avatar_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">
   <form class="user-form" @submit.prevent="updateProfile">
      <div>
        <label for="username">Name</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="surname">Name</label>
        <input type="text" id="surname" v-model="surname" />
      </div>
      <div>
        <input type="submit"
        class="btn"
        :value="loading ? 'Loading...':'Update'"
        :disabled ="loading"
        >
      </div>
  </form>
 </div>
</template>

<script setup>
import { supabase } from '../supabase';
import { onErrorCaptured, onMounted, ref, toRefs } from 'vue';
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';

  const userStore = useUserStore();

  const loading = ref(false);
  const username = ref();
  const surname = ref()
  const website = ref(null);
  const avatar_url = ref(null);
const email = ref();

  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
    username.value = userStore.profile.username;
    avatar_url.value = userStore.profile.avatar_url;
};

  async function signOut() {
    try {
      loading.value = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
};

  async function updateProfile(){
  try {
    loading.value = true
    let { data, error } = await supabase.from('profiles').update(
      {
        username: username.value,
        surname: surname.value  
        }
    ).match({ user_id: useUserStore().user.id })
      if (error) throw onErrorCaptured
  } catch (error) {
      alert(error.message)
  } finally {
      loading.value =false
    }
  }
</script>

<style scoped>
img {
  width: 200px;
  border-radius: 50%;
}
</style>