<template>
  <div>
      <input type="file" ref="fileinput" id="">
      <button @click="parse">parse</button>
      <div>
          <ul>
              <li v-for="(line, index) in lines" :key="index">{{line}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
import FileParser from '@/libs/FileParser'
const parser = new FileParser

export default {
    data() {
        return {
            lines: [],
        }
    },
    methods: {
        async parse() {
            const files = this.$refs.fileinput.files
            const file = files[0]
            let lines = await parser.getLines(file, 10)
            this.lines = lines
        }
    }
}
</script>

<style>

</style>