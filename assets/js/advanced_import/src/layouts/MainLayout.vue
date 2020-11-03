
<template>
    <section class="layout">
      <div class="page-wrapper">
          <Menu></Menu>
        <transition name="fade" appear>
          <router-view />
        </transition>
      </div>
    </section>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  components: {Menu}
}
</script>

<style>

</style>