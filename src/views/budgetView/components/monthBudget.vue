<template>
    <div class="content">
        <TitleComponent>月度编制预算详情</TitleComponent>

        <div class="flex_style">

            <div class="flex_left">
                <div class="left_head">
                    <img src="@/assetsbudget/dotimg.png" alt="" class="dotimg">
                    <div class="text">成本变化及偏差分类</div>
                    <img src="@/assetsbudget/arrowtop.png" alt="" class="arrowimg">
                    <img src="@/assetsbudget/arrowbtm.png" alt="" class="arrowimg">
                </div>

                <div class="left_border">
                    <div class="list_style">
                        <div v-for="(item, index) in datalist" :key="index" class="list_item">
                            <div class="num_style">
                                <div>{{ item.num }}</div>
                                <div>万元</div>
                            </div>
                            <div>{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="list_style" style="justify-content: start;">
                        <div class="list_item_text">
                            <div>福利/社保</div>
                            <div>偏差最大成本项</div>
                        </div>
                        <div class="list_item_green">
                            <div class="gerrn_img">
                                <div>10%</div>
                                <img src="@/assetsbudget/arrowtop.png" alt="" class="greenarrowimg">
                            </div>
                            <div>成本增幅（环比上月）</div>
                        </div>
                    </div>
                    <div class="pie_style">
                        <div class="pie_border">
                            <div id="pie"></div>
                            <div class="pietext">
                                <div>偏差</div>
                                <div>明细</div>
                            </div>
                        </div>

                        <div class="pie_legend">
                            <div v-for="(item, index) in piedata" :key="index" class="legend_item">
                                <div :style="{ backgroundColor: piecolor[index] }"></div>
                                <div>{{ item.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex_right">
                <div class="left_head">
                    <img src="@/assetsbudget/dotimg.png" alt="" class="dotimg">
                    <div class="text">分月编制及成本使用情况</div>
                </div>

                <div class="echarts_border">
                    <div id="barone"></div>
                    <div id="bartwo"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import TitleComponent from './titleComponent.vue';
export default {
    components: { TitleComponent },
    data() {
        return {
            datalist: [
                {
                    name: '当期预算成本',
                    num: '5200',
                },
                {
                    name: '实际使用成本',
                    num: '5200',
                },
                {
                    name: '超支总额',
                    num: '5200',
                }
            ],
            piedata: [
                { value: 25, name: '福利' },
                { value: 25, name: '薪酬' },
                { value: 25, name: '社保' },
                { value: 25, name: '其他' },
            ],
            piecolor: ['#3EB14F', '#FEBB42', '#4BB6FF', '#FC9A47'],
            montharr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],

        }
    },
    mounted() {
        this.init()
        this.initbarone()
        this.initbartwo()
    },
    methods: {
        init() {
            let pie_Chart = echarts.init(document.getElementById('pie'));
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            // borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        },
                        data: this.piedata,
                        color: this.piecolor
                    }
                ]
            };

            option && pie_Chart.setOption(option);
        },
        initbarone() {
            let bar_Chart = echarts.init(document.getElementById('barone'));
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                legend: {
                    itemHeight: 10,
                    itemWidth: 10,
                    data: ['编制人数', '在岗人数', '满编率']
                },
                grid: {
                    left: '6%',
                    right: '6%',
                    bottom: '0',
                    top: '18%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.montharr,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisTick: {
                            show: false,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        },
                    }
                ],
                series: [
                    {
                        name: '编制人数',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' 个';
                            }
                        },
                        itemStyle: {
                            color: '#307DF2',
                        },
                        barWidth: 8,
                        data: [
                            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                        ]
                    },
                    {
                        name: '在岗人数',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' 个';
                            }
                        },
                        itemStyle: {
                            color: '#3EB14F',
                        },
                        barWidth: 8,
                        data: [
                            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                        ]
                    },
                    {
                        name: '满编率',
                        type: 'line',
                        yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' %';
                            }
                        },
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            width: 2,
                            color: '#FEBB42',
                        },
                        areaStyle: {
                            color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(254, 187, 66, 0.4)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(254, 187, 66, 0)'
                                }
                            ])
                        },
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            };
            option && bar_Chart.setOption(option);

        },
        initbartwo() {
            let bar_Chart = echarts.init(document.getElementById('bartwo'));
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                legend: {
                    itemHeight: 10,
                    itemWidth: 10,
                    data: ['预算成本', '实际成本', '使用率']
                },
                grid: {
                    left: '6%',
                    right: '6%',
                    bottom: '0',
                    top: '18%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.montharr,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisTick: {
                            show: false,
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        },
                    }
                ],
                series: [
                    {
                        name: '预算成本',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' 万元';
                            }
                        },
                        itemStyle: {
                            color: '#FEBB42',
                        },
                        barWidth: 8,
                        data: [
                            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                        ]
                    },
                    {
                        name: '实际成本',
                        type: 'bar',
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' 万元';
                            }
                        },
                        itemStyle: {
                            color: '#3EB14F',
                        },
                        barWidth: 8,
                        data: [
                            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                        ]
                    },
                    {
                        name: '使用率',
                        type: 'line',
                        yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' %';
                            }
                        },
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            width: 2,
                            color: '#307DF2',
                        },
                        areaStyle: {
                            color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(55, 142, 253, 0.4)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(55, 142, 253, 0)'
                                }
                            ])
                        },
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            };
            option && bar_Chart.setOption(option);

        },
    }
}
</script>

