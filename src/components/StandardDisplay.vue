<template>
    <div class="display-frame">
        <div class="result">{{ displayText }}</div>
    </div>
</template>

<script>
export default {
    name: 'StandardDisplay',
    props: {
        displayText: String,
    },
};
</script>

<style scoped lang="css">
.display-frame {
    display: block;
    border: 1px solid #ffffff;
    padding: 5px 10px;
    margin: 10px 0;
    border-radius: 2px;
}
.result {
    text-align: right;
    color: white;
    margin: 10px 0;
    cursor: default;
}
</style>
