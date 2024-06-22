<template>
    <div>
        <h2>Reschedule</h2>
        <p> Click the button to confirm</p>
    </div>
    <button :disabled="loading" @click="$emit('confirmNewAppointment')">
        {{ date }}
    </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ConfirmAppointment',
    props: {
        date: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    emits: ['confirmNewAppointment']
})
</script>
<style lang="scss" scoped>
p {
    font-size: 18px;
}

button {
    background-color: var(--blue-bg);
    color: var(--vt-c-white);
    padding: 12px 4px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;

    &:disabled {
        opacity: .6;
        cursor: not-allowed;
    }
}
</style>