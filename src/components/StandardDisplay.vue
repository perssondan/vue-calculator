<template>
    <div class="display-frame">
        <h2>{{ displayText }}</h2>
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

<style>
h2 {
    text-align: right;
    color: white;
    margin: 0;
}
.display-frame {
    border: 1px solid #ffffff;
    padding: 2px 8px;
}
</style>
