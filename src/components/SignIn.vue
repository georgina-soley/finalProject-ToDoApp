  <template>

  <div class="container-sign container">
    <div class="box-order container">
      <img class="logo-img" src="../assets/img/wedo-white.svg" alt="wedo logo">
      <div class="container-form">
      <h3 class="header-title">Log In</h3>
      <h4> Sign in and continue organizing your life</h4>
      <form @submit.prevent="signIn" class="form-sign-in">
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
        </div>  
          <button class="button-border" type="submit">Sign In</button>
      </form>
      <div class="errorMsg" v-show="errorMsg">{{errorMsg}}</div>
      </div>
      <div class="image-sign">
        <!-- <img src="../assets/img/pleasant-looking-afro-american-woman-holds-notepads-papers-studies-at-college-glad-to-finish-studying.jpg" alt=""> -->
      </div>
      <p class="askaccount">
            Dont have an account?
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
const route = "/auth/signup";
const buttonText = "Sign Up";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();


// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    await useUserStore().signIn(email.value, password.value);
    redirect.push({ path: "/" });
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
  }
  return;
  errorMsg.value = "error";
};
</script>

<style>


</style>
