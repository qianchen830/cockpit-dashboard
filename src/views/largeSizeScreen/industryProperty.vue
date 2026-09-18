<template>
  <div style="width: 100%;height: 100%;background-color: #021726;">
    <scale-box :width="1920" :height="1080" bgc="transparent" :delay="100">
      <div class="bg_style">
        <div class="head_style">
          <!--                    产业发展集团资产大数据平台-->
          产业发展集团房屋资产大数据平台
          <div class="datetime_style">
            <div>{{ dates }}</div>
            <div>{{ week }}</div>
            <div>{{ times }}</div>
          </div>

        </div>
        <div class="content">
          <Left></Left>
          <Middle></Middle>
          <Right></Right>
        </div>
      </div>

    </scale-box>
  </div>
</template>

<script>
import ScaleBox from "vue2-scale-box";
import Left from "./components/industryProperty/left.vue";
import Right from "./components/industryProperty/right.vue";
import Middle from "./components/industryProperty/middle.vue";

export default {
  components: {ScaleBox, Left, Right, Middle},
  data() {
    return {
      times: '',
    }
  },
  mounted() {
    this.gettimes()
  },
  computed: {
    dates() {
      let currentDate = new Date();
      let year = currentDate.getFullYear(); // 获取当前年份
      let month = currentDate.getMonth() + 1; // 获取当前月份，注意月份从0开始，所以要加1
      let day = currentDate.getDate(); // 获取当前日期
      return `${year}年${month}月${day}日`;
    },
    week() {
      let now = new Date();
      let weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      let currentWeekDay = weekDays[now.getDay()];
      return currentWeekDay
    }
  },
  methods: {
    gettimes() {
      setInterval(() => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        this.times = hours + ':' + (minutes < 10 ? '0' + minutes : minutes)+ ':' + (seconds < 10 ? '0' + seconds : seconds);
      }, 1000)
    }
  }
};

</script>

<style lang="scss" scoped>
.bg_style {
  width: 100%;
  height: 100%;
  background: url('@/assets/bgimg.png') repeat;
  background-size: 100% 100%;

  .head_style {
    background: url('@/assets/headbg.png') repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 80px;
    font-weight: 600;
    font-size: 38px;
    letter-spacing: 2px;
    text-shadow: 4px 4px 4px #020C16;
    text-align: center;
    color: #FFFFFF;
    padding-top: 10px;
    box-sizing: border-box;
    position: relative;
    // 底部发光边框
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.6), transparent);
      box-shadow: 0 0 10px rgba(0, 245, 255, 0.4);
    }

    .datetime_style {
      position: absolute;
      top: 24px;
      right: 20px;
      font-size: 18px;
      color: #CED7E8;
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 400;
      letter-spacing: 2px;

      :nth-child(3) {
        color: transparent;
        background: linear-gradient(to bottom, #FFFFFF 30%, #33C5FF 100%);
        -webkit-background-clip: text;
        font-weight: 600;
        font-size: 20px;
        text-shadow: none;

      }
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    padding: 24px 32px 0 32px;
    box-sizing: border-box;
  }
}
</style>