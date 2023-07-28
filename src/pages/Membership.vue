<template>
  <CardPresent />
  <BenefitCategories />
</template>

<script>
import CardPresent from "../components/membership-components/CardPresent.vue";
import BenefitCategories from "../components/membership-components/BenefitCategories.vue";
export default {
  name: "web-Membership",
  components: {
    CardPresent,
    BenefitCategories,
  },
};
</script>

<style></style>
