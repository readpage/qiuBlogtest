<template>
  <n-layout class="layout" has-sider>
    <n-layout-sider
      v-if="!isMobile"
      show-trigger="arrow-circle"
      collapse-mode="width"
      class="layout-sider"
      :collapsed="collapsed"
      :collapsed-width="64"
      :width="leftMenuWidth"
      :native-scrollbar="false"
      @collapse="collapsed = true"
      @expand="collapsed = false"
      bordered
    >
      <slot name="sider" :collapsed="collapsed"></slot>
    </n-layout-sider>

    <n-drawer
      v-model:show="showSideDrawder"
      width="35%"
      placement="left"
      class="layout-side-drawer"
    >
      <slot name="drawer" :collapsed="collapsed"></slot>
    </n-drawer>
    <n-layout>
      <n-layout-header class="layout-header" bordered>
        <slot name="header" :collapsed="collapsed"></slot>
      </n-layout-header>
      <n-layout-content class="layout-content">
        <slot name="default"></slot>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { projectSetting } from "@/store/modules/projectSetting";

const settingStore = projectSetting();
const isMobile = computed({
  get: () => settingStore.getIsMobile,
  set: (val) => settingStore.setIsMobile(val),
});
const collapsed = computed({
  get: () => settingStore.getCollapsed,
  set: (val) => {
    settingStore.setCollapsed(val);
  },
});

const showSideDrawder = computed({
  get: () => isMobile.value && collapsed.value,
  set: (val) => (collapsed.value = val),
});
const leftMenuWidth = ref("140");

const checkMobileMode = () => {};

const watchWidth = () => {
  const Width = document.body.clientWidth;
  if (Width <= 700) {
    isMobile.value = true;
    leftMenuWidth.value = "25%";
  } else {
    isMobile.value = false;
    leftMenuWidth.value = "150";
  }
};

onMounted(() => {
  watchWidth();
  window.addEventListener("resize", watchWidth);
  window["$loading"] = useLoadingBar();
  window["$loading"].finish();
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;
}
.n-scrollbar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.layout-sider {
  height: 100vh;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  background-color: $color;
  position: relative;
  z-index: 16;
  transition: all 0.2s ease-in-out;
}

.layout-sider-fix {
  position: fixed;
  top: 0;
  left: 0;
}

.layout-content {
  flex: auto;
  padding: 20px;
  height: 93vh;
}
.leftMenu {
  width: 100%;
  background-color: $color;
  height: 100%;
}

.n-layout {
  background-color: rgba($color: #000000, $alpha: 0);
}
</style>
