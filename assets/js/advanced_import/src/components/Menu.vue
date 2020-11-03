<template>
    <div class="mb-2">
        <router-link :to="{name:'home'}" exact>
            <font-awesome-icon icon="home" />
            <span> Dashboard</span>
        </router-link>
        <router-link :to="{name:'logs'}">
            <font-awesome-icon icon="clipboard-list" />
            <span> Logs</span>
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
a.router-link-active,
a.router-link-exact-active {
    text-decoration: underline;
}
a + a {
    margin-left: 5px;
}
</style>