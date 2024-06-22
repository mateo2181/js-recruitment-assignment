<template>
    <div :style="getStyles">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'CustomCollapse',
    props: {
        minHeight: {
            type: Number,
            required: true
        },
        expanded: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        getStyles() {
            return {
                height: !this.expanded ? `${this.minHeight}px` : 'auto'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
div {
    overflow: hidden;
}
</style>