<template>
    <div class="mb-2 menu-wrapper">
        <router-link :to="{name:'home'}" exact>
            <font-awesome-icon icon="home" />
            <span> Dashboard</span>
        </router-link>
        <router-link :to="{name:'import'}">
            <font-awesome-icon icon="file-import" />
            <span> Import</span>
        </router-link>
        <router-link :to="{name:'export'}">
            <font-awesome-icon icon="file-export" />
            <span> Export</span>
        </router-link>
        <router-link :to="{name:'logs'}">
            <font-awesome-icon icon="clipboard-list" />
            <span> Logs</span>
        </router-link>
        <router-link :to="{name:'jobs'}">
            <font-awesome-icon icon="tasks" />
            <span> Jobs</span>
        </router-link>
        <a :href="project_dashboard_url">
            <font-awesome-icon icon="th" />
            <span> Record status dashboard</span>
        </a>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            project_id: state => state.settings.project_id,
            project_dashboard_url: state => state.settings.project_dashboard_url,
        })
    }
}
</script>

<style scoped>
.menu-wrapper {
    border-bottom: solid 1px #cacaca;
}
a.router-link-active,
a.router-link-exact-active {
    text-decoration: underline;
}
a + a {
    margin-left: 5px;
}
</style>