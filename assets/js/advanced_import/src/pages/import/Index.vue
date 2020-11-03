<template>
  <div class="wizard">
    <b-tabs class="wizard-tabs" no-nav-style content-class="mt-0" v-model="step_index" >        
        <b-tab v-for="(item, index) in steps" :key="index" :title="``">
          <b-card>
          <div class="steps text-center mb-2">
            <b-badge variant="light">Step {{step_index+1}} of {{steps.length}}</b-badge>
          </div>
          <component :is="item.component" v-slot="{validation, processFunction}">
            <div class="buttons d-flex flex-row justify-content-between">
              <button class="btn btn-outline-primary" @click="goToPrevStep" :disabled="step_index==0" v-if="step_index>0">go back</button>
              <span v-else/> <!-- this is a placeholder for the left button -->
              <button v-if="step_index<(steps.length-1)" class="btn btn-outline-primary" @click="goToNextStep(processFunction)" :disabled="validation.$invalid">next</button>
              <template v-else>
                <!-- execute function for last element -->
                <button v-if="processFunction" class="btn btn-outline-primary" @click="run(processFunction)" :disabled="processing">Ok</button>
              </template>
            </div>
          </component>
          </b-card>
        </b-tab>
    </b-tabs>

    
  </div>
</template>

<script>
// import Step1 from '@/components/import/Step1'

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
  components: {
    // Step1,
  },
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
  methods: {
    async run(processFunction) {
      try {
          this.processing = true
          const response = await processFunction()
          const {data={}} = response
          console.log(response, data)
          alert(JSON.stringify(data))
      }finally {
          this.processing = false
      }
    },
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
  min-height: 400px;
}
</style>