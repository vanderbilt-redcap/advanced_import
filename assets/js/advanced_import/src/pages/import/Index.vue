<template>
  <div class="wizard">
    <FilePreview />
    <b-card class="mt-2">

    <b-tabs class="wizard-tabs" no-nav-style content-class="mt-0" v-model="step_index" >        
        <b-tab v-for="(item, index) in steps" :key="index" :title="``" title-link-class="d-none">

          <div class="steps text-center mb-2">
            <b-badge variant="light">Step {{step_index+1}} of {{steps.length}}</b-badge>
          </div>
          
          <component :is="item.component">
            <template v-slot:left>
              <button class="btn btn-outline-primary" @click="goToPrevStep" :disabled="step_index==0" v-if="step_index>0">go back</button>
              <span v-else/>
            </template>
            <template v-slot:default>

            </template>
            <template v-slot:right="{validation, processFunction}">
              <button class="btn btn-outline-primary" @click="goToNextStep(processFunction)" :disabled="validation.$invalid" v-show="step_index<(steps.length-1)">next</button>
            </template>

          </component>

        </b-tab>
    </b-tabs>
        </b-card>


    
  </div>
</template>

<script>
import FilePreview from '@/components/import/FilePreview'

const steps = [
  { component: () => import('@/components/import/SelectFile'), },
  { component: () => import('@/components/import/RecordFormat'), },
  { component: () => import('@/components/import/FormatOptions'), },
  { component: () => import('@/components/import/TargetForm'), },
  { component: () => import('@/components/import/SetPrimaryKey'), },
  { component: () => import('@/components/import/MapFields'), },
  { component: () => import('@/components/import/ImportMode'), },
  { component: () => import('@/components/import/Review'), },
]

export default {
  components: { FilePreview },
  data() {
    return {
      step_index: 0,
      steps: steps,
      processing: false,
    }
  },
  created() {
    this.step = this.steps[0]
  },
  destroyed() {
    this.$store.dispatch('import_settings/reset')
    this.$store.dispatch('csv_data/reset')
  },
  methods: {
    goToPrevStep() {
      let index = this.step_index
      if(--index<=0) index = 0
      this.step_index = index
    },
    async goToNextStep(processFunction) {
      
        if(processFunction && typeof processFunction == 'function') {
            const result = await processFunction()
          if(!result) throw new Error('error going to next step')
        }
        let index = this.step_index
        if(++index>=this.steps.length) index = this.steps.length-1
        this.step_index = index
    },
  },
}
</script>

<style scoped>
.wizard {
  width: 80%;
  margin: 0 auto;
}
.wizard-tabs {

}
</style>