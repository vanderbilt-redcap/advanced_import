<template>
    <div>
    <div class="d-flex flex-row justify-content-start align-items-start">
        <b-button variant="info" @click="getLogs" :disabled="loading">
            <font-awesome-icon v-if="loading" icon="spinner" spin/>
            <font-awesome-icon v-else icon="sync" />
            <span> Reload</span>
        </b-button>
        <b-button variant="danger" class="ml-2" v-b-modal.modal-delete>
            <font-awesome-icon icon="trash" />
            <span> Delete logs</span>
        </b-button>
        
        <b-modal id="modal-delete" title="Delete logs" @ok="handleOkDelete">
            <p class="my-4">Are you sure you want to delete all logs for the current project?</p>
        </b-modal>

        <b-pagination class="ml-2" v-if="items.length>0"
        v-model="current_page"
        :total-rows="rows"
        :per-page="per_page"
        aria-controls="my-table"
        ></b-pagination>
    </div>

    <b-table
      id="my-table"
      :items="items"
      _per-page="per_page"
      _current-page="current_page"
      small
      bordered
      striped
    ></b-table>
    
    <b-pagination v-if="items.length>0"
        v-model="current_page"
        :total-rows="rows"
        :per-page="per_page"
        aria-controls="my-table"
        ></b-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            per_page: 100,
            current_page: 1,
            loading: false,
        }
    },
    async created() {
    },
    computed: {
        ...mapState({
            items: state => state.logs.list,
        }),
        rows() {
            const total = this.$store.getters['logs/total']
            return total || this.items.length
        },
    },
    watch: {
        current_page: {
            immediate: true,
            handler() {
                this.getLogs()
            }
        }
    },
    methods: {
        async getLogs() {
            try {
                this.loading = true
                const limit = this.per_page
                const start = this.per_page*(this.current_page-1)
                const response =  await this.$API.dispatch('logs/get',{start, limit})
                const {data={}} = response
                const {data: list={}, metadata={}} = data
                await this.$store.dispatch('logs/setState', {list, metadata})
            } catch (error) {
                console.log(error)
            }finally {
                this.loading = false
            }
        },
        async handleOkDelete() {
            const response =  await this.$API.dispatch('logs/delete')
            console.log(response);
            this.getLogs()
        }
    }
}
</script>

<style>

</style>