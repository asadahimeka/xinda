<template>
    <div>
        <swipeimg></swipeimg>
        <xIndex></xIndex>
        <mmProperty></mmProperty>
        <mmService></mmService>
        <mmPartners></mmPartners>
    </div>
</template>

<script>  
import swipeimg from './swipe-img'
import xIndex from './xxindex'
import mmProperty from './mmProperty'
import mmService from './mmService'
import mmPartners from './mmPartners'

export default {
    created() {
        window.scrollTo(0, 0);
    },
    components: {
        swipeimg,
        xIndex,
        mmProperty,
        mmService,
        mmPartners,
    },
}  
</script>  

<style>

</style>