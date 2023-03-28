<template>
  <div class="login-container">
    <div class="login-content">
      <van-image src="https://img.yzcdn.cn/vant/logo.png" class="logo" />
      <van-cell-group>
        <van-field v-model="form.username" clearable label="用户名" placeholder="请输入用户名" />
        <van-field v-model="form.password" clearable label="密码" placeholder="请输入密码" type="password" />
        <van-field v-model="form.child" clearable label="子用户" placeholder="子用户" />
      </van-cell-group>
      <van-button type="primary" block @click="handleLogin">登录</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { showFailToast, showSuccessToast } from "vant";
import { LoginForm } from "#/type";
import { useBase } from "@/base";

export default defineComponent({
  name: "login-page",
  setup() {
    const form = reactive<LoginForm>({
      username: "",
      child: "",
      password: "",
    });
    const { user } = useBase();
    const handleLogin = async () => {
      if (!form.username || !form.password) {
        showFailToast("用户名或密码不能为空");
        return;
      }

      const ws = await user.getWs();
      const paramsStr = { ...form, "action:login": true };
      ws.value?.send(JSON.stringify(paramsStr));

      ws.value.onmessage = (msg) => {
        if (msg.data.includes("登录成功")) {
          ws.value.token = msg.data.split(": ")[1];

          showSuccessToast("登录成功");
        } else if (msg.data.includes("登录失败")) {
          showFailToast(JSON.parse(msg.data).msg);
        }
      };
    };
    return {
      form,
      handleLogin,
    };
  },
});
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}

.login-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100vh;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.logo {
  margin-bottom: 40px;
  width: 120px;
  height: 120px;
}

.van-cell-group {
  width: 100%;
  margin-bottom: 20px;
}

.van-button {
  margin-top: 40px;
}

@media screen and (min-width: 768px) {
  .login-container {
    height: auto;
  }

  .login-content {
    width: 400px;
    padding: 60px;
    margin: 20px 0;
    height: calc(100vh - 40px);
  }

  .van-cell-group {
    margin-bottom: 40px;
  }

  .van-button {
    margin-top: 60px;
  }
}
</style>
