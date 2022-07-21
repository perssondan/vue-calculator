<template>
    <div class="content">
        <div class="keypadBody">
            <template
                :key="keypadButtonInfo.id"
                v-for="keypadButtonInfo in keypadButtonInfos"
            >
                <CalculatorButton
                    :text="keypadButtonInfo.text"
                    :color="keypadButtonInfo.color"
                    @btn-click="$emit('keypad-press', keypadButtonInfo)"
                />
            </template>
        </div>
    </div>
</template>

<script>
import CalculatorButton from './CalculatorButton.vue';
export default {
    name: 'StandardKeypad',
    props: {
        keypadButtonInfos: Array,
    },
    components: {
        CalculatorButton,
    },
};
</script>

<style>
.content {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    /* min-height: 100vh;
    min-width: 100vw; */
}
.keypadBody {
    /* height: 100vh;
    width: 100vw; */
    display: grid;
    grid-template: 1fr 1fr 1fr 1fr 1fr 1fr / 1fr 1fr 1fr 1fr;
    grid-gap: 5px;
    /* max-height: 600px;
    max-width: 450px; */
}
</style>
