<template>
    <b-container fluid>
        <b-row class="justify-content-md-center">
            <b-col col lg="4">
                <CalculatorHeader />
            </b-col>
        </b-row>

        <b-row class="justify-content-md-center">
            <b-col col xl="5" lg="6" md="8">
                <StandardDisplay :displayText="result" />
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
            <li v-for="item in calcCache" :key="item.id">
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
            console.log('keypadButtonInfo', keypadButtonInfo, this.calcCache);

            const newCalcCache = calculatorFunctions.calculatorParserV2(
                this.calcCache,
                keypadButtonInfo
            );
            console.log('resultV2', newCalcCache, this.calcCache);
            this.calcCache = newCalcCache;

            this.result = calculatorFunctions.getDisplayText(this.calcCache);
        },
        keyPressed(event) {
            const { key } = event;

            const keypadButtonInfo = this.keypadButtonInfos.find(
                (keypadButton) => keypadButton.text === key
            );

            if (keypadButtonInfo) {
                this.keypadPressed(keypadButtonInfo);
            }
        },
    },
    data() {
        return {
            keypadButtonInfos: [],
            result: '0',
            calcCache: [],
        };
    },
    unmounted() {
        window.removeEventListener('keydown', this.keyPressed);
    },
    created() {
        window.addEventListener('keydown', this.keyPressed);
        this.calcCache.push({
            text: '0',
            type: calculatorFunctions.DIGIT_TYPE,
        });
        this.result = calculatorFunctions.getDisplayText(this.calcCache);
        this.keypadButtonInfos = [
            {
                id: 1,
                text: '%',
                operator: 'percent',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 2,
                text: 'CE',
                operator: 'clearLastEntry',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 3,
                text: 'C',
                operator: 'clear',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 4,
                text: '&#9224;',
                operator: 'backspace',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 5,
                text: '&#185;/&#8339;',
                operator: 'oneOverX',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 6,
                text: '&#8339;&#178;',
                operator: 'xSquared',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 7,
                text: '&#178;&#8730;&#8339;',
                operator: 'squareRoot',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 8,
                text: '/',
                operator: 'divide',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 9,
                text: '7',
                operator: 'seven',
                color: 'black',
                type: calculatorFunctions.DIGIT_TYPE,
            },
            {
                id: 10,
                text: '8',
                operator: 'eight',
                color: 'black',
                type: calculatorFunctions.DIGIT_TYPE,
            },
            {
                id: 11,
                text: '9',
                operator: 'nine',
                color: 'black',
                type: calculatorFunctions.DIGIT_TYPE,
            },
            {
                id: 12,
                text: 'x',
                operator: 'multiply',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 13,
                text: '4',
                operator: 'four',
                color: 'black',
                type: calculatorFunctions.DIGIT_TYPE,
            },
            {
                id: 14,
                text: '5',
                operator: 'five',
                color: 'black',
                type: calculatorFunctions.DIGIT_TYPE,
            },
            {
                id: 15,
                text: '6',
                operator: 'six',
                color: 'black',
                type: calculatorFunctions.DIGIT_TYPE,
            },
            {
                id: 16,
                text: '-',
                operator: 'subtract',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 17,
                text: '1',
                operator: 'one',
                color: 'black',
                type: calculatorFunctions.DIGIT_TYPE,
            },
            {
                id: 18,
                text: '2',
                operator: 'two',
                color: 'black',
                type: calculatorFunctions.DIGIT_TYPE,
            },
            {
                id: 19,
                text: '3',
                operator: 'three',
                color: 'black',
                type: calculatorFunctions.DIGIT_TYPE,
            },
            {
                id: 20,
                text: '+',
                operator: 'add',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 21,
                text: '&#177;',
                operator: 'toggleSign',
                color: '#444',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
            {
                id: 22,
                text: '0',
                operator: 'zero',
                color: 'black',
                type: calculatorFunctions.DIGIT_TYPE,
            },
            {
                id: 23,
                text: '.',
                operator: 'decimalPoint',
                color: '#444',
                type: calculatorFunctions.DIGIT_TYPE,
            },
            {
                id: 24,
                text: '=',
                operator: 'equals',
                color: 'green',
                type: calculatorFunctions.OPERATOR_TYPE,
            },
        ];
    },
};
</script>
