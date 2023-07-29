<template>
  <EmailList :items="getInboxEmails" title="Inbox"/>
  
</template>

<script>
import { useEmailsStore } from '../stores/email';
import { storeToRefs } from 'pinia'

export default {
  name: 'inbox',
  setup() {
    const store = useEmailsStore()
    const getInboxEmails = storeToRefs(store)
    
    return getInboxEmails
  }
}
</script>