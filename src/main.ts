import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import { makeServer } from "./server.ts";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
