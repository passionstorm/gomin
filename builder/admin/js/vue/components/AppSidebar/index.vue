<template>
    <aside class="sidenav">
        <div class="sidenav_list">
<!--            <div class="sidenav_item" v-for="i in permission_routes">-->
<!--                <template v-if="hasOneShowingChild(i.children, i)">-->
<!--                    <router-link :to="{name: i.name}" class="sidenav_link">-->
<!--                        <icon name="i.meta.icon"></icon>-->
<!--                        <span>{{i.meta.title}}</span>-->
<!--                    </router-link>-->
<!--                </template>-->

<!--            </div>-->
        </div>
    </aside>
</template>

<script>
  import {isExternal} from '../../utils/validate';
  import {mapGetters} from 'vuex';
  import Icon from '../../components/widgets/Svg';
  export default {
    components: {
      Icon
    },
    data() {
      return {
        basePath: this.$route.path
      };
    },
    computed: {
      ...mapGetters([
        'sidebarOpen',
        'permission_routes',
      ]),
    },
    methods: {
      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false;
          } else {
            this.onlyOneChild = item;
            return true;
          }
        });
        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true;
        }
        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = {...parent, path: '', noShowingChildren: true};
          return true;
        }

        return false;
      },
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath;
        }
        if (isExternal(this.basePath)) {
          return this.basePath;
        }
        return path.resolve(this.basePath, routePath);
      },
    },
    created() {
      console.log(this.permission_routes);
    },
  };
</script>

<style scoped>

</style>
