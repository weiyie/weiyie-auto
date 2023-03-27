import { useUserStore } from "./user";

export function useStore() {
  const user = useUserStore();

  return {
    user,
  };
}
