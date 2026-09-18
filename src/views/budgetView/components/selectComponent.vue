<template>
    <div class="select_style">
        <div class="select" @click="changeshow" :style="{ width: width }">
            {{option.find(item => item.value == value).label}}
        </div>
        <img src="@/assetsbudget/select.png" alt="" @click="changeshow" :class="isShow ? 'isrotate' : ''">

        <div class="select_list" v-show="isShow" @mouseleave="mouseleaveevent">
            <div v-for="(item, index) in option" :key="index" class="select_list_item" @click="changeVal(item)">{{
                item.label }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        option: {
            type: Array,
            default: () => {
                return [];
            },
        },
        value: {
            type: String,
            default: () => {
                return '';
            },
        },
        width: {
            type: String,
            default: () => {
                return '80px';
            },
        },
    },

    data() {
        return {
            isShow: false
        }
    },
    methods: {
        changeshow() {
            this.isShow = !this.isShow
        },
        changeVal(val) {
            this.isShow = false
            this.$emit('changeselect', val.value)
        },
        mouseleaveevent() {
            this.isShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
.select_style {
    display: flex;
    align-items: center;
    height: 32px;
    cursor: pointer;
    position: relative;

    .select {
        height: 32px;
        width: 80px;
        padding: 5px 8px;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 14px;
        color: #303133;
        background-color: #FFFFFF;
        border-radius: 4px 4px 4px 4px;
    }

    img {
        width: 32px;
        height: 32px;
    }

    .isrotate {
        transform: rotate(180deg);

    }

    .select_list {
        position: absolute;
        top: 36px;
        left: 0;
        width: 112px;
        max-height: 130px;
        overflow-y: scroll;
        font-size: 16px;
        color: #303133;

        background-color: #FFFFFF;
        z-index: 999;

        .select_list_item {
            text-align: center;
            padding: 6px 0;
            box-sizing: border-box;

            &:hover {
                background-color: #ECF2FB;
            }
        }
    }
}

/* 隐藏整体滚动条 */
::-webkit-scrollbar {
    display: none;
}
</style>