import { createApp } from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import router from "./router";
import axios from "axios";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import VueWechatTitle from "vue-wechat-title";

import UndrawUi from "undraw-ui";
import "undraw-ui/dist/style.css";

const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$cookies = VueCookies;

app.use(VueWechatTitle);
app.use(UndrawUi);
app.use(router).use(pinia).mount("#app");
