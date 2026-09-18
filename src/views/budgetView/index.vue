<template>
    <div style="width: 100%;height: 100%;background-color: #ECF2FB;">
        <scale-box :width="1920" :height="1080" bgc="transparent" :delay="100"
            style="overflow-y: scroll;background-color: #ECF2FB;">
            <div class="headbg">

                <div class="headleft">
                    <SelectComponent :option="yearlist" v-model='yearValue' @changeselect="changeselectyear">
                    </SelectComponent>

                    <div style="display: flex;align-items: center;gap: 6px;">
                        <SelectComponent :option="monthlist" v-model='startmonth' @changeselect="changeselectstartmonth"
                            width="52px">
                        </SelectComponent>
                        <div style="font-weight: 600;font-size: 16px;color: #303133;">至</div>
                        <SelectComponent :option="monthlist" v-model='endmonth' @changeselect="changeselectendmonth"
                            width="52px">
                        </SelectComponent>
                    </div>

                    <SelectComponent :option="typelist" v-model='typeValue' @changeselect="changeselecttype">
                    </SelectComponent>
                </div>

                <div class="headright">
                    <div>{{ dates }}</div>
                    <div>{{ times }}</div>
                    <div>{{ temperature }}</div>
                </div>

            </div>

            <div class="tab_flex">
                <div v-for="(item, index) in tablist" :key="index" class="tab_item">
                    <img v-if="item.iconurl" :src="item.iconurl" alt="" class="tabimg">
                    <div v-else :id="'pie' + index">

                    </div>
                    <div class="tabtext">
                        <div class="tabtextnum">
                            <div>{{ item.num }}</div>
                            <div>{{ item.unit }}</div>
                        </div>
                        <div class="tabname">{{ item.name }}</div>
                    </div>
                </div>
            </div>

            <div class="flex_style">
                <div>
                    <MonthBudget></MonthBudget>
                    <DataDetail></DataDetail>
                </div>
                <div>
                    <CostWarning></CostWarning>
                </div>
            </div>
        </scale-box>
    </div>
</template>

<script>
import ScaleBox from "vue2-scale-box";
import MonthBudget from "./components/monthBudget.vue"
import DataDetail from "./components/dataDetail.vue"
import CostWarning from "./components/costWarning.vue"
import SelectComponent from "./components/selectComponent.vue"
import * as echarts from 'echarts';

