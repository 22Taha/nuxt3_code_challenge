<template>
  <EmailList :items="getArchiveEmails" title="Archive"/>
</template>

<script>
import { useEmailsStore } from '../stores/email';
import { storeToRefs } from 'pinia'

export default {
  name: 'archive',
  setup() {
    const store = useEmailsStore()
    const getArchiveEmails = storeToRefs(store)
    
    return getArchiveEmails
  }
}
</script>