
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

<style scoped>

.fade-enter-active {
  transition: opacity 100ms;
}
.fade-enter-active {
  /** delay same amount of time of the transition duration */
  transition-delay: 100ms;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>