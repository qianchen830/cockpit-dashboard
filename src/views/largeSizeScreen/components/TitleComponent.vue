<template>
  <div class="titlebg">
    <div class="title-glow-line"></div>
    <div class="title-decoration left"></div>
    <div class="title-decoration right"></div>
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
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, 
    rgba($primary, 0.08) 0%, 
    rgba(0, 60, 100, 0.25) 50%, 
    rgba($primary, 0.08) 100%);
  border: 1px solid rgba($primary, 0.3);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 
    0 0 15px rgba($primary, 0.1),
    inset 0 0 20px rgba($primary, 0.05);
  
  .title-glow-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      $primary 20%, 
      $primary 80%, 
      transparent 100%);
    animation: glowPulse 3s ease-in-out infinite;
    box-shadow: 0 0 10px $primary;
  }
  
  .title-decoration {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: $primary;
    border-radius: 50%;
    box-shadow: 0 0 8px $primary;
    
    &.left {
      left: 12px;
      animation: pulse 2s ease-in-out infinite;
    }
    
    &.right {
      right: 12px;
      animation: pulse 2s ease-in-out infinite 1s;
    }
  }
  
  @keyframes glowPulse {
    0%, 100% { 
      opacity: 0.7; 
      filter: blur(1px);
    }
    50% { 
      opacity: 1; 
      filter: blur(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% { 
      transform: translateY(-50%) scale(1);
      opacity: 1;
    }
    50% { 
      transform: translateY(-50%) scale(1.3);
      opacity: 0.7;
    }
  }
  
  .text {
    position: relative;
    z-index: 2;
    font-weight: 700;
    font-size: 18px;
    color: $text-primary;
    letter-spacing: 4px;
    text-shadow: 
      0 0 10px rgba($primary, 0.8),
      0 0 20px rgba($primary, 0.4),
      0 0 30px rgba($primary, 0.2);
    text-align: center;
  }
}
</style>
