<template>
  <header class="lyt-def-header">
    <p>LOGO</p>
    {{ profile?.username ?? '' }}
  </header>
</template>

<script setup lang="ts">
import { useProfileCookie } from "~/composables/useAuth";

const profile = useProfileCookie()
</script>

<style scoped lang="scss">
.lyt-def-header {
  @apply shadow-lg absolute w-full h-[60px] flex justify-between items-center py-2 px-4 z-[1] bg-white;
}
</style>