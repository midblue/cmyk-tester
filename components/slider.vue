<template>
  <div class="slider">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-on:mouseup="$emit('input', parseFloat($event.target.value))"
      v-model="value"
      :style="{
        background: `linear-gradient(to right, transparent, ${color})`,
      }"
    />
    <div>{{ value * 100 }}%</div>
  </div>
</template>

<script>
export default {
  props: {
    min: { default: 0 },
    max: { default: 1 },
    step: { default: 0.1 },
    color: { default: '#222' },
  },
  data() {
    return { value: 1 }
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>

<style>
.slider {
  display: flex;
  align-items: center;
}

.slider div {
  margin-left: 10px;
  font-size: 1em;
  font-weight: bold;
  position: relative;
  top: -1px;
}

input[type='range'] {
  flex: 1;
  -webkit-appearance: none;
  margin: 15px 0;
  width: 100%;
}
input[type='range']:focus {
  outline: none;
}
input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: inherit !important;
}
input[type='range']::-webkit-slider-thumb {
  border: 2px solid rgba(0, 0, 0, 0.7);
  height: 20px;
  width: 20px;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}
input[type='range']::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: inherit !important;
}
input[type='range']::-moz-range-thumb {
  border: 2px solid rgba(0, 0, 0, 0.7);
  height: 20px;
  width: 20px;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
}
</style>
