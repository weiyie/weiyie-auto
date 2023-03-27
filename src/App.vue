<template>
  <div class="wrapper">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>
