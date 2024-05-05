<template>
    <section id="contact">
        <VContainer>
            <VRow>
                <VCol
                    cols="12"
                    md="4"
                    class="offset-md-2"
                >
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
                </VCol>
                <VCol cols="4">
                    <VForm>
                        <VRow v-if="sent">
                            <VAlert
                                type="success"
                                title="Message sent successfully"
                                text="I'll get back to you as soon as possible!"
                            />
                        </VRow>
                        <VRow>
                            <VCol cols="6">
                                <VTextField
                                    v-bind="nameProps"
                                    v-model="name"
                                    label="Full name"
                                />
                            </VCol>
                            <VCol cols="6">
                                <VTextField
                                    v-bind="emailProps"
                                    v-model="email"
                                    label="Email address"
                                />
                            </VCol>
                        </VRow>
                        <VRow>
                            <VCol>
                                <VTextField
                                    v-bind="subjectProps"
                                    v-model="subject"
                                    label="Subject"
                                />
                            </VCol>
                        </VRow>
                        <VRow>
                            <VCol>
                                <VTextarea
                                    v-bind="contentProps"
                                    v-model="content"
                                    :auto-grow="true"
                                    rows="2"
                                    label="Message"
                                />
                            </VCol>
                        </VRow>
                        <VRow>
                            <VCol>
                                <VueHcaptcha
                                    :sitekey="hcSitekey"
                                    theme="dark"
                                    @verify="onVerify"
                                    @expired="onExpire"
                                    @challenge-expired="onChallengeExpire"
                                    @error="onError"
                                />
                            </VCol>
                            <VCol class="d-flex justify-end">
                                <Button
                                    type="button"
                                    content="Send"
                                    @click="submit"
                                />
                            </VCol>
                        </VRow>
                    </VForm>
                </VCol>
            </VRow>
        </VContainer>
    </section>
</template>

<script setup lang="ts">
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import Button from "~~/components/layout/Button.vue"

interface FormType {
    name: string
    email: string
    subject: string
    content: string
}

const config = useRuntimeConfig()
const { createItems } = useDirectusItems();

const error = ref('')
const verified = ref(false)
const sent = ref(false)

const { defineField, handleSubmit, resetForm } = useForm<FormType>({
    validationSchema: {
        name: 'required',
        email: 'required|email',
        subject: 'required',
        content: 'required|min:10'
    }
})

const [name, nameProps] = defineField('name', vuetifyConfig)
const [email, emailProps] = defineField('email', vuetifyConfig)
const [subject, subjectProps] = defineField('subject', vuetifyConfig)
const [content, contentProps] = defineField('content', vuetifyConfig)

const formValid = useIsFormValid()

const hcSitekey = computed(() => config.public.hcSitekey ?? undefined)

const submit = handleSubmit(async (form) => {
    if (!formValid || !verified.value) return

    try {
        await createItems<FormType>({
            collection: 'Inquiries',
            items: [form],
        })

        resetForm()
    } catch (e: any) {
        console.error(e)
    }
    
})

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

</script>

<style scoped lang="scss">
#contact {
    min-height: 100vh;
    display: flex;
    align-items: center;

    h2 {
        text-transform: uppercase;
        font-size: clamp(2rem, 0.75rem + 4vw, 3rem);
        text-align: right;
        line-height: 1;
    }
}
</style>
