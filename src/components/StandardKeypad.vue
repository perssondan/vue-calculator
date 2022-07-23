<template>
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
.keypadBody {
    display: grid;
    grid-template: 1fr 1fr 1fr 1fr 1fr 1fr / 1fr 1fr 1fr 1fr;
    grid-gap: 5px;
}
</style>
