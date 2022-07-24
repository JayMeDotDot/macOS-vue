<script lang="ts" setup>
  import { JMenuBar } from './components/MenuBar'

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