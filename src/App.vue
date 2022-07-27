<script lang="ts" setup>
  import { JMenuBar } from './components/MenuBar'
  import { JAppBar } from './components/AppBar'

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
<button @click="changeTheme"> switch22 </button>
    <JAppBar class="fixed bottom-2 right-0 left-0 ma"></JAppBar>
</div>


</template>