import { Ref, ref } from "vue";
import { defineStore } from "pinia";

interface WebSocketLocal extends WebSocket {
  token?: string;
}
export const useUserStore = defineStore("user", () => {
  const ws = ref<WebSocketLocal | null>(null);

  // 设置socket信息
  function setWs(value: WebSocket) {
    ws.value = value;
  }

  async function getWs(): Promise<Ref<WebSocketLocal>> {
    return await new Promise((res, rej) => {
      if (ws.value) {
        return res(ws as any);
      }
      const wss = new WebSocket("wss://vaoei1.laf.dev");
      ws.value = wss;

      wss.onopen = () => {
        console.log("connected");
        res(ws as any);
      };

      setTimeout(rej, 10000);
    });
  }

  return {
    ws,
    getWs,
    setWs,
  };
});
