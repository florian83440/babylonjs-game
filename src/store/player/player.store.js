import { reactive } from "vue";
import playerData from "@/data/player.json";

const state = reactive({
  id: playerData.player.id,
  name: playerData.player.name,
  level: playerData.player.stats.level,
  HP: playerData.player.stats.HP,
  maxHP: playerData.player.stats.maxHp,
  MP: playerData.player.stats.MP,
  maxMP: playerData.player.stats.maxMP,
  playerClass: null,
  class_HP: 0,
  class_maxHP: 0,
  class_MP: 0,
  class_maxMP: 0,
  physical_attack: 0,
  physical_defense: 0,
  magical_attack: 0,
  magical_defense: 0,
  speed: 0,
  skills: [],
});

const mutations = {
  setHP(state, HP) {
    state.HP = HP;
  },
  setMaxHP(state, maxHP) {
    state.maxHP = maxHP;
  },
  setMP(state, MP) {
    state.MP = MP;
  },
  setMaxMP(state, maxMP) {
    state.maxMP = maxMP;
  },
  setPlayerClassData(state, playerData) {
    state.class_HP = playerData.HP;
    state.class_maxHP = playerData.maxHP;
    state.class_MP = playerData.MP;
    state.class_maxMP = playerData.maxMP;
  },
  setLevel(state, level) {
    state.level = level;
  },
  setName(state, name) {
    state.name = name;
  },
  setPlayerClass(state, playerClass) {
    state.playerClass = playerClass;
  },
  setPhysicalAttack(state, physicalAttack) {
    state.physical_attack = physicalAttack;
  },
  setPhysicalDefense(state, physicalDefense) {
    state.physical_defense = physicalDefense;
  },
  setMagicalAttack(state, magicalAttack) {
    state.magical_attack = magicalAttack;
  },
  setMagicalDefense(state, magicalDefense) {
    state.magical_defense = magicalDefense;
  },
  setSpeed(state, speed) {
    state.speed = speed;
  },
  setSkills(state, skills) {
    state.skills = skills;
  },
};

const actions = {
  updateHP({ commit }, HP) {
    commit("setHP", HP);
  },
  updateMaxHP({ commit }, maxHP) {
    commit("setMaxHP", maxHP);
  },
  updateMP({ commit }, MP) {
    commit("setMP", MP);
  },
  updateMaxMP({ commit }, maxMP) {
    commit("setMaxMP", maxMP);
  },
  initializePlayerClassData({ commit }, playerData) {
    commit("setPlayerClassData", playerData);
  },
  updateLevel({ commit, state }, level) {
    commit("setLevel", level);
  },
  updateName({ commit }, name) {
    commit("setName", name);
  },
  updatePlayerClass({ commit }, playerClass) {
    commit("setPlayerClass", playerClass);
  },
  updatePhysicalAttack({ commit }, physicalAttack) {
    commit("setPhysicalAttack", physicalAttack);
  },
  updatePhysicalDefense({ commit }, physicalDefense) {
    commit("setPhysicalDefense", physicalDefense);
  },
  updateMagicalAttack({ commit }, magicalAttack) {
    commit("setMagicalAttack", magicalAttack);
  },
  updateMagicalDefense({ commit }, magicalDefense) {
    commit("setMagicalDefense", magicalDefense);
  },
  updateSpeed({ commit }, speed) {
    commit("setSpeed", speed);
  },
  updateSkills({ commit }, skills) {
    commit("setSkills", skills);
  },
};

const getters = {
  id: (state) => state.id,
  name: (state) => state.name,
  level: (state) => state.level,
  HP: (state) => state.HP + (state.class_HP ?? 0),
  maxHP: (state) => state.maxHP + (state.class_maxHP ?? 0),
  MP: (state) => state.MP + (state.class_MP ?? 0),
  maxMP: (state) => state.maxMP + (state.class_maxMP ?? 0),
  playerClass: (state) => state.playerClass,
  physical_attack: (state) => state.physical_attack,
  physical_defense: (state) => state.physical_defense,
  magical_attack: (state) => state.magical_attack,
  magical_defense: (state) => state.magical_defense,
  speed: (state) => state.speed,
  skills: (state) => state.skills,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
