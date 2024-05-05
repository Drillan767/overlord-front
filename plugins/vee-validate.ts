import { defineRule, configure } from 'vee-validate'
import { required, min, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'

export default defineNuxtPlugin(() => {
  // Define the rule globally
  defineRule('required', required)
  defineRule('min', min)
  defineRule('email', email)

  configure({
    // Generates an English message locale generator
    generateMessage: localize('en', {
      messages: {
        required: 'This field is required.',
        email: 'Please provide a valid email address.'
      },
    }),
  })
})
