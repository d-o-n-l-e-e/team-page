<template>
<span class="icon" v-html="require(`../assets/svgs/${icon}.svg`)"></span>
</template>

<script>
export default {
  name: 'svg-icon',
  props: ['icon']
}
</script>

