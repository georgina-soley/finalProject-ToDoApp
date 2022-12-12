<template>
  <div class="container-sign container">
    <div class="box-order container">
      <img class="logo-img" src="../assets/img/wedo-white.svg" alt="wedo logo">
      <div class="container-form">
        <h3 class="header-title">Register</h3>
          <h4 class="header-subtitle">Start organizing your life!</h4>
          <form @submit.prevent="signUp" class="form-sign-in">
        <div class="form container">
          <div class="form-input">
            <label class="input-field-label">E-mail</label>
            <input
              type="email"
              class="input-field"
              placeholder="example@gmail.com"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="form-input">
            <label class="input-field-label">Password</label>
            <input
              type="password"
              class="input-field"
              placeholder="**********"
              id="password"
              v-model="password"
              required
            />
          </div>
          <div class="form-input">
            <label class="input-field-label">Confirm password</label>
            <input
              type="password"
              class="input-field"
              placeholder="**********"
              id="confirmPassword"
              v-model="confirmPassword"
              required
            />
          </div>
          
        </div>
        <button class="button-border" type="submit">Sign Up</button>
      </form>
      <div v-show="errorMsg">{{errorMsg}}</div>
      </div>
      <p class="askaccount">
            Have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-up-link"
            />
          </p>

    </div>   
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style></style>
