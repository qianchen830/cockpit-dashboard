<template>
    <div class="content">
        <TitleComponent>数据详情</TitleComponent>
        <div class="tabel_border">
            <div class="tabel_head">
                <div class="tabel_head_one">
                    <div>预算</div>
                    <div>维度</div>
                </div>
                <div class="tabel_head_two">编制使用情况</div>
                <div class="tabel_head_thrww">人力预算使用情况</div>
            </div>

            <div class="tabel_title">
                <div v-for="(item, index) in tabeltitle" :key="index" :class="'tabel_title' + index"
                    class="tabel_title_default">{{ item }}</div>
            </div>

            <div class="tabel_list">
                <div v-for="(item, index) in tabel_list" :key="index" class="tabel_list_item">
                    <div v-for="(item_num, index_num) in item" :key="index_num" :class="'tabel_list_item' + index_num"
                        class="tabel_list_item_default">
                        {{ item_num }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleComponent from './titleComponent.vue';

export default {
    components: { TitleComponent },
    data() {
        return {
            tabeltitle: ['月份', '编制人数', '在岗人数', '满编率', '薪酬使用率', '加班费使用率', '福利使用率', '五险一金使用率', '招聘费使用率', '培训费使用率', '及时奖使用率', '其他预算使用率', '整体预算使用率'],
            tabel_list: [
                [
                    '1月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ],
                [
                    '2月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ], [
                    '3月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ], [
                    '4月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ], [
                    '5月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ], [
                    '6月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ], [
                    '7月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ], [
                    '8月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ], [
                    '9月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ], [
                    '10月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ], [
                    '11月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ], [
                    '12月', '30', '20', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%', '67%'
                ]
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    width: 1291px;
    height: 602px;
    background: #FAFBFE;
    border-radius: 6px 6px 6px 6px;
    margin-top: 19px;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .tabel_border {
        width: 100%;
        flex: 1;
        margin-top: 20px;

        .tabel_head {
            display: flex;
            font-size: 15px;
            height: 52px;
            color: #FAFBFE;
            text-align: center;

            .tabel_head_one {
                width: 60px;
                background: #4BB6FF;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .tabel_head_two {
                line-height: 52px;
                width: 216px;
                background: #3EB14F;
            }

            .tabel_head_thrww {
                line-height: 52px;
                flex: 1;
                background: #FEBB42;
            }
        }
    }
}

.tabel_title {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #000000;
    height: 32px;
    line-height: 32px;
    text-align: center;

    .tabel_title_default {
        flex: 1;
        background-color: rgba(254, 187, 66, 0.20);
    }

    .tabel_title0 {
        width: 60px;
        flex: none;
        background-color: rgba(75, 182, 255, 0.20);
    }

    .tabel_title1 {
        width: 72px;
        flex: none;

        background-color: rgba(62, 177, 79, 0.20);
    }

    .tabel_title2 {
        width: 72px;
        flex: none;
        background-color: rgba(62, 177, 79, 0.20);
    }

    .tabel_title3 {
        width: 72px;
        flex: none;
        background-color: rgba(62, 177, 79, 0.20);
    }
}

.tabel_list {
    .tabel_list_item {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #000000;
        text-align: center;
        height: 32px;
        line-height: 32px;
        margin: 2px 0;
        background-color: #FFFFFF;

        .tabel_list_item_default {
            flex: 1;
        }

        .tabel_list_item0 {
            width: 60px;
            flex: none;
        }

        .tabel_list_item1 {
            width: 72px;
            flex: none;
        }

        .tabel_list_item2 {
            width: 72px;
            flex: none;
        }

        .tabel_list_item3 {
            width: 72px;
            flex: none;
        }

        .tabel_list_item12 {
            background-color: #FFE8BF;
        }
    }
}
</style>