<template>
  <div class="titlebg">
    <div class="title-glow-line"></div>
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleComponent'
};
</script>

<style lang="scss" scoped>
$primary: #00F5FF;
$text-primary: #FFFFFF;

.titlebg {
  width: 405px;
  height: 36px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, rgba($primary, 0.1) 0%, rgba(0, 60, 100, 0.2) 50%, rgba($primary, 0.1) 100%);
  border: 1px solid rgba($primary, 0.25);
  border-radius: 6px;
  overflow: hidden;
  
  .title-glow-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, $primary, transparent);
    animation: glowPulse 3s ease-in-out infinite;
  }
  
  @keyframes glowPulse {
    0%, 100% { opacity: 0.5; filter: blur(1px); }
    50% { opacity: 1; filter: blur(0); }
  }
  
  .text {
    position: relative;
    z-index: 2;
    font-weight: 700;
    font-size: 18px;
    color: $text-primary;
    letter-spacing: 3px;
    text-shadow: 
      0 0 10px rgba($primary, 0.6),
      0 0 20px rgba($primary, 0.3);
    text-align: center;
  }
}
</style>
