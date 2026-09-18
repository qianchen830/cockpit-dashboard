<template>
    <div>
        <div class="content_top">
            <TitleComponent>超支及成本偏差预警</TitleComponent>

            <div class="list_head">
                <div>时间维度</div>
                <div>编制情况</div>
                <div>成本使用</div>
            </div>

            <div v-for="(item, index) in listdata" :key="index" class="list_item"
                :class="(index + 1) % 2 === 0 || listdata.length - 1 == index ? 'isshowbg' : ''">
                <div>{{ item.time }}</div>
                <div :class="item.stateCode == '1' ? 'state1_style' : 'state0_style'" v-if="item.stateCode">{{
                    item.state }}</div>
                <div v-else class="none_style"> - </div>
                <div :class="item.costCode == '1' ? 'cost1_style' : 'cost0_style'" v-if="item.costCode">{{ item.cost }}
                </div>
                <div v-else class="none_style"> - </div>
            </div>


        </div>
        <div class="content_bottom">
            <TitleComponent>关键人效指标</TitleComponent>

            <div class="indicatorlist">
                <div v-for="(item, index) in indicatorlist" :key="index" class="indicatorlist_item"
                    :class="index > 2 ? `maxwidth list_item${index}` : `list_item${index}`">
                    <div class="list_name">{{ item.name }}</div>
                    <div class="list_num">
                        <div>{{ item.num }}</div>
                        <div>{{ item.unit }}</div>
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
            listdata: [
                {
                    time: '一月',
                    state: '正常',
                    stateCode: '1',
                    cost: '正常',
                    costCode: '1',
                }, {
                    time: '二月',
                    state: '正常',
                    stateCode: '1',
                    cost: '正常',
                    costCode: '1',
                }, {
                    time: '三月',
                    state: '正常',
                    stateCode: '1',
                    cost: '正常',
                    costCode: '1',
                }, {
                    time: '四月',
                    state: '正常',
                    stateCode: '1',
                    cost: '正常',
                    costCode: '1',
                }, {
                    time: '五月',
                    state: '正常',
                    stateCode: '1',
                    cost: '正常',
                    costCode: '1',
                }, {
                    time: '六月',
                    state: '正常',
                    stateCode: '1',
                    cost: '正常',
                    costCode: '1',
                }, {
                    time: '七月',
                    state: '偏差',
                    stateCode: '0',
                    cost: '超支',
                    costCode: '0',
                }, {
                    time: '八月',
                    state: '偏差',
                    stateCode: '0',
                    cost: '超支',
                    costCode: '0',
                }, {
                    time: '九月',
                    state: '偏差',
                    stateCode: '0',
                    cost: '超支',
                    costCode: '0',
                }, {
                    time: '十月',
                    state: '',
                    stateCode: '',
                    cost: '',
                    costCode: '',
                }, {
                    time: '十一月',
                    state: '',
                    stateCode: '',
                    cost: '',
                    costCode: '',
                }, {
                    time: '十二月',
                    state: '',
                    stateCode: '',
                    cost: '',
                    costCode: '',
                },
                {
                    time: '总计',
                    state: '正常',
                    stateCode: '1',
                    cost: '正常',
                    costCode: '1',
                },
            ],
            indicatorlist: [
                {
                    name: '营收金额',
                    num: '5200',
                    unit: '万元',
                },
                {
                    name: '人力成本占营收比',
                    num: '19',
                    unit: '%',
                },
                {
                    name: '元创收入',
                    num: '11.67',
                    unit: '元',
                },
                {
                    name: '管理面积',
                    num: '2000',
                    unit: '㎡',
                },
                {
                    name: '人均管理面积',
                    num: '580',
                    unit: '㎡',
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.content_top {
    width: 559px;
    height: 871px;
    background: #FAFBFE;
    border-radius: 6px 6px 6px 6px;
    padding: 16px;
    box-sizing: border-box;

    .list_head {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 16px;
        color: #969798;
        height: 32px;
        line-height: 32px;
        background: #ECF2FB;
        margin-top: 10px;
    }

    .list_item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 16px;
        height: 44px;
        margin: 12px 0;

        .state1_style {
            background: rgba(62, 177, 79, 0.1);
            border-radius: 2px 2px 2px 2px;
            border: 1px solid #3EB14F;
            color: #3EB14F;
            padding: 4px 10px;
            box-sizing: border-box;
        }

        .state0_style {
            background: rgba(254, 187, 66, 0.1);
            border-radius: 2px 2px 2px 2px;
            border: 1px solid #FEBB42;
            color: #FEBB42;
            padding: 4px 10px;
            box-sizing: border-box;
        }

        .cost1_style {
            background: rgba(62, 177, 79, 0.1);
            border-radius: 2px 2px 2px 2px;
            border: 1px solid #3EB14F;
            color: #3EB14F;
            padding: 4px 10px;
            box-sizing: border-box;
        }

        .cost0_style {
            background: rgba(255, 68, 67, 0.1);
            border-radius: 2px 2px 2px 2px;
            border: 1px solid #FF4443;
            color: #FF4443;
            padding: 4px 10px;
            box-sizing: border-box;
        }

        .none_style {
            padding: 4px 20px;
            box-sizing: border-box;
        }
    }

    .isshowbg {
        background: #ECF2FB;
    }
}

.content_bottom {
    width: 559px;
    height: 342px;
    background: #FAFBFE;
    border-radius: 6px 6px 6px 6px;
    margin-top: 16px;
    padding: 16px;
    box-sizing: border-box;
}

.indicatorlist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 26px;

    .indicatorlist_item {
        width: 32.8%;
        height: 107px;
        border-radius: 3px 3px 3px 3px;
        margin-bottom: 14px;
        padding: 17px 14px;
        box-sizing: border-box;
        border-radius: 4px;

        .list_name {
            font-size: 16px;
            color: #969798;
        }

        .list_num {
            display: flex;
            gap: 10px;
            margin-top: 4px;

            :nth-child(1) {
                font-size: 34px;
                color: #333333;
                font-weight: 600;
            }

            :nth-child(2) {
                font-size: 16px;
                color: #333333;
                display: flex;
                align-items: end;
            }
        }
    }

    .maxwidth {
        width: 49.5%;
    }

    .list_item0 {
        background: linear-gradient(to bottom, #D3E2FE 20%, #F7FAFD 100%);
    }

    .list_item1 {
        background: linear-gradient(to bottom, #FAE5D6 20%, #F7FAFD 100%);
    }

    .list_item2 {
        background: linear-gradient(to bottom, #D6EDDC 20%, #F7FAFD 100%);
    }

    .list_item3 {
        background: linear-gradient(to bottom, #D3E2FE 20%, #F7FAFD 100%);
    }

    .list_item4 {
        background: linear-gradient(to bottom, #D6EDDC 20%, #F7FAFD 100%);
    }
}
</style>