<template>
  <Nav />
  <div class="wrapper">
    <div class="newTask-container user-container">
    <h3>Hey {{username}}!</h3>
    <!-- <img :src="avatar_url ? avatar_url : '../assets/img/blank-profile-picture-973460__480.jpg'" alt="Profile picture" class="avatar image"> -->
    
    <form class="user-form" @submit.prevent="updateProfile">
      <Avatar v-model:path="avatar_url" @upload="updateProfile" size="10" />
        <div class="form-input">
          <label for="username">Name</label>
          <input type="text" id="username" v-model="username" class="input-field" />
        </div>
        <div class="form-input">
          <label for="surname">Surname</label>
          <input type="text" id="surname" v-model="surname" class="input-field"/>
        </div>
        <div>
          <input type="submit"
          class="button-border"
          :value="loading ? 'Loading...':'Update'"
          :disabled ="loading"
          >
        </div>
    </form>
  </div>
  <Footer />
</div>
</template>

<script setup>
import { supabase } from '../supabase';
import { onErrorCaptured, onMounted, ref, toRefs } from 'vue';
import { useUserStore } from "../stores/user";
import Nav from '../components/Nav.vue';
import Avatar from '../components/Avatar.vue';
import Footer from '../components/Footer.vue'

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
    surname.value = userStore.profile.surname;
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
        surname: surname.value,  
        avatar_url: avatar_url.value, 
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