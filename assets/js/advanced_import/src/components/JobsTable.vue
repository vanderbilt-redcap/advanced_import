<template>
    <div class="overflow-auto">
    <div class="d-flex flex-row justify-content-start align-items-start">
        <b-button size="sm" variant="info" @click="getItems" :disabled="loading">
            <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin/>
            <font-awesome-icon v-else :icon="['fas', 'sync']" />
            <span> Reload</span>
        </b-button>
        <!-- <b-button size="sm" variant="danger" class="ml-2" v-b-modal.modal-delete :disabled="loading" v-if="hasItems">
            <font-awesome-icon icon="trash" />
            <span> Delete jobs</span>
        </b-button> -->

        <b-modal id="modal-delete" title="Delete jobs" @ok="handleOkDelete">
            <p class="my-4">Are you sure you want to delete all tasks for the current project?</p>
        </b-modal>

        <b-pagination class="ml-2" v-if="hasItems"
        v-model="current_page"
        :total-rows="rows"
        :per-page="per_page"
        aria-controls="my-table"
        size="sm"
        ></b-pagination>
    </div>

     <!-- <div v-if="!loading && !hasItems">
         <span>no logs</span>
     </div> -->

    <b-table
      id="my-table"
      class="my-2"
      :items="items_proxy"
      :fields="fields"
      _per-page="per_page"
      _current-page="current_page"
      small
      bordered
      striped
      hover
    >
        <template #cell(settings)="data">
            <details v-if="data.value">
                <summary>Show...</summary>
                <pre><span class="">{{ data.value }}</span></pre>
            </details>
        </template>
        <template #cell(status)="data">
            <div v-if="data.value" :set="params=getStatusIcon(data.value)" class="d-flex justify-content-center align-items-center">
                <font-awesome-icon :title="data.value" :icon="params.icon" :spin="params.spin" :class="params.class"/>
            </div>
        </template>
        <template #cell(created_at)="data">
            <div v-if="data.value.date">{{moment(data.value.date).format('YYYY/MM/DD hh:mm:ss')}}</div>
        </template>
        <template #cell(updated_at)="data">
            <div v-if="data.value.date">{{moment(data.value.date).format('YYYY/MM/DD hh:mm:ss')}}</div>
        </template>
        <template #cell(completed_at)="data">
            <div v-if="data.value.date">{{moment(data.value.date).format('YYYY/MM/DD hh:mm:ss')}}</div>
        </template>
         <template #cell(type)="data">
            <div v-if="data.value" class="d-flex justify-content-center align-items-center">
                <font-awesome-icon v-if="data.value=='import'" :title="data.value" :icon="['fas', 'file-import']" class="text-primary"/>
                <font-awesome-icon v-else-if="data.value=='export'" :title="data.value" :icon="['fas', 'file-export']" class="text-primary"/>
            </div>
        </template>
        <template #cell(actions)="data">
            <div v-if="data.item.id" class="d-flex">
                <b-button variant="outline-primary" size="sm" @click="confirmStopTask(data.item.id)" :disabled="getStopDisabled(data.item.status)">
                    <font-awesome-icon  :icon="['fas', 'stopwatch']" />
                </b-button>
                <b-button class="ml-2" variant="outline-danger" size="sm" @click="confirmDeleteTask(data.item.id)" :disabled="getDeleteDisabled(data.item.status)">
                    <font-awesome-icon  :icon="['fas', 'trash']" />
                </b-button>
            </div>
        </template>
    </b-table>
    
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
import moment from 'moment'

const empty_value = ""

const statusList = Object.freeze({
    READY: 'ready',
    ERROR: 'error',
    COMPLETED: 'completed',
    PROCESSING: 'processing',
    STOPPED: 'stopped',
    DELETED: 'deleted',
})

