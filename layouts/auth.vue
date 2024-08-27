<template>
  <div class="auth-layout-wrapper">
    <div>
      <slot/>
    </div>
    <div class="py-2 px-2">
      <div class="wrap-left-side"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.auth-layout-wrapper {
  height: 100vh;
  background: #eceff1;
  @apply min-h-screen grid grid-cols-2 gap-2;

  .wrap-left-side {
    @apply rounded-lg;
    background: url('@/assets/images/bg-auth.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
  }

  @media only screen and (max-width: 900px) {
    div:last-child {
      display: none;
    }
  }
}
</style>