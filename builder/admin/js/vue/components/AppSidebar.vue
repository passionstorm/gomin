<template>
  <aside class="sidenav">
    <div class="sidenav_list">
      <div class="sidenav_item" v-for="i in menus">
        <router-link :to="{name: i.name}" class="sidenav_link">
          <div class="sidenav_icon" v-html="i.meta.icon"></div>
          <span>{{i.meta.title}}</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
import routes from "@/router/routers";
export default {
  data() {
    return {
      menus: routes[0].children
    };
  },
  computed: {
    sidebarOpen() {
      return this.$store.state.app.sidebarOpen;
    },
    listLink() {
      return routes[0].children;
    }
  },
  created() {
    // console.log(this.listLink);
  }
};
</script>

<style  scoped>

</style>
