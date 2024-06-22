<template>
    <p>
        Confirm your appointment with <strong>{{ doctor }}</strong>
    </p>
    <div class="card appointment">
        <v-icon v-if="!loading" :scale="1.3" name="bi-calendar-week-fill" />
        <v-icon v-else :scale="1.3" name="ri-loader-3-fill" animation="spin"/>
        <span :class="{'loading': loading}"> On {{ date }} </span>
    </div>
</template>
<script>
export default {
    name: 'CurrentAppointment',
    props: {
        date: {
            type: String,
            required: true
        },
        doctor: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
p {
    font-size: 18px;
}
.appointment {
    display: flex;
    align-items: center;
    gap: 12px;
    span.loading {
        text-decoration: line-through;
    }
}
</style>