import { createApp } from "vue";
import { createPinia } from "pinia";
// import { faregular } from '@fortawesome/free-regular-svg-icons';
// import { fasolid } from '@fortawesome/free-solid-svg-icons';
// import { library} from '@fortawesome/fontawesome-svg-core'

import App from "./App.vue";
import router from "./router";

import './assets/style.css';

// library.add(faregular, fasolid);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
