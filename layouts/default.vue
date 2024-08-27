<template>
  <div class="def-layout-wrapper">
    <HeaderHome/>
    <SidebarHome/>
    <main class="lyt-def-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { HeaderHome } from '~/components/ui/header'
import { SidebarHome } from '~/components/ui/sidebar'
</script>

<style scoped lang="scss">
.def-layout-wrapper {
  min-height: 100vh;
  position: relative;
  background: #eceff1;

  main.lyt-def-main {
    @apply pt-5 ml-[250px] px-8 pt-[80px];
    min-height: 100vh;
  }
}
</style>