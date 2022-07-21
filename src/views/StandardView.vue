<template>
    <div class="standard">
        <CalculatorHeader />
        <StandardDisplay :displayText="result" />
        <StandardKeypad
            :keypadButtonInfos="keypadButtonInfos"
            @keypad-press="keypadPressed"
        />
    </div>
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

            this.result = calculatorFunctions.calculatorParser(
                this.operationsCache,
                keypadButtonInfo
            );

            // this.result = calculatorFunctions.calculate(
            //     this.operations,
            //     keypadButtonInfo
            // );
            console.log('operations', this.operationsCache, this.result);
            // if (keypadButtonInfo.type === 'digit') {
            //     this.result = this.result + keypadButtonInfo.text;
            // }
            // switch (keypadButtonInfo.operator) {
            //     case 'clear':
            //         this.result = '0';
            //         this.operations = [];
            //         break;
            //     case 'clearLastEntry':
            //         this.result = '0';
            //         break;
            //     case 'equals':
            //         break;
            //     default:
            //         console.log(`${keypadButtonInfo.operator} not handled`);
            //         break;
            // }
        },
    },
    data() {
        return {
            keypadButtonInfos: [],
            operations: [],
            result: '0',
            operationsCache: {
                firstInput: '',
                firstValue: 0,
                secondInput: '',
                secondValue: 0,
                operator: null,
            },
        };
    },
    created() {
        this.keypadButtonInfos = [
            {
                id: 1,
                text: '%',
                operator: 'percent',
                color: '#444',
                type: 'operator',
            },
            {
                id: 2,
                text: 'CE',
                operator: 'clearLastEntry',
                color: '#444',
                type: 'operator',
            },
            {
                id: 3,
                text: 'C',
                operator: 'clear',
                color: '#444',
                type: 'operator',
            },
            {
                id: 4,
                text: '&#9224;',
                operator: 'backspace',
                color: '#444',
                type: 'operator',
            },
            {
                id: 5,
                text: '&#185;/&#8339;',
                operator: 'oneOverX',
                color: '#444',
                type: 'operator',
            },
            {
                id: 6,
                text: '&#8339;&#178;',
                operator: 'xSquared',
                color: '#444',
                type: 'operator',
            },
            {
                id: 7,
                text: '&#178;&#8730;&#8339;',
                operator: 'squareRoot',
                color: '#444',
                type: 'operator',
            },
            {
                id: 8,
                text: '/',
                operator: 'divide',
                color: '#444',
                type: 'operator',
            },
            {
                id: 9,
                text: '7',
                operator: 'seven',
                color: 'black',
                type: 'digit',
            },
            {
                id: 10,
                text: '8',
                operator: 'eight',
                color: 'black',
                type: 'digit',
            },
            {
                id: 11,
                text: '9',
                operator: 'nine',
                color: 'black',
                type: 'digit',
            },
            {
                id: 12,
                text: 'x',
                operator: 'multiply',
                color: '#444',
                type: 'operator',
            },
            {
                id: 13,
                text: '4',
                operator: 'four',
                color: 'black',
                type: 'digit',
            },
            {
                id: 14,
                text: '5',
                operator: 'five',
                color: 'black',
                type: 'digit',
            },
            {
                id: 15,
                text: '6',
                operator: 'six',
                color: 'black',
                type: 'digit',
            },
            {
                id: 16,
                text: '-',
                operator: 'subtract',
                color: '#444',
                type: 'operator',
            },
            {
                id: 17,
                text: '1',
                operator: 'one',
                color: 'black',
                type: 'digit',
            },
            {
                id: 18,
                text: '2',
                operator: 'two',
                color: 'black',
                type: 'digit',
            },
            {
                id: 19,
                text: '3',
                operator: 'three',
                color: 'black',
                type: 'digit',
            },
            {
                id: 20,
                text: '+',
                operator: 'add',
                color: '#444',
                type: 'operator',
            },
            {
                id: 21,
                text: '&#177;',
                operator: 'toggleSign',
                color: '#444',
                type: 'operator',
            },
            {
                id: 22,
                text: '0',
                operator: 'zero',
                color: 'black',
                type: 'digit',
            },
            {
                id: 23,
                text: '.',
                operator: 'decimalPoint',
                color: '#444',
                type: 'digit',
            },
            {
                id: 24,
                text: '=',
                operator: 'equals',
                color: 'green',
                type: 'operator',
            },
        ];
    },
};
</script>

<style>
.standard {
    display: block;
    margin-left: auto;
    margin-right: auto;
    min-height: 100vh;
    max-width: 450px;
}
</style>
