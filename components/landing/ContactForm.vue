<template>
    <section id="contact">
        <div class="content grid grid-cols-2 gap-8">
            <div class="col-span-2 sm:col-span-1">
                <h2 v-html="t('message')" />
            </div>
            <form @submit.prevent="submit">
                 <Input
                    :label="t('form.fullName')"
                    v-model="form.name"
                    identifier="name"
                    class="col-span-2 sm:col-span-1"
                />
                 <Input
                    type="email"
                    :label="t('form.email')"
                    v-model="form.email"
                    identifier="email"
                    class="col-span-2 sm:col-span-1"
                />
                <Input
                    :label="t('form.subject')"
                    v-model="form.subject"
                    identifier="subject"
                    class="col-span-2"
                />

                <Textarea
                    label="Message"
                    v-model="form.content"
                    identifier="message"
                    class="col-span-2"
                />

                <div class="flex justify-end col-span-2">
                    <Button
                        type="button"
                        :content="t('form.send')"
                    />
                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import Button from "~~/components/layout/Button.vue";
import Input from "~~/components/layout/Input.vue";
import Textarea from "~~/components/layout/Textarea.vue";

const { t } = useI18n()

const form = ref({
    name: '',
    email: '',
    subject: '',
    content: '',
    hp: '',
})

const submit = async () => {
    await console.log(form)
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
    }
}
</style>

<i18n lang="json">
{
    "fr-FR": {
        "message": "Need help? <br />Want to ask <span class=\"glitch\" data-text=\"something\">something</span>? Talk about <span class=\"glitch\" data-text=\"anything\">anything</span>? Drop a mail!",
        "form": {
            "fullName": "Nom complet",
            "email": "Adresse email",
            "subject": "Objet",
            "send": "Envoyer"
        }
    },
    "en-US": {
        "message": "Besoin d'aide ? <br /> Ou simplement besoin de <span class=\"glitch\" data-text=\"discuter\">discuter</span> ?<br /> Envoyez-moi un <span class=\"glitch\" data-text=\"message\">message</span> !",
        "form": {
            "fullName": "Full name",
            "email": "Email address",
            "subject": "Subject",
            "send": "Send"
        }
    }
}
</i18n>