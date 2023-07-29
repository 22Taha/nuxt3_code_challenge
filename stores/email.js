import { defineStore } from 'pinia'

export const useEmailsStore = defineStore('emails', {
  state: () => ({
    count: 0,
    nextId: 6,
    emails: [
      {
        id: 1,
        title: `Your Exclusive Coupon Awaits - Save on Your Next Purchase!`,
        content:`This email offers the recipient an exclusive coupon code to save 20% on their next purchase at our online store. Don't miss out on this limited-time offer to grab your favorite items at a discounted price!`,
        read: false,
        archived: false
      },
      {
        id: 2,
        title: `Discover the Latest Trends in Fashion and Style!`,
        content: `In this email, we showcase the hottest fashion trends and provide style tips to help you stay ahead in the fashion game. From seasonal outfits to celebrity-inspired looks, find your fashion inspiration here.`,
        read: false,
        archived: false
      },
      {
        id: 3,
        title: `Unlock Your Full Potential: Join Our Skill-Building Workshop!`,
        content: ` Join our upcoming skill-building workshop designed to enhance your professional abilities. This email outlines the workshop's benefits, esteemed guest speakers, and a link to register for the event.`,
        read: false,
        archived: false
      },
      {
        id: 4,
        title: `Your Opinion Matters: Take Our Customer Satisfaction Survey!`,
        content: ` We value your feedback! Help us improve our services by taking a brief customer satisfaction survey. As a token of appreciation, participants have a chance to win exciting prizes.`,
        read: true,
        archived: false
      },
      {
        id: 5,
        title: `Breaking News: New Product Launch - Be the First to Know!`,
        content: `  Get a sneak peek of our latest product before its official release. This email reveals the exciting features and benefits of the new product and provides a link to pre-order exclusively for our subscribers.`,
        read: false,
        archived: true
      },
    ]
  }),
  
  getters: {
    getInboxEmails: state => {
      return state.emails.filter(email => !email.archived)
    },
    getArchiveEmails: state => {
      return state.emails.filter(email => email.archived)
    },
    getEmailById: (state) => (emailId) => {
      return state.emails.find(email => email.id === emailId)
    }
  },

  actions: {
    markEmailAsRead(emailId) {
      this.changeEmailProperty(emailId, 'read', true)
    },
    markEmailAsRead(emailId) {
      this.changeEmailProperty(emailId, 'archived', true)
    },
    changeEmailProperty(emailId, property, value) {
      const email = this.emails.find(_email => _email.id === emailId)
      if (email) {
        email[property] = value
      } else {
        console.log(`Email with ID: ${emailId} not found!`)
      }
    },
    addNewEmail(email) {
      this.emails.push({ id: this.nextId, ...email })
      this.nextId++
    }
  },
})