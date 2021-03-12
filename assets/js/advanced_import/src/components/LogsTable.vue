<template>
    <div class="overflow-auto">
    <div class="d-flex flex-row justify-content-start align-items-start">
        <b-button size="sm" variant="info" @click="getLogs" :disabled="loading">
            <font-awesome-icon v-if="loading" icon="spinner" spin/>
            <font-awesome-icon v-else icon="sync" />
            <span> Reload</span>
        </b-button>
        <b-button size="sm" variant="danger" class="ml-2" v-b-modal.modal-delete :disabled="loading" v-if="hasItems">
            <font-awesome-icon icon="trash" />
            <span> Delete logs</span>
        </b-button>

        <b-modal id="modal-delete" title="Delete logs" @ok="handleOkDelete">
            <p class="my-4">Are you sure you want to delete all logs for the current project?</p>
        </b-modal>

        <b-pagination class="ml-2" v-if="hasItems"
        v-model="current_page"
        :total-rows="rows"
        :per-page="per_page"
        aria-controls="my-table"
        size="sm"
        ></b-pagination>
    </div>

    <b-table
      id="my-table"
      class="my-2"
      :items="items_proxy"
      _per-page="per_page"
      _current-page="current_page"
      small
      bordered
      striped
      hover
    ></b-table>
    
    <b-pagination v-if="hasItems"
        v-model="current_page"
        :total-rows="rows"
        :per-page="per_page"
        aria-controls="my-table"
        size="sm"
        ></b-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const empty_value = ""

export default {
    data() {
        return {
            per_page: 50,
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
        items_proxy() {
            const items = [...this.items]
            let per_page = this.per_page
            const min_rows = 5
            if(per_page>min_rows) per_page = min_rows
            const remainder = per_page-(items.length%per_page)

            let placeholder = {'no logs': empty_value}
            if(items.length>0) {
                placeholder = {}
                let first_item = items[0]
                for(let key of Object.keys(first_item)) {
                    placeholder[key] = empty_value
                }
            }

            for(let i=0; i<remainder; i++) items.push(placeholder)
            return items
        },
        rows() {
            const total = this.$store.getters['logs/total']
            return total || this.items.length
        },
        hasItems() {
            try {
                return this.items.length>0
            } catch (error) {
                return false
            }
        }
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

<style scoped>
#my-table >>> tbody td::before {
    content: '';
    display: block;
    min-height: 10px;
    float: left;
}
#my-table >>> tbody td {
    vertical-align: middle;;
}
</style>