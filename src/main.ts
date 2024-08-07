import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { makeServer } from "./server";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(autoAnimatePlugin);

app.mount("#app");
