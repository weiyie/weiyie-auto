<template>
  <div class="error-page">
    <h1 class="code">{{ code }}</h1>
    <p class="desc">{{ desc }}</p>

    <template>
      <div class="btns">
        <el-button @click="home">回到首页</el-button>
      </div>
    </template>

    <!-- <template v-else>
      <div class="btns">
        <el-button type="primary" @click="toLogin">返回登录页</el-button>
      </div>
    </template> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useBase } from "@/base";

defineProps({
  code: Number,
  desc: String,
});

const { router } = useBase();

const isLogout = ref(false);

function toLogin() {
  router.push("/login");
}

function home() {
  router.push("/");
}
</script>

<style lang="less" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: auto;

  .code {
    font-size: 120px;
    font-weight: normal;
    color: #6c757d;
    font-family: "Segoe UI";
    margin-top: -40px;
  }

  .desc {
    font-size: 16px;
    font-weight: 400;
    color: #999;
    margin-top: 30px;
  }

  .btns {
    display: flex;
    margin-top: 40px;

    .el-button {
      margin: 0 10px;
    }
  }

  .copyright {
    color: #6c757d;
    font-size: 14px;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 50px;
    line-height: 50px;
    width: 100%;
    text-align: center;
  }
}
</style>
