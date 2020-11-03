<template>
  <div>
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
.title {
  font-size: 2rem;
}
.import a {
  color:#5BC3EB;
}
.export a {
  color:#F06449;
}
.import a:hover,
.export a:hover {
  color: #0056b3;
}
</style>