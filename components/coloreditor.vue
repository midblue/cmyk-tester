<template>
  <div class="modalcontainer" @click="checkClose">
    <div class="coloreditor">
      <div class="close" @click="$emit('close')">✖</div>
      <div class="twocolumn">
        <h2>
          Add Colors
        </h2>
        <h2>
          Your Colors
        </h2>
      </div>
      <div class="twocolumn">
        <div class="box shadow">
          <div>Manual Entry</div>
          <form class="manual subbox" @submit.prevent>
            <input type="number" v-model="C" /><input
              type="number"
              v-model="M"
            /><input type="number" v-model="Y" /><input
              type="number"
              v-model="K"
            /><button type="submit" @click="addColorManually">Add</button>
          </form>
          <div>Presets</div>
          <div class="subbox">
            <div
              class="color"
              v-for="(color, index) in presets"
              :key="index + color[4]"
              :style="{ background: '#' + convert.cmyk.hex(...color) }"
            >
              <span style="margin-right: 10px;">{{
                color.slice(0, 4).join(', ')
              }}</span>
              <span style="margin-right: 10px;">{{ color[4] }}</span>
              <span class="addcolor" @click="addColor(color)">＋</span>
            </div>
          </div>
        </div>
        <div class="box shadow">
          <div
            class="color"
            v-for="(color, index) in colors"
            :key="index + color[4]"
            :style="{ background: '#' + convert.cmyk.hex(...color) }"
          >
            <span style="margin-right: 10px;">{{
              color.slice(0, 4).join(', ')
            }}</span>
            <span style="margin-right: 10px;">{{ color[4] }}</span>
            <span class="removecolor" @click="removeColor(color)">✖</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const convert = require('color-convert')
const presets = require('~/assets/presetColors')
const { set } = require('~/assets/storage')

export default {
  props: { open: { default: false } },
  data() {
    return { C: 0, M: 0, Y: 0, K: 0, convert, presets }
  },
  components: {},
  watch: {
    colors() {
      set('colors', JSON.stringify(this.colors))
    },
  },
  computed: {
    colors() {
      return this.$store.state.colors
    },
  },
  mounted() {},
  methods: {
    addColor(color) {
      this.$store.commit('set', {
        colors: [...this.colors, color],
      })
    },
    addColorManually() {
      const c = parseInt(this.C),
        m = parseInt(this.M),
        y = parseInt(this.Y),
        k = parseInt(this.K)
      if (
        Number.isNaN(c) ||
        Number.isNaN(m) ||
        Number.isNaN(y) ||
        Number.isNaN(k)
      )
        return alert('Invalid value!')
      if (
        c > 100 ||
        c < 0 ||
        m > 100 ||
        m < 0 ||
        y > 100 ||
        y < 0 ||
        k > 100 ||
        k < 0
      )
        return alert('Color values must be between 0 and 100.')
      this.$store.commit('set', {
        colors: [...this.colors, [c, m, y, k, 'Custom Color']],
      })
    },
    removeColor(c) {
      let tempColors = [...this.colors]
      const index = tempColors.findIndex(color => color === c)
      if (index >= 0) tempColors.splice(index, 1)
      this.$store.commit('set', {
        colors: tempColors,
      })
    },
    checkClose(e) {
      if (e.path[0].classList[0] === 'modalcontainer') this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.modalcontainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  background: rgba(30, 30, 30, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.coloreditor {
  position: relative;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
}

.close {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px 20px;
  transition: all 0.2s;
  font-size: 1.2em;
  color: rgba(0, 0, 0, 0.4);

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 1);
  }
}

h2 {
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 10px;
}

.twocolumn {
  flex: 1;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr;

  & > .box {
    padding: 15px;
    height: 40vh;
    overflow: scroll;
    margin-top: 5px;

    &.shadow {
      box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.1);
      background: #f8f8f8;
    }
  }
}

.subbox {
  margin-top: 5px;
  margin-bottom: 15px;
}

.manual {
  height: 45px;
  display: flex;

  & > * {
    font-size: 1rem;
    text-align: center;
    display: block;
    height: 100%;
    width: 20%;
  }
}

.color {
  padding-left: 20px;
  // margin: 5px 0;
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: grid;
  grid-template-columns: 150px 1fr 35px;
}
.removecolor {
  cursor: pointer;
  padding: 10px;
  transition: background 0.2s;
  text-shadow: none;
  background: rgba(0, 0, 0, 0.1);
  text-align: center;

  &:hover {
    background: red;
  }
}
.addcolor {
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  transition: background 0.2s;
  text-shadow: none;
  background: rgba(0, 0, 0, 0.1);
  text-align: center;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>
