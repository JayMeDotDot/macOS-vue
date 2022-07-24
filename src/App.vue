<script lang="ts" setup>
  import { ref } from 'vue'

  import { JMenuBar } from './components/menuBar'

  let theme = true

  function changeTheme() {
    if (theme) {
      document.documentElement.classList.add('dark')
      theme = false
    } else {
      document.documentElement.classList.remove('dark')
      theme = true
    }
  }
</script>

<template>
<div>
    <JMenuBar></JMenuBar>
</div>

<button @click="changeTheme"> switch </button>
</template>