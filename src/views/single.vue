<template>
<snake-border :size='singleSize'/>
</template>

<script>
import SnakeBorder from '../components/border.vue'
export default {
name:'double',
components: {
    SnakeBorder
},
data() {
    return {
    singleSize:30
    }
},
}
</script>
<style scoped>

</style>