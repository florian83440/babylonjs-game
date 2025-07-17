import { createStore } from "vuex";
import playerStore from "@/store/player/player.store.js";

export default createStore({
  modules: {
    playerStore,
  },
});
