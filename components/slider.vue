<template>
  <div class="slider">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-on:mouseup="
        $emit('input', parseFloat($event.target.value))
      "
      v-model="value"
      :style="{
        background: `linear-gradient(to right, transparent, ${Array.from(
          { length: max },
        )
          .map((el) => color)
          .join(', ')})`,
      }"
    />
    <div class="label" @click="manualEntry">
      {{ label ? label + ': ' : ''
      }}{{ Math.round(value * 100) }}%
    </div>
  </div>
</template>

<script>
export default {
  props: {
    min: { default: 0 },
    max: { default: 2.5 },
    initial: {},
    step: { default: 0.05 },
    color: { default: '#222' },
    label: {},
  },
  data() {
    return { value: 1 }
  },
  components: {},
  watch: {},
  mounted() {
    if (this.initial !== undefined)
      this.value = this.initial
  },
  methods: {
    manualEntry() {
      try {
        let res = (
          prompt('Enter an exact value.') || ''
        ).replace(/[^\d.]/g, '')
        res = parseFloat(res)
        if (isNaN(res)) return
        res /= 100
        this.value = res
        this.$emit('input', res)
      } catch (e) {}
    },
  },
}
</script>

<style>
.slider {
  display: flex;
  align-items: flex-end;
}

.slider div {
  margin-left: 7px;
  position: relative;
  top: 4px;
}

input[type='range'] {
  flex-grow: 1;
  flex-shrink: 1;
  -webkit-appearance: none;
  margin: 15px 0 0px 0;
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

.label {
  font-weight: bold;
  font-size: 0.9em;
  width: 8.8em;
  flex-shrink: 0;
  cursor: pointer;
}
</style>
