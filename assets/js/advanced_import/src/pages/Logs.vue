<template>
  <div>
    <p>Check the logs for errors or warnings.</p>
    <LogsTable />
  </div>
</template>

<script>
import LogsTable from '@/components/LogsTable'

export default {
  components: {LogsTable},
  computed: {}
}
</script>

<style scoped>

</style>