export default {
    components: { ScaleBox, MonthBudget, DataDetail, CostWarning, SelectComponent },
    data() {
        return {
            times: '',
            temperature: '室外温度 35℃',
            tablist: [
                {
                    name: '年度人力预算总额',
                    num: '7150',
                    unit: '万元',
                    iconurl: require('@/assetsbudget/icon.png')
                },
                {
                    name: '已使用成本总额',
                    num: '5088',
                    unit: '万元',
                    iconurl: require('@/assetsbudget/icon1.png')

                },
                {
                    name: '年度剩余人力成本',
                    num: '2062',
                    unit: '万元',
                    iconurl: require('@/assetsbudget/icon2.png')

                },
                {
                    name: '年度人力预算使用率',
                    num: '71',
                    unit: '%',
                }, {
                    name: '当期编制人数',
                    num: '568',
                    unit: '人',
                    iconurl: require('@/assetsbudget/icon3.png')

                }, {
                    name: '当期在岗人数',
                    num: '568',
                    unit: '人',
                    iconurl: require('@/assetsbudget/icon4.png')

                }, {
                    name: '当期满编率',
                    num: '93',
                    unit: '%',
                }
            ],
            piedataone: [
                { value: 71, name: '使用率' },
                { value: 29, name: '' },
                // value是百分比 注意!!!!
            ],
            piecolorone: ['#3EB14F', '#DFFFE4'],
            piedatatwo: [
                { value: 93, name: '满编率' },
                { value: 7, name: '' },
                // value是百分比 注意!!!!
            ],
            piecolortwo: ['#3C70FA', '#E3EAFF'],
            yearValue: '2025', //默认年份值
            yearlist: [
                {
                    label: '2025年',
                    value: '2025'
                },
                {
                    label: '2026年',
                    value: '2026'
                }, {
                    label: '2027年',
                    value: '2027'
                },
            ],
            startmonth: '1', //开始月份值
            endmonth: '12', //结束月份值
            monthlist: [
                {
                    label: '01月',
                    value: '1'
                },
                {
                    label: '02月',
                    value: '2'
                }, {
                    label: '03月',
                    value: '3'
                },
                {
                    label: '04月',
                    value: '4'
                },
                {
                    label: '05月',
                    value: '5'
                }, {
                    label: '06月',
                    value: '6'
                },
                {
                    label: '07月',
                    value: '7'
                },
                {
                    label: '08月',
                    value: '8'
                }, {
                    label: '09月',
                    value: '9'
                },
                {
                    label: '10月',
                    value: '10'
                },
                {
                    label: '11月',
                    value: '11'
                }, {
                    label: '12月',
                    value: '12'
                },
            ],
            typeValue: '1',
            typelist: [
                {
                    label: '组织归属',
                    value: '1'
                },
                {
                    label: '部门归属',
                    value: '2'
                },
            ]
        }
    },
    mounted() {
        this.gettimes()
        this.init_pie_one()
        this.init_pie_two()
    },
    computed: {
        dates() {
            let currentDate = new Date();
            let year = currentDate.getFullYear(); // 获取当前年份
            let month = currentDate.getMonth() + 1; // 获取当前月份，注意月份从0开始，所以要加1
            let day = currentDate.getDate(); // 获取当前日期
            return `${year}年${month}月${day}日`;
        },
    },
    methods: {
        gettimes() {
            setInterval(() => {
                const currentTime = new Date();
                const hours = currentTime.getHours();
                const minutes = currentTime.getMinutes();
                const seconds = currentTime.getSeconds();
                this.times = hours + ':' + minutes + ':' + seconds
            }, 1000)
        },

        init_pie_one() {
            let pie_Chart = echarts.init(document.getElementById('pie3'));
            let option = {
                series: [
                    {
                        type: 'pie',
                        radius: ['60%', '90%'],
                        labelLine: {
                            show: false
                        },
                        data: this.piedataone,
                        color: this.piecolorone
                    }
                ]
            };

            option && pie_Chart.setOption(option);
        },
        init_pie_two() {
            let pie_Chart = echarts.init(document.getElementById('pie6'));
            let option = {
                series: [
                    {
                        type: 'pie',
                        radius: ['60%', '90%'],
                        labelLine: {
                            show: false
                        },
                        data: this.piedatatwo,
                        color: this.piecolortwo
                    }
                ]
            };

            option && pie_Chart.setOption(option);
        },
        changeselectyear(val) {
            this.yearValue = val
        },
        changeselectstartmonth(val) {
            this.startmonth = val
        },
        changeselectendmonth(val) {
            this.endmonth = val
        },
        changeselecttype(val) {
            this.typeValue = val
        }
    }
}
</script>


<style lang="scss" scoped>
/* 隐藏整体滚动条 */
::-webkit-scrollbar {
    display: none;
}

.headbg {
    width: 100%;
    height: 78px;
    background: url('@/assetsbudget/titlebg.png') repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 28px;
    box-sizing: border-box;

    .headright {
        display: flex;
        align-items: end;
        gap: 10px;
        font-weight: 400;
        font-size: 18px;
        color: #969798;
    }

    :nth-child(3) {
        color: #333333;
    }

    .headleft {
        display: flex;
        align-items: end;
        gap: 40px;
    }
}

.tab_flex {
    margin: 19px 28px 16px;
    background: #FAFBFE;
    border-radius: 6px 6px 6px 6px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 19px;
    box-sizing: border-box;

    .tab_item {
        display: flex;
        gap: 8px;

        .tabimg {
            width: 60px;
            height: 60px;
        }

        .tabtext {

            .tabtextnum {
                color: #333333;
                display: flex;
                gap: 8px;

                :nth-child(1) {
                    font-size: 28px;
                    font-weight: 600;
                }

                :nth-child(2) {
                    font-size: 18px;
                    align-items: end;
                    display: flex;

                }
            }

            .tabname {
                font-size: 16px;
                color: #969798;
            }
        }
    }
}

.flex_style {
    display: flex;
    margin: 0 28px;
    gap: 16px;
    margin-bottom: 40px;
}

#pie3 {
    width: 60px;
    height: 60px;
}

#pie6 {
    width: 60px;
    height: 60px;
}
</style>