<template>
    <div class="titlebg">
        <div class="text">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
};
</script>

<style lang="scss" scoped>
.titlebg {
    width: 405px;
    height: 34px;
    background: url('@/assets/titlebg.png') repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .text {
        font-weight: 600;
        font-size: 20px;
        color: #FFFFFF;
        letter-spacing: 2px;
        margin-left: 40px;
        margin-top: 2px;
    }
}
</style>