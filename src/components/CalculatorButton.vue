<template>
    <b-button-group size="lg">
        <b-button
            pill
            :style="{ background: color }"
            @click="onClick()"
            v-html="text"
        />
    </b-button-group>
</template>

<script>
export default {
    name: 'CalculatorButton',
    props: {
        text: String,
        color: String,
    },
    methods: {
        onClick() {
            this.$emit('btn-click');
        },
    },
};
</script>
