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

        <b-pagination class="ml-2 mb-0" v-if="hasItems"
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
    <div class="table-wrapper">
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
        <template #cell(error)="data">
            <div v-if="data.value"><div class="job-error text-muted small">{{data.value}}</div></div>
        </template>
        <template #cell(status)="data">
            <div v-if="data.value" :set="params=getStatusIcon(data.value)" class="d-flex justify-content-center align-items-center">
                <font-awesome-icon :title="data.value" :icon="params.icon" :spin="params.spin" :class="params.class"/>
            </div>
        </template>
        <template #cell(created_at)="data">
            <div v-if="data.value">{{data.value}}</div>
        </template>
        <template #cell(updated_at)="data">
            <div v-if="data.value">{{data.value}}</div>
        </template>
        <template #cell(completed_at)="data">
            <div v-if="data.value">{{data.value}}</div>
        </template>
         <template #cell(type)="data">
            <div v-if="data.value" class="d-flex justify-content-center align-items-center">
                <font-awesome-icon v-if="data.value=='import'" :title="data.value" :icon="['fas', 'file-import']" class="text-primary"/>
                <font-awesome-icon v-else-if="data.value=='export'" :title="data.value" :icon="['fas', 'file-export']" class="text-danger"/>
            </div>
        </template>
        <template #cell(actions)="data">
            <div v-if="data.item.id" class="d-flex">
                <b-button size="sm" variant="outline-secondary" @click="showSettings(data.item.settings)">
                    <font-awesome-icon :icon="['fas','eye']" fixed-width />
                    <!-- <span class="ml-2">Show</span> -->
                </b-button>
                <!-- stop/start -->
                <b-button class="ml-2" v-if="data.item.status=='stopped'" variant="outline-success" size="sm" @click="confirmStartTask(data.item.id)">
                    <font-awesome-icon  :icon="['fas', 'sync-alt']" fixed-width />
                </b-button>
                <b-button v-else class="ml-2" variant="outline-primary" size="sm" @click="confirmStopTask(data.item.id)" :disabled="getStopDisabled(data.item.status)">
                    <font-awesome-icon  :icon="['fas', 'stopwatch']" fixed-width />
                </b-button>

                <b-button class="ml-2" variant="outline-danger" size="sm" @click="confirmDeleteTask(data.item.id)" :disabled="getDeleteDisabled(data.item.status)">
                    <font-awesome-icon  :icon="['fas', 'trash']" fixed-width />
                </b-button>
                <b-button v-if="debugMode" class="ml-2" variant="outline-success" size="sm" @click="showEdit(data.item)">
                    <font-awesome-icon  :icon="['fas', 'edit']" fixed-width />
                </b-button>
            </div>
        </template>
    </b-table>
    </div>
    <b-pagination v-if="hasItems"
        v-model="current_page"
        :total-rows="rows"
        :per-page="per_page"
        aria-controls="my-table"
        size="sm"
        class="mb-2"
        ></b-pagination>
    <b-modal ref="modal-settings" title="Settings" ok-only>
        <pre>{{current_settings}}</pre>
    </b-modal>
    <b-modal ref="modal-edit" title="Edit" hide-footer>
        <EditJob :job="editing_data">
            <template v-slot:footer="{form}" >
                <div class="d-flex justify-content-end">
                    <b-button class="mr-2" size="sm" variant="secondary" @click="$refs['modal-edit'].hide()">Cancel</b-button>
                    <b-button size="sm" variant="success" @click="editJob(form)" >OK</b-button>
                </div>
            </template>
        </EditJob>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditJob from '@/components/EditJob'

const statusList = Object.freeze({
    READY: 'ready',
    ERROR: 'error',
    COMPLETED: 'completed',
    PROCESSING: 'processing',
    STOPPED: 'stopped',
    DELETED: 'deleted',
})

export default {
    components: {EditJob},
    data() {
        return {
            items: [],
            metadata: {},
            fields: [
                {key: 'id', lable: 'ID'},
                {key: 'status', lable: 'Status'},
                // {key: 'filename', lable: 'Filename'},
                {key: 'processed_lines', lable: 'Processed Lines'},
                {key: 'error', lable: 'Error'},
                {key: 'created_at', lable: 'Created at'},
                {key: 'updated_at', lable: 'Updated at'},
                {key: 'completed_at', lable: 'Completed at'},
                {key: 'type', lable: 'Type'},
                {key: 'actions', lable: 'Actions'},
            ],
            per_page: 10,
            current_page: 1,
            loading: false,
            current_settings: null,
            editing_data: null,
        }
    },
    async created() {
    },
    computed: {
        ...mapState({
            debugMode: state => state.app.debugMode,
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
            let remainder =  this.per_page-items.length
            if(remainder<0) remainder = 0
            for(let i=0; i<remainder; i++) items.push({})
            return items
        },
        rows() {
            const {total=0} = this.metadata
            return total
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
                    params = {...params, ...{icon: ['fas','exclamation-circle'], class: 'text-danger'}}
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
            if(response) this.stopTask(id)
        },
        async stopTask(id) {
            let message, title, variant
            try {
                await this.$API.dispatch('jobs/stop', {id})
                message = `The job id ${id} has been stopped.`
                title = 'Success'
                variant = 'success'
            } catch (error) {
                message = `There was an error stopping the job ID ${id}.`
                title = 'Error'
                variant = 'danger'
            }finally {
                this.$bvToast.toast(message, {
                    title: title,
                    autoHideDelay: 1500,
                    appendToast: true,
                    variant,
                })
                this.getItems()
            }
        },
        async confirmStartTask(id) {
            const message = `Do you want to restart this job?`
            const title = `Start job ID ${id}`
            const response = await this.$bvModal.msgBoxConfirm(message, {
                title: title,
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'primary',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
            })
            if(response) this.startTask(id)
        },
        async startTask(id) {
            let message, title, variant
            try {
                await this.$API.dispatch('jobs/start', {id})
                message = `The job id ${id} has been started.`
                title = 'Success'
                variant = 'success'
            } catch (error) {
                message = `There was an error starting the job ID ${id}.`
                title = 'Error'
                variant = 'danger'
            }finally {
                this.$bvToast.toast(message, {
                    title: title,
                    autoHideDelay: 1500,
                    appendToast: true,
                    variant,
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
            let message, title, variant
            try {
                await this.$API.dispatch('jobs/delete', {id})
                message = `The job ID ${id} has been deleted.`
                title = 'Success'
                variant = 'success'
            } catch (error) {
                message = `There was an error deleting the job ID ${id}.`
                title = 'Error'
                variant = 'danger'
            }finally {
                this.$bvToast.toast(message, {
                    title: title,
                    autoHideDelay: 1500,
                    appendToast: true,
                    variant,
                })
                this.getItems()
            }
        },
        showSettings(settings) {
            const modal = this.$refs['modal-settings']
            if(!modal) return
            this.current_settings = settings
            modal.show()
        },
        showEdit(data) {
            const modal = this.$refs['modal-edit']
            if(!modal) return
            this.editing_data = data
            modal.show()
        },
        async editJob(data) {
            const {id} = data
            await this.$API.dispatch('jobs/update', {id, data: {...data}})
            const modal = this.$refs['modal-edit']
            if(!modal) return
            this.getItems()
            modal.hide()

        }
    }
}
</script>

<style scoped>
#my-table >>> tbody td::before {
    content: '';
    display: block;
    min-height: 20px;
    float: left;
}
#my-table >>> tbody td {
    vertical-align: middle;;
}

.table-wrapper {
    overflow-x: auto;
}
.job-error {
    max-width: 200px;
}

</style>
