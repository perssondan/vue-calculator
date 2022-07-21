<template>
    <button
        class="btn"
        :style="{ background: color }"
        @click="onClick()"
        v-html="text"
    />
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

<style scoped>
.btn {
    display: inline-block;
    background: #000;
    color: #fff;
    border: none;
    margin: 0;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 25px;
    font-family: inherit;
}
.btn:focus {
    outline: none;
}
.btn:active {
    transform: scale(0.98);
}
.btn:hover {
    /* filter: brightness(250%); // Only affects color and not background */
    box-shadow: inset 0 0 0 10em rgba(255, 255, 255, 0.3);
}
.btn-block {
    display: block;
    width: 100%;
}
</style>
