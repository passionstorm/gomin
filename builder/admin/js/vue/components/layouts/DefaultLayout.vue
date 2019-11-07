<template>
    <div
        class="app_container"
        :class="{'sidebar_close': !sidebarOpen}"
    >
        <app-header>
            <component :is="slotHeader"></component>
        </app-header>
        <app-sidebar/>
        <main>
            <router-view
                    @slot-footer="slot => slotFooter = slot"
                    @slot-header="slot => slotHeader = slot"
            />
        </main>
        <app-footer>
            <component :is="slotFooter"></component>
        </app-footer>
        <div
                class="sidebar_overlay"
                @click="sidebarOverlayClick"
        ></div>
    </div>
</template>

<script>
  import AppSidebar from '../AppSidebar';
  import AppHeader from '../AppHeader';
  import AppFooter from '../AppFooter';
  import AppMain from '../AppMain';

  export default {
    components: {
      AppSidebar,
      AppHeader,
      AppFooter,
      AppMain,
    },
    data() {
      return {
        showDrawer: true,
        slotFooter: null,
        slotHeader: null,
      };
    },
    computed: {
      sidebarOpen() {
        return this.$store.state.app.sidebarOpen;
      },
    },
    watch: {},
    methods: {
      sidebarOverlayClick() {
        this.$store.dispatch('toggleSidebar');
      },
    },
    created() {
    },
  };
</script>
<style>

</style>
