<template>
  <div class="sidebar">
    <div style="padding-top: 60px;">
      <SidebarItem
        v-for="item in items"
        :key="item.id"
        :name="item.name"
        :icon="item.icon"
        :count="item.count"
        :path="item.path"
        style="margin-top: 10px;"
      />
    </div>
    <div style="margin-bottom: 20px; margin-left: 30px;">
     Logout
    </div>
  </div>
</template>

<script>
import { useEmailsStore } from '../stores/email';
import { storeToRefs } from 'pinia';
import { computed } from 'vue'

export default {
  name: 'Sidebar',
  setup() {
    const store = useEmailsStore()
    const { getInboxEmails, getArchiveEmails } = storeToRefs(store)

    const items = computed(() => {
      return [
        {
          name:'Inbox',
          icon: 'inbox',
          count: getInboxEmails.value.length,
          path: '/inbox'
        },
        {
          name: 'Archive',
          icon: 'inventory_2',
          count: getArchiveEmails.value.length,
          path: '/archive'
        },
      ]
    })
    
    return {
      getInboxEmails,
      getArchiveEmails,
      items
    }
  },
}
</script>

<style scoped>
  .sidebar {
    width: 260px;
    height: 100%;
    background-color: #E5E7EB;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>