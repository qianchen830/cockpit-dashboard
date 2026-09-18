<template>
    <div style="width: 100%;">
        <div class="flex_style">
            <div class="text">
                <slot></slot>
            </div>
            <img src="@/assetsbudget/arrows.png" alt="" class="arrowsbg">
        </div>
        <img src="@/assetsbudget/linebg.png" alt="" class="lineimg">
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.flex_style {
    display: flex;
    align-items: center;

    .text {
        font-weight: 700;
        font-size: 24px;
        color: transparent;
        background: linear-gradient(to bottom, #023FCB 20%, #6DBAF8 100%);
        -webkit-background-clip: text;
        letter-spacing: 1px;
    }

    .arrowsbg {
        width: 40px;
        height: 20px;
        margin-left: 2px;
    }
}

.lineimg {
    width: 100%;
    height: 6px;
    margin-top: 14px;
}
</style>