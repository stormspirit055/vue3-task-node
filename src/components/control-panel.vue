<script setup lang='ts'>
function _handleDrag(event: DragEvent) {
  console.log(event)
}
function _handleDragStart(event: DragEvent) {
  console.log(event)
}
</script>
<template>
  <div class="control_panel_wrap">
    <div class="w_btns" >
       <div class="b_item" draggable="true" @dragstart="_handleDragStart" @drag.prevent="_handleDrag">sql</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.control_panel_wrap{
  background: rgb(184, 181, 181);
  width: 200px;
  padding: 10px 20px;
  box-sizing: border-box;
  .w_btns{
    .b_item{
      width: 100px;
      cursor: grab;
      .Tcvh(30px);
      border: 1px solid var(--primary);
      border-radius: 4px;
      color: var(--black);
    }
  }
}
</style>
