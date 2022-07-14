<template>
  <div class="home">
    <CalculatorHeader />
    <StandardDisplay />
  </div>
</template>

<script>
// @ is an alias to /src
import CalculatorHeader from '@/components/CalculatorHeader.vue';
import StandardDisplay from '@/components/StandardDisplay.vue';

export default {
  name: 'HomeView',
  components: {
    CalculatorHeader,
    StandardDisplay,
  },
};
</script>
