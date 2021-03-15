<template>
  <div>
    <p>Monitor the status of the Jobs.</p>
    <JobsTable />
    <div class="d-flex">
      <b-card
        title="Status"
        tag="article"
        style="max-width: 20rem;"
        class=""
      >
      <ul>
        <li>
          <span>
            <font-awesome-icon fixed-width class="text-primary" :icon="['fas', 'bookmark']" />:
            <span>Job ready to be processed</span>
          </span>
        </li>
        <li>
          <span>
            <font-awesome-icon fixed-width class="text-success" :icon="['fas', 'check-circle']" />:
            <span>Job process completed</span>
          </span>
        </li>
        <li>
          <span>
            <font-awesome-icon fixed-width class="text-secondary" :icon="['fas', 'spinner']" />:
            <span>Job being processed</span>
          </span>
        </li>
        <li>
          <span>
            <font-awesome-icon fixed-width class="text-warning" :icon="['fas', 'exclamation-circle']" />:
            <span>Job stopped due to error</span>
          </span>
        </li>
        <li>
          <span>
            <font-awesome-icon fixed-width class="text-secondary" :icon="['fas', 'stop-circle']" />:
            <span>Job stopped by user</span>
          </span>
        </li>
        <!-- <li>
          <span>
            <font-awesome-icon fixed-width class="text-danger" :icon="['fas', 'minus-circle']" />:
            <span>Job marked as 'deleted'</span>
          </span>
        </li> -->
      </ul>
      </b-card>
      <b-card
        title="Actions"
        tag="article"
        style="max-width: 20rem;"
        class="ml-2"
      >
      <ul>
        <li>
          <span>
            <font-awesome-icon fixed-width class="text-primary" :icon="['fas', 'stopwatch']" />:
            <span>Stop a Job in progress</span>
          </span>
        <li>
          <span>
            <font-awesome-icon fixed-width class="text-danger" :icon="['fas', 'trash']" />:
            <span>A Job and its associated file will be deleted</span>
          </span>
        </li>
      </ul>
      </b-card>
      <b-card
        title="Types"
        tag="article"
        style="max-width: 20rem;"
        class="ml-2"
      >
      <ul>
        <li>
          <span>
            <font-awesome-icon fixed-width class="text-primary" :icon="['fas', 'file-import']" />:
            <span><em>"Import"</em> type Job</span>
          </span>
        <li>
          <span>
            <font-awesome-icon fixed-width class="text-primary" :icon="['fas', 'file-export']" />:
            <span><em>"Export"</em> type Job</span>
          </span>
        </li>
      </ul>
      </b-card>
    </div>
  </div>
</template>

<script>
import JobsTable from '@/components/JobsTable'

export default {
  components: {JobsTable},
  computed: {}
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>