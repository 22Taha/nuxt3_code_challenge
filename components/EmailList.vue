<template>
  <div style="width: 100%; padding-left: 20px;" @keydown="keyPressedHandler">
    <h1><b>{{ title }}</b></h1>
    <ul style="padding-inline-start: 5px; ">
      <li style="display: flex; justify-content: space-between; line-height: 10px;">
        <div style="display: flex; ">
          <input
            class="checkbox"
            type="checkbox"
            :checked="isSelectedAll"
            @click="selectAllItems"
          >
          <h4 style="margin-left: 7px;">
            Emails selected ({{ selectedItems.length }})
          </h4>
        </div>

        <div style="display: flex;">
          <button class="button" @click="markAsReadSelectedItems">
            <span class="material-icons-outlined"> drafts </span>
            <div style="margin-left: 5px; margin-top: 4px;">
              Mark as read (r)
            </div>
          </button>
          <button class="button" @click="markAsArchivedSelectedItems">
            <span class="material-icons-outlined"> delete </span>
            <div style="margin-left: 5px; margin-top: 4px;">
              Archive (a)
            </div>
          </button>
        </div>
      </li>
      <li
        v-for="item in items"
        :key="item.title"
        style="display: flex; line-height: 10px; border-top: 1px solid #E5E7EB; cursor: pointer;"
        @click="openMailDialog(item)"
      >
        <input
          class="checkbox"
          type="checkbox"
          :checked="isSelectedItem(item.id)"
          @click="selectItem(item.id)"
        >
        <h4 style="margin-left: 15px;" :style="{ opacity: item.read ? 0.5 : 1}">
          {{ item.title }}
        </h4>
      </li>
    </ul>

    <dialog :open="openDialog">
      <template v-if="dialogItem">
        <div style="display: flex; width: 100%">
          <div style="flex-grow: 1;">
            <button type="button" class="button" @click="openDialog = false">
              <span class="material-icons-outlined"> close </span>
              <div style="margin-left: 5px; margin-top: 4px;">
                Close
              </div>
            </button>
          </div>
          <button class="button" @click="dialogItem.read = true">
            <span class="material-icons-outlined"> drafts </span>
            <div style="margin-left: 5px; margin-top: 4px;">
              Mark as read (r)
            </div>
          </button>
          <button
          class="button" @click="dialogItem.archived = true">
            <span class="material-icons-outlined"> delete </span>
            <div style="margin-left: 5px; margin-top: 4px;">
              Archive (a)
            </div>
          </button>
        </div>
      
        <div>
          <h4>{{ dialogItem.title }}</h4>
          <p>{{ dialogItem.content }}</p>
        </div>
      </template>
    </dialog>
  </div>
</template>


<script>
import { ref, computed } from 'vue'
 
export default {
  name: 'EmailList',
  props: {
    items: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const selectedItems = ref([])
    const openDialog = ref(false)
    const dialogItem = ref(null)

    const { title, items } = toRefs(props)

    const isSelectedItem = (itemId) => {
      return !!selectedItems.value.find(item => item === itemId)
    }
    
    const isSelectedAll = computed(() => {
      return items.value.length === selectedItems.value.length
    })
    
    const selectItem = (itemId) => {
      const itemIndex = selectedItems.value.findIndex(item => item === itemId)
      if (itemIndex !== -1) {
        selectedItems.value.splice(itemIndex, 1);
      } else {
        selectedItems.value.push(itemId)
      }
    }
    const selectAllItems = () => {
      if (items.value.length === selectedItems.value.length) {
        selectedItems.value = []
      } else {
        selectedItems.value = items.value.map(item => item.id)
      }
    }

    const openMailDialog = (item) => {
      dialogItem.value = item
      openDialog.value = true
    }
    const markAsReadSelectedItems = () => {
      items.value.forEach(email => {
        if (selectedItems.value.includes(email.id)){
          email.read = true
        }      
      })
    }
    const markAsArchivedSelectedItems = () => {
      items.value.forEach(email => {
        if (selectedItems.value.includes(email.id)){
          email.archived = true
        }        
      })
      selectedItems.value = []

    }
    const keyPressedHandler = (event) => {
      switch (event.key) {
        case 'r': 
          if (openDialog.value) {
            dialogItem.value.read = true
          } else {
            markAsReadSelectedItems()
          }
          break;
        case 'a': 
          if (openDialog.value) {
            dialogItem.value.archived = true
          } else {
            markAsArchivedSelectedItems()
          }  
          break;
        case 'Escape':
          openDialog.value = false          
          break;

        default:
          break;
      }
    }

    return { 
      selectedItems,
      openDialog,
      dialogItem,
      isSelectedAll,
      items,
      title,
      isSelectedItem,
      selectItem,
      selectAllItems,
      openMailDialog, 
      markAsReadSelectedItems,
      markAsArchivedSelectedItems,
      keyPressedHandler
    }
  },
}
</script>

<style scoped>
.checkbox {
  height: 20px;
  width: 20px;
  margin-top: auto;
  margin-bottom: auto;
}
.button {
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  border: unset;
  background-color: inherit;
}

.button:hover {
  background-color: #d9dee3 ;
}

dialog {
  width: 1000px;
  margin-right: 0px;
  height: calc(100% - 40px);
  border: unset;
  background-color: aliceblue;
}

@keyframes fadeIn {
  from {
    top: -100%;
  }
  to {
    top: 0;
  }
}

dialog[open] {
  animation: fadeIn 1s;
  top: 0;
}

</style>