<style lang="scss" scoped>
.content {
    width: 1291px;
    height: 608px;
    background: #FAFBFE;
    border-radius: 6px 6px 6px 6px;
    padding: 16px;
    box-sizing: border-box;

    .flex_style {
        display: flex;
        margin-top: 10px;
    }
}

.left_head {
    display: flex;
    align-items: center;

    .text {
        margin: 0 39px 0 8px;
        font-size: 20px;
        color: #333333;
        font-weight: 600;
    }

    .dotimg {
        width: 18px;
        height: 18px;
    }

    .arrowimg {
        width: 24px;
        height: 24px;
        margin-right: 4px;
    }
}

.flex_left {

    .left_border {
        width: 437px;
        height: 476px;
        background: linear-gradient(180deg, #F5F8FD 0%, #ECF2FB 100%);
        border-radius: 8px 8px 8px 8px;
        margin-top: 10px;
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .list_style {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 8px;

            .list_item {
                font-size: 14px;
                color: #969798;

                .num_style {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 4px;

                    :nth-child(1) {
                        font-weight: 600;
                        font-size: 22px;
                        color: #333333;
                    }
                }
            }

            .list_item_text {
                :nth-child(1) {
                    font-weight: 600;
                    font-size: 22px;
                    color: #333333;
                    margin-bottom: 4px;

                }

                :nth-child(2) {
                    font-size: 14px;
                    color: #969798;
                }
            }

            .list_item_green {
                font-size: 14px;
                color: #969798;
                margin-left: 50px;

                .gerrn_img {
                    display: flex;
                    align-items: center;
                    margin-bottom: 4px;
                    font-size: 26px;
                    color: #00A508;
                    font-weight: 600;

                    .greenarrowimg {
                        width: 24px;
                        height: 24px;
                    }
                }

            }
        }

        .pie_style {
            width: 405px;
            height: 246px;
            background: #FAFBFE;
            border-radius: 6px 6px 6px 6px;
            display: flex;
            align-items: center;

            .pie_border {
                position: relative;

                .pietext {
                    font-weight: 600;
                    font-size: 20px;
                    color: #333333;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 99;
                }
            }

            .pie_legend {
                flex: 1;
                display: flex;
                align-items: center;
                flex-wrap: wrap;

                .legend_item {
                    width: 50%;
                    font-size: 16px;
                    color: #333333;
                    display: flex;
                    align-items: center;
                    letter-spacing: 2px;
                    margin-bottom: 14px;

                    :nth-child(1) {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        margin-right: 8px;

                    }
                }

            }
        }
    }
}

.flex_right {
    flex: 1;
    margin-left: 19px;
    display: flex;
    flex-direction: column;

    .echarts_border {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        gap: 20px;
    }
}

#pie {
    width: 230px;
    height: 230px;
}

#barone {
    width: 100%;
    height: 50%;
}

#bartwo {
    width: 100%;
    height: 50%;
}
</style>