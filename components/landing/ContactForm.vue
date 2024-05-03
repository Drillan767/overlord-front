<template>
    <section id="contact">
        <div class="content grid grid-cols-2 gap-8">
            <div class="col-span-2 sm:col-span-1">
                <h2>
                    Need help? <br />
                    Want to ask
                    <span class="glitch" data-text="something">
                        something
                    </span>
                    ? Talk about
                    <span class="glitch" data-text="anything">
                        anything
                    </span>
                    ? Drop a mail!

                </h2>
            </div>

            <form @submit.prevent="submit" v-if="!sent">
                <p class="error" v-if="error !== ''">
                    {{ error }}
                </p>

                <!-- <Input :label="t('form.fullName')" v-model="form.name" identifier="name" class="col-span-2 sm:col-span-1"
                    :error="validationError('name')" />
                <Input type="email" :label="t('form.email')" v-model="form.email" identifier="email"
                    class="col-span-2 sm:col-span-1" :error="validationError('email')" />
                <Input :label="t('form.subject')" v-model="form.subject" identifier="subject" class="col-span-2"
                    :error="validationError('subject')" />

                <Textarea label="Message" v-model="form.content" identifier="message" class="col-span-2"
                    :error="validationError('content')" /> -->

                <!-- <VueHcaptcha :sitekey="hcSitekey" :theme="color" @verify="onVerify" @expired="onExpire"
                    @challenge-expired="onChallengeExpire" @error="onError" /> -->
                <p v-if="error !== ''" class="text-red">
                    {{ error }}
                </p>

                <div class="flex justify-end col-span-2">
                    <!-- <Button type="button" :content="t('form.send')" /> -->
                </div>
            </form>
            <div v-if="sent" class="contact-feedback">
                <Check />
                <p>Message sent successfully, I'll get back to you as soon as possible!</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import Check from '~~/components/svg/Check.vue'
import Button from "~~/components/layout/Button.vue"
import Input from "~~/components/layout/Input.vue"
import Textarea from "~~/components/layout/Textarea.vue"

const { hcSitekey } = useRuntimeConfig()
// const color = useTheme()
const error = ref('')
const verified = ref(false)
const sent = ref(false)

const getInitialFormData = () => ({
    name: '',
    email: '',
    subject: '',
    content: ''
})

const form = ref({
    name: '',
    email: '',
    subject: '',
    content: ''
})

const rules = computed(() => ({
   /*  name: {
        required: helpers.withMessage(t('form.required'), required)
    },
    email: {
        required: helpers.withMessage(t('form.required'), required),
        email: helpers.withMessage(t('form.validEmail'), email)
    },
    subject: {
        required: helpers.withMessage(t('form.required'), required),
    },
    content: {
        required: helpers.withMessage(t('form.required'), required),
        minLength: helpers.withMessage(t('form.minLength'), minLength(10))
    } */
}))

const submit = async () => {

/*     validation.value.$validate()
    if (!verified.value) {
        error.value = t('form.noCaptcha')
        return
    }

    if (!validation.value.$error) {
        await useAsyncQuery(contactQuery, form.value)
            .then(() => {
                sent.value = true
                Object.assign(form.value, getInitialFormData())
                validation.value.$reset()
            })
    } */
}

const onVerify = () => {
    error.value = ''
    verified.value = true
}

const onError = (e: string) => {
    error.value = e
    verified.value = false
}

const onExpire = () => {
    // error.value = t('captcha.expired')
    verified.value = false
}

const onChallengeExpire = () => {
    // error.value = t('captcha.expired')
    verified.value = false
}

const validationError = (field: string) => {
    // const fieldError = validation.value.$errors.find((error) => error.$property === field)
    return '' ?? undefined
}

</script>

<style scoped lang="scss">
#contact {
    background-color: var(--bg-contact);
    min-height: var(--landing-min-height);
    padding: var(--landing-padding);
    display: flex;
    align-items: center;

    h2 {
        text-transform: uppercase;
        font-size: clamp(2rem, 0.75rem + 4vw, 3rem);
        text-align: right;
        line-height: 1;
        color: var(--title-color);
    }

    form {
        @apply col-span-2 sm:col-span-1 grid grid-cols-2 gap-4;

        .error {
            @apply text-red-500 col-span-2;
        }
    }

    .contact-feedback {
        @apply col-span-2 sm:col-span-1 bg-green-500 text-white py-3 text-center flex flex-col items-center justify-center gap-y-5 px-12;

        svg {
            @apply h-24 w-24;
        }

        p {
            @apply text-xl;
        }
    }
}
</style>