export default {
    data() {
        return {
            moment,
            items: [],
            metadata: {},
            fields: [
                {key: 'id', lable: 'ID'},
                {key: 'filename', lable: 'Filename'},
                {key: 'processed_lines', lable: 'Processed Lines'},
                {key: 'status', lable: 'Status'},
                {key: 'error', lable: 'Error'},
                {key: 'settings', lable: 'Settings'},
                {key: 'created_at', lable: 'Created at'},
                {key: 'updated_at', lable: 'Updated at'},
                {key: 'completed_at', lable: 'Completed at'},
                {key: 'type', lable: 'Type'},
                {key: 'actions', lable: 'Actions'},
            ],
            per_page: 50,
            current_page: 1,
            loading: false,
        }
    },
    async created() {
    },
    computed: {
        ...mapState({
            // items: state => state.logs.list,
        }),
        fields_proxy() {
            const items = [...this.items]
            if(items.length==0) return []
            let keys = items.reduce((accumulator, item) => {
                let keys = Object.keys(item)
                return [...accumulator, ...keys]
            }, [])
            return [...keys, ...this.fields]
        },
        items_proxy() {
            const items = [...this.items]
            let per_page = this.per_page
            const min_rows = 5
            if(per_page>min_rows) per_page = min_rows
            const remainder = per_page-(items.length%per_page)

            let placeholder = {'no data': empty_value}
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
                this.getItems()
            }
        }
    },
    methods: {
        async getItems() {
            try {
                this.loading = true
                this.items = []
                this.metadata = {}

                const limit = this.per_page
                const start = this.per_page*(this.current_page-1)
                const response =  await this.$API.dispatch('jobs/get',{start, limit})
                const {data={}} = response
                const {data: list={}, metadata={}} = data
                this.items = list
                this.metadata = metadata
            } catch (error) {
                console.log(error)
            }finally {
                this.loading = false
            }
        },
        async handleOkDelete() {
            const response =  await this.$API.dispatch('jobs/delete')
            console.log(response);
            this.getItems()
        },
        getStopDisabled(status) {
            return status != statusList.PROCESSING
        },
        getDeleteDisabled(status) {
            const disabled_status = [statusList.PROCESSING, statusList.DELETED]
            return disabled_status.indexOf(status)>=0
        },
        getStatusIcon(status) {
            let params = {icon: ['fas', 'tasks'], spin:false}
            switch (status) {
                case statusList.READY:
                    params = {...params, ...{icon: ['fas','bookmark'], class: 'text-primary'}}
                    break;
                case statusList.COMPLETED:
                    params = {...params, ...{icon: ['fas','check-circle'], class: 'text-success'}}
                    break;
                case statusList.PROCESSING:
                    params = {...params, ...{icon: ['fas','spinner'], class: 'text-secondary', spin: true}}
                    break;
                case statusList.ERROR:
                    params = {...params, ...{icon: ['fas','exclamation-circle'], class: 'text-warning'}}
                    break;
                case statusList.STOPPED:
                    params = {...params, ...{icon: ['fas','stop-circle'], class: 'text-secondary'}}
                    break;
                case statusList.DELETED:
                    params = {...params, ...{icon: ['fas','minus-circle'], class: 'text-danger'}}
                    break;
                default:
                    break;
            }
            return params
        },
        async confirmStopTask(id) {
            const message = `Do you want to stop this job?`
            const title = `Stop job ID ${id}`
            const response = await this.$bvModal.msgBoxConfirm(message, {
                title: title,
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'primary',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
            })
            console.log(response)
            if(response) this.stopTask(id)
        },
        async stopTask(id) {
            let message, title
            try {
                await this.$API.dispatch('jobs/stop', {id})
                message = `The job will be stopped`
                title = 'Success'
            } catch (error) {
                message = `There was an error. The job will not be stopped`
                title = 'Error'
            }finally {
                await this.$bvModal.msgBoxOk(message, {
                    title: title,
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'primary',
                    headerClass: 'p-2 border-bottom-0',
                    footerClass: 'p-2 border-top-0',
                    centered: true
                })
                this.getItems()
            }
        },
        async confirmDeleteTask(id) {
            const message = `Do you want to delete this job?`
            const title = `Delete job ID ${id}`
            const response = await this.$bvModal.msgBoxConfirm(message, {
                title: title,
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
            })
            if(response) this.deleteTask(id)
        },
        async deleteTask(id) {
            let message, title
            try {
                await this.$API.dispatch('jobs/delete', {id})
                message = `The job will be deleted`
                title = 'Success'
            } catch (error) {
                message = `There was an error. The job will not be deleted`
                title = 'Error'
            }finally {
                await this.$bvModal.msgBoxOk(message, {
                    title: title,
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'primary',
                    headerClass: 'p-2 border-bottom-0',
                    footerClass: 'p-2 border-top-0',
                    centered: true
                })
                this.getItems()
            }
        },
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