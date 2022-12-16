<template>
  <header>
    <nav class="nav-bar">
      <div class="navbar-logo">
        <router-link to="/"
          ><img src="../assets/img/wedo-white.svg" alt="logo wedo"
        /></router-link>
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
              <router-link to="/" class="home-menu-item"
                >Task Manager</router-link
              >
            </li>

            <li>
              <router-link to="/account" class="home-menu-item"
                >Your Account</router-link
              >
            </li>
          </ul>

          <div class="logout/welcome">
            <button @click="signOut" class="log-out-btn button-border">
              Log out
            </button>
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
          <button @click="signOut" class="log-out-btn button-border">
            Log out
          </button>
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
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  // call the user store and send the users info to backend to signOut
  // then redirect user to the homeView
  try {
    await useUserStore().signOut();
    redirect.push({ path: "/auth/login" });
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

const showMenu = ref(false);
const actionShowMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>

<style></style>
