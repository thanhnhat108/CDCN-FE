<template>
  <router-view />
</template>

<script>
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
export default {
  name: "App",
};
locale.use(lang);

</script>

<style></style>
