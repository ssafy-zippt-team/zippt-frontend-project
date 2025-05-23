<template>
  <div class="flex flex-col min-h-screen box-border">
    <!-- Header -->
    <HeaderView />

    <!-- Main Content -->
    <main class="flex-grow relative">
      <RouterView />
    </main>

    <!-- Footer -->
    <FooterView />
  </div>
</template>

<script setup>
import HeaderView from "./views/fixView/HeaderView.vue";
import FooterView from "./views/fixView/FooterView.vue";
</script>
