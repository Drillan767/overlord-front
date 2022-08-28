<template>
    <section id="contact">
        <div class="content grid grid-cols-2 gap-8">
            <div class="col-span-2 sm:col-span-1">
                <h2>
                    Need help? <br />Want to ask
                    <span class="glitch" data-text="something">something</span>?
                    Talk about <span class="glitch" data-text="anything">anything</span>?
                     Drop a mail!
                </h2>
            </div>
            <form @submit.prevent="submit" class="col-span-2 sm:col-span-1 grid grid-cols-2 gap-4">
                 <Input
                    label="Full name"
                    v-model="form.name"
                    identifier="name"
                    class="col-span-2 sm:col-span-1"
                />
                 <Input
                    type="email"
                    label="Email address"
                    v-model="form.email"
                    identifier="email"
                    class="col-span-2 sm:col-span-1"
                />
                <Input
                    label="Subject"
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
                    <button type="submit">
                        <span class="inner">
							Send
						</span>
                    </button>
                </div>

            </form>
        </div>
    </section>

</template>

<script setup lang="ts">
import Input from "../layout/Input.vue";
import Textarea from "../layout/Textarea.vue";

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