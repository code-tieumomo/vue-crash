import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Global css
import "./assets/global.css";

createApp(App)
  .use(router)
  .mount("#app");
