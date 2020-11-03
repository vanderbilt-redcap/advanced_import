<template>
  <div class="main d-flex flex-column align-items-center justify-content-center">
    <!-- <a href="backend/?pid=60&type=module&page=api&prefix=advanced_import&route=settings">test</a> -->
    <p class="title">Welcome to the <strong>Import Helper</strong></p>

    <div class="d-flex flex-row align-items-center justify-content-center">
      <section class="import mr-2">
        <router-link :to="{name:'import'}" class="text-center">
          <font-awesome-layers class="fa-10x">
            <font-awesome-icon icon="square" />
            <font-awesome-icon icon="file-import" style="color: white;" transform="shrink-8" />
          </font-awesome-layers>
          <span class="d-block">Import a CSV file</span>
        </router-link>
      </section>
      <section class="export ml-2">
        <router-link :to="{name:'export'}" class="text-center">
        <font-awesome-layers class="fa-10x">
          <font-awesome-icon icon="square" />
          <font-awesome-icon icon="file-export" style="color: white;" transform="shrink-8" />
        </font-awesome-layers>
        <span class="d-block">Export a CSV schema</span>
        </router-link>
      </section>
    </div>

    <p class="mt-2 text-muted"><em>Import Helper</em> is a tool built to help you import data in a REDCap form.</p>

  </div>
</template>

<script>


export default {
  components: {},
  computed: {
    language() { return this.$store.state.settings.language }
  }
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