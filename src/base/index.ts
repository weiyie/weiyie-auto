import { inject, getCurrentInstance, Ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../store";

export function useRefs() {
  const refs = reactive<{ [key: string]: any }>({});
  function setRefs(name: string) {
    return (el: any) => {
      refs[name] = el;
    };
  }

  return { refs, setRefs };
}

export function useBase() {
  return {
    route: useRoute(),
    router: useRouter(),
    ...useRefs(),
    ...useStore(),
  };
}
