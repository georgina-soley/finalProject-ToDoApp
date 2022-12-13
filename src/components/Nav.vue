<template>
  <header>
  <nav class="nav-bar"> 
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> 
    <router-link to="/"> -->
       
    <!-- </router-link> -->
    <div class="navbar-logo">
    <img src="../assets/img/wedo-white.svg" alt="logo wedo"/>
    </div>
    <div class="burger-menu">
      <div class="hamburger" @click="actionShowMenu">
        <span class="line-burger"></span>
        <span class="line-burger"></span>
        <span class="line-burger"></span>
      </div>
    <div class="navegacion" v-show="showMenu">
      <ul class="navegacion-links">
          <li>
            <router-link to="/">Task Manager</router-link>
          </li>

          <li>
            <router-link to="/account">Your Account</router-link>
          </li>
      </ul>

      <div class="logout/welcome">
        <button @click="signOut" class="log-out-btn button-border">Log out</button>
      </div>
   </div>
  </div>
  <div class="desktop-menu">
    <ul class="menu-links">
        <li>
          <router-link to="/">Task Manager</router-link>
        </li>

        <li>
          <router-link to="/account">Your Account</router-link>
        </li>
    </ul>

    <div class="logout/welcome">
      <ul>
        <li class="welcome">
          <!-- <p>Welcome,{{name.user}}</p> -->
        </li>
        <li>
          <button @click="signOut" class="log-out-btn button-border">Log out</button>
        </li>
      </ul>
    </div>
  </div>
  </nav>
</header>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
    // call the user store and send the users info to backend to signOut
    // then redirect user to the homeView
  try {
    await useUserStore().signOut();
    redirect.push({path:"/auth/login"})

  } catch (error) {
    errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
      return;
  }
  errorMsg.value = "error";
};

const showMenu = ref(false)
const actionShowMenu = () => {
  showMenu.value = !showMenu.value;
};

</script>

<style>
/* header{
  background-color:var( --colorDarkBlue);
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: space-around;
  align-items: center;
  height: 80px;
} */
header{
  width: 100vw;
  background-color:var( --colorDarkBlue);
  display: flex;
  justify-content: center;
}

nav {
  background-color:var( --colorDarkBlue);
  display: flex;
  width: 75vw;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
.navbar-logo {
  width: 90px;
}

.burger-menu{
  display: flex;
  align-items: center;
  padding: 3px;
}

nav ul {
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.desktop-menu{
  display: none;
}
</style>
