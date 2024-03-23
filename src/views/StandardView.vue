<template>
    <b-container fluid>
        <b-row class="justify-content-md-center">
            <b-col col lg="4">
                <CalculatorHeader />
            </b-col>
        </b-row>

        <b-row class="justify-content-md-center">
            <b-col col xl="5" lg="6" md="8">
                <StandardDisplay :displayText="display" />
            </b-col>
        </b-row>

        <b-row class="justify-content-md-center">
            <b-col xl="5" lg="6" md="8" class="mt-2 mb-5">
                <StandardKeypad
                    :keypadButtonInfos="keypadButtonInfos"
                    @keypad-press="keypadPressed"
                />
            </b-col>
        </b-row>
        <b-row>
            <b-col v-for="item in entries" :key="item.id">
                {{ item.text }}
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
// @ is an alias to /src
import CalculatorHeader from '@/components/CalculatorHeader.vue';
import StandardDisplay from '@/components/StandardDisplay.vue';
import StandardKeypad from '@/components/StandardKeypad.vue';
import { KEYS, KEY_TYPES } from '../functions/calculator.constants.js';
import calculatorEngine from '../functions/calculator.engine.js';

export default {
    name: 'StandardView',
    components: {
        CalculatorHeader,
        StandardDisplay,
        StandardKeypad,
    },
    methods: {
        keypadPressed(keypadButtonInfo) {
            const parsedEntries = calculatorEngine.calculatorParser(
                this.entries,
                keypadButtonInfo
            );
            this.entries = parsedEntries;

            this.display = calculatorEngine.getDisplayText(this.entries);
        },
        keyPressed(event) {
            const { key } = event;

            const keypadButtonInfo = this.keypadButtonInfos.find(
                (keypadButton) =>
                    keypadButton.text === key || keypadButton.key === key
            );

            if (keypadButtonInfo) {
                this.keypadPressed(keypadButtonInfo);
                event.preventDefault();
            } else {
                console.log('Key not found', key);
            }
        },
    },
    data() {
        return {
            keypadButtonInfos: [],
            display: '0',
            entries: [],
        };
    },
    unmounted() {
        window.removeEventListener('keydown', this.keyPressed);
    },
    created() {
        window.addEventListener('keydown', this.keyPressed);
        this.entries.push({
            text: '0',
            type: KEY_TYPES.NUMBER,
        });
        this.display = calculatorEngine.getDisplayText(this.entries);
        this.keypadButtonInfos = [
            {
                ...KEYS.FUNCTIONS.percentage,
                text: '%',
                color: '#444',
            },
            {
                ...KEYS.EDITS.clearLastEntry,
                text: 'CE',
                color: '#444',
            },
            {
                ...KEYS.EDITS.clear,
                text: 'C',
                key: 'Escape',
                color: '#444',
            },
            {
                ...KEYS.EDITS.backspace,
                text: '&#9224;',
                color: '#444',
                key: 'Backspace',
            },
            {
                ...KEYS.FUNCTIONS.oneOverX,
                text: '&#185;/&#8339;',
                color: '#444',
            },
            {
                ...KEYS.FUNCTIONS.xSquared,
                text: '&#8339;&#178;',
                color: '#444',
            },
            {
                ...KEYS.FUNCTIONS.squareRoot,
                text: '&#178;&#8730;&#8339;',
                color: '#444',
            },
            {
                ...KEYS.OPERATIONS.divide,
                text: '/',
                color: '#444',
            },
            {
                ...KEYS.NUMBERS.seven,
                text: '7',
                color: 'black',
            },
            {
                ...KEYS.NUMBERS.eight,
                text: '8',
                color: 'black',
            },
            {
                ...KEYS.NUMBERS.nine,
                text: '9',
                color: 'black',
            },
            {
                ...KEYS.OPERATIONS.multiply,
                text: 'x',
                key: '*',
                color: '#444',
            },
            {
                ...KEYS.NUMBERS.four,
                text: '4',
                color: 'black',
            },
            {
                ...KEYS.NUMBERS.five,
                text: '5',
                color: 'black',
            },
            {
                ...KEYS.NUMBERS.six,
                text: '6',
                color: 'black',
            },
            {
                ...KEYS.OPERATIONS.subtract,
                text: '-',
                color: '#444',
            },
            {
                ...KEYS.NUMBERS.one,
                text: '1',
                color: 'black',
            },
            {
                ...KEYS.NUMBERS.two,
                text: '2',
                color: 'black',
            },
            {
                ...KEYS.NUMBERS.three,
                text: '3',
                color: 'black',
            },
            {
                ...KEYS.OPERATIONS.add,
                text: '+',
                color: '#444',
            },
            {
                ...KEYS.FUNCTIONS.toggleSign,
                text: '&#177;',
                color: '#444',
            },
            {
                ...KEYS.NUMBERS.zero,
                text: '0',
                color: 'black',
            },
            {
                ...KEYS.NUMBERS.decimalSeparator,
                text: '.',
                color: '#444',
            },
            {
                ...KEYS.OPERATIONS.equals,
                text: '=',
                color: 'green',
                key: 'Enter',
            },
        ];
    },
};
</script>
