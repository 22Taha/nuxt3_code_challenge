<template>
  <div class="sidebar-item"
    @click="redirection"
    :class="{ activeItem: isActiveItem}"
  >
    <div style="margin-block: auto; display: flex;">
      <i style="margin-right: 6px;" class="material-icons-outlined">{{ icon }}</i>
      <div> {{ name }} </div>
    </div>
    <div style="margin-block: auto;"> ({{ count }}) </div>
  </div>
  
</template>

<script>
import { toRefs } from 'vue'

export default {
  name: 'SidebarItem',
  props: {
    name: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: null
    },
    icon: {
      type: String,
      required: true
    },
    path: {
      type: String,
      default: '/'
    }
  },
  setup(props) {
    const { name, count, icon, path } = toRefs(props)

    const isActiveItem = computed(() => {
      const route = useRoute();
      return path.value === route.path
    })

    const redirection = async () => {
      await navigateTo({ path: path.value })
    }

    return {
      name,
      count,
      icon,
      isActiveItem,
      redirection,
    }
  }
}
</script>

<style scoped>
.sidebar-item {
  display: flex;
  justify-content: space-between;
  margin-inline: 10px;
  padding-inline: 20px;
  height: 40px;
  border-radius: 30px;
  cursor: pointer;
}

.activeItem {
  background-color: #D6E2FB;
}

</style>