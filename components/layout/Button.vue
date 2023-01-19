<template>
    <button v-if="type === 'button'">
        <span class="kave"></span>
        {{ content }}

        <span class="version" :data-text="config.version">
            {{ config.version }}
        </span>
    </button>

    <NuxtLink :to="link" v-else>
        <span class="kave"></span>
        {{ content }}

        <span class="version" :data-text="config.version">
            {{ config.version }}
        </span>
    </NuxtLink>

</template>

<script setup lang="ts">
const config = useRuntimeConfig()

defineProps({
    type: String,
    content: String,
    showTag: {
        type: Boolean,
        default: true,
    },
    link: {
        type: String,
        required: false,
    }
})

</script>

<style scoped lang="scss">
button, a {
    position: relative;
    border: solid 1px rgba(172, 73, 248, 0.3);
    background: none;
    color: rgba(172, 73, 248, 0.7);
    text-transform: uppercase;
    font-weight: normal;
    letter-spacing: 1.8px;
    padding: 20px 30px;
    transition: all 0.25s ease;
    outline: none;

    &::before, &::after {
        content: "";
        position: absolute;
        width: 60px;
        height: 1px;
        background: var(--purple);
        transition: all 0.25s ease;
    }

    &::before {
        bottom: -2px;
        left: 10%;
        transform: translateY(-1px);
    }
    
    &::after {
        top: -2px;
        right: 10%;
        transform: translateY(1px);
    }

    &:hover {
        box-shadow: 1px 1px 8px rgba(172, 73, 248, 0.3);
        color: var(--purple);
        text-shadow: 0 0 8px rgba(172, 73, 248, 0.4);

        &::before {
            left: -1px;
            width: 20px;
        }

        &::after {
            right: -1px;
            width: 20px;
        }

        .kave {
            &::before {
                top: 0;
            }

            &::after {
                bottom: 0;
            }
        }
    }

    .kave {
        &::before, &::after {
            content: "";
            position: absolute;
            width: 1px;
            height: 20px;
            transform: translateX(1px);
            background: var(--purple);
            transition: all 0.25s ease;
        }

        &::before {
            top: 30%;
            right: 0;
        }

        &::after {
            bottom: 30%;
            left: -2px;
        }
    }

    .version {
        position: absolute;
        bottom: 10%;
        right: 10%;
        font-size: 8px;
    }
}
</style>