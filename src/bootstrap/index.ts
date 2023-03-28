import { App } from "vue";
import { createPinia } from "pinia";
import mitt from "mitt";

import router from "../router";

import vant from "vant";

import "@/assets/css/base.less";
import "vant/lib/index.css";

export async function bootstrap(app: App) {
  // pinia
  app.use(createPinia());

  // vant
  app.use(vant);

  // mitt
  app.provide("mitt", mitt());

  // 路由
  app.use(router);
}
