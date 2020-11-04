<template>
    <div class="d-flex flex-row justify-content-center align-items-center">

      <b-card 
        title="This is a test"
        :img-src="cat"
      >
      <template #header>
        <h6 class="mb-0">Header Slot</h6>
      </template>
        <b-card-text>
        This is a test
        </b-card-text>
        <template #footer>
            <h6 class="mb-0">Footer Slot</h6>
        </template>
      </b-card>
    </div>
</template>

<script>
import cat from "@/assets/crying-cat.jpg"

export default {
    components: {  },
    data() {
        return {
            cat
        }
    },
    computed: {},
    methods: {},
}
</script>

<style scope>

</style>