<template>
  <aside class="lyt-def-aside">
    <NuxtLink :to="menu.path" v-for="(menu, menuIdx) in menus" :key="`menu-${menuIdx}`">
      <div :class="`wrap-menu ${menu.path === route.path ? 'is-active' : ''}`">
        <FontAwesomeIcon :icon="menu.icon" class="w-5 font-normal"/>
        <p class="">{{ menu.title }}</p>
      </div>

    </NuxtLink>
  </aside>
</template>

<script setup lang="ts">
const menus = [
  {
    icon: 'fa-solid fa-house',
    title: 'Home',
    path: '/'
  },
  {
    icon: 'fa-brands fa-product-hunt',
    title: 'Product',
    path: '/products'
  }]
const route = useRoute()
</script>

<style scoped lang="scss">
.lyt-def-aside {
  @apply absolute h-full bg-white w-[250px] pt-[80px] px-3;
  .wrap-menu {
    @apply flex items-center gap-3 mb-2 py-2 px-2;
    &.is-active {
      @apply rounded-lg;
      background-color: #d6dde1;
    }
  }
}
</style>