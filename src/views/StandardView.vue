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
            <li v-for="item in entries" :key="item.id">
                {{ item.text }}
            </li>
        </b-row>
    </b-container>
</template>

<script>
// @ is an alias to /src
import CalculatorHeader from '@/components/CalculatorHeader.vue';
import StandardDisplay from '@/components/StandardDisplay.vue';
import StandardKeypad from '@/components/StandardKeypad.vue';
import calculatorFunctions from '../functions/calculator.functions';

export default {
    name: 'StandardView',
    components: {
        CalculatorHeader,
        StandardDisplay,
        StandardKeypad,
    },
    methods: {
        keypadPressed(keypadButtonInfo) {
            console.log(keypadButtonInfo);
            const parsedEntries = calculatorFunctions.calculatorParser(
                this.entries,
                keypadButtonInfo
            );
            this.entries = parsedEntries;

            this.display = calculatorFunctions.getDisplayText(this.entries);
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
            type: calculatorFunctions.INPUT_TYPES.DIGIT,
        });
        this.display = calculatorFunctions.getDisplayText(this.entries);
        this.keypadButtonInfos = [
            {
                ...calculatorFunctions.OPERATORS.percentage,
                text: '%',
                color: '#444',
            },
            {
                ...calculatorFunctions.OPERATORS.clearLastEntry,
                text: 'CE',
                color: '#444',
            },
            {
                ...calculatorFunctions.OPERATORS.clear,
                text: 'C',
                key: 'Escape',
                color: '#444',
            },
            {
                ...calculatorFunctions.OPERATORS.backspace,
                text: '&#9224;',
                color: '#444',
                key: 'Backspace',
            },
            {
                ...calculatorFunctions.OPERATORS.oneOverX,
                text: '&#185;/&#8339;',
                color: '#444',
            },
            {
                ...calculatorFunctions.OPERATORS.xSquared,
                text: '&#8339;&#178;',
                color: '#444',
            },
            {
                ...calculatorFunctions.OPERATORS.squareRoot,
                text: '&#178;&#8730;&#8339;',
                color: '#444',
            },
            {
                ...calculatorFunctions.OPERATORS.divide,
                text: '/',
                color: '#444',
            },
            {
                ...calculatorFunctions.DIGITS.seven,
                text: '7',
                color: 'black',
            },
            {
                ...calculatorFunctions.DIGITS.eight,
                text: '8',
                color: 'black',
            },
            {
                ...calculatorFunctions.DIGITS.nine,
                text: '9',
                color: 'black',
            },
            {
                ...calculatorFunctions.OPERATORS.multiply,
                text: 'x',
                key: '*',
                color: '#444',
            },
            {
                ...calculatorFunctions.DIGITS.four,
                text: '4',
                color: 'black',
            },
            {
                ...calculatorFunctions.DIGITS.five,
                text: '5',
                color: 'black',
            },
            {
                ...calculatorFunctions.DIGITS.six,
                text: '6',
                color: 'black',
            },
            {
                ...calculatorFunctions.OPERATORS.subtract,
                text: '-',
                color: '#444',
            },
            {
                ...calculatorFunctions.DIGITS.one,
                text: '1',
                color: 'black',
            },
            {
                ...calculatorFunctions.DIGITS.two,
                text: '2',
                color: 'black',
            },
            {
                ...calculatorFunctions.DIGITS.three,
                text: '3',
                color: 'black',
            },
            {
                ...calculatorFunctions.OPERATORS.add,
                text: '+',
                color: '#444',
            },
            {
                ...calculatorFunctions.OPERATORS.toggleSign,
                text: '&#177;',
                color: '#444',
            },
            {
                ...calculatorFunctions.DIGITS.zero,
                text: '0',
                color: 'black',
            },
            {
                ...calculatorFunctions.DIGITS.decimalSeparator,
                text: '.',
                color: '#444',
            },
            {
                ...calculatorFunctions.OPERATORS.equals,
                text: '=',
                color: 'green',
                key: 'Enter',
            },
        ];
    },
};
</script>
