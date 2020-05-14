<template>
  <div class="controlpanel">
    <coloreditor v-if="colorEditorOpen" @close="colorEditorOpen = false" />
    <div class="top">
      <uploadbutton buttonType="secondary"></uploadbutton>
      <button class="tertiary" @click="colorEditorOpen = true">
        Edit Palette
      </button>
    </div>
    <transition name="fade">
      <div v-if="file" class="center">
        <div class="previewpane">
          <img ref="preview" class="preview" :src="file" />
          <div>
            Source Image<span class="removeimage" @click="removeImage">✖</span>
          </div>
        </div>
        <client-only>
          <div class="pickers">
            <div class="picker">
              <span>C Channel</span>
              <picker v-model="changeCTo" :palette="colors"></picker>
              <slider v-model="alphaC" :color="changeCTo.hex" />
            </div>
            <div class="picker">
              <span>M Channel</span>
              <picker v-model="changeMTo" :palette="colors"></picker>
              <slider v-model="alphaM" :color="changeMTo.hex" />
            </div>
            <div class="picker">
              <span>Y Channel</span>
              <picker v-model="changeYTo" :palette="colors"></picker>
              <slider v-model="alphaY" :color="changeYTo.hex" />
            </div>
            <div class="picker">
              <span>K Channel</span>
              <picker v-model="changeKTo" :palette="colors"></picker>
              <slider v-model="alphaK" :color="changeKTo.hex" />
            </div>
          </div>
        </client-only>
      </div>
    </transition>
  </div>
</template>

<script>
const convert = require('color-convert')
const { get } = require('~/assets/storage')

import picker from 'vue-color/src/components/Compact.vue'
import slider from '~/components/slider'
import download from '~/components/download'
import uploadbutton from '~/components/uploadbutton'
import coloreditor from '~/components/coloreditor'

export default {
  data() {
    return {
      isLoading: false,
      colorEditorOpen: false,
      changeCTo: { hex: '#' + convert.cmyk.hex(100, 0, 0, 0) },
      changeMTo: { hex: '#' + convert.cmyk.hex(0, 100, 0, 0) },
      changeYTo: { hex: '#' + convert.cmyk.hex(0, 0, 100, 0) },
      changeKTo: { hex: '#' + convert.cmyk.hex(0, 0, 0, 100) },
      alphaC: 1,
      alphaM: 1,
      alphaY: 1,
      alphaK: 1,
    }
  },
  components: { picker, slider, download, uploadbutton, coloreditor },
  watch: {
    file() {
      this.go()
    },
    changeCTo() {
      this.go()
    },
    changeMTo() {
      this.go()
    },
    changeYTo() {
      this.go()
    },
    changeKTo() {
      this.go()
    },
    alphaC() {
      this.$store.commit('set', {
        alphas: [this.alphaC, this.alphas[1], this.alphas[2], this.alphas[3]],
      })
    },
    alphaM() {
      this.$store.commit('set', {
        alphas: [this.alphas[0], this.alphaM, this.alphas[2], this.alphas[3]],
      })
    },
    alphaY() {
      this.$store.commit('set', {
        alphas: [this.alphas[0], this.alphas[1], this.alphaY, this.alphas[3]],
      })
    },
    alphaK() {
      this.$store.commit('set', {
        alphas: [this.alphas[0], this.alphas[1], this.alphas[2], this.alphaK],
      })
    },
    alphas() {
      this.go()
    },
  },
  computed: {
    file() {
      return this.$store.state.file
    },
    filename() {
      return this.$store.state.filename
    },
    colors() {
      return this.$store.state.colors.map(c => '#' + convert.cmyk.hex(...c))
    },
    alphas() {
      return this.$store.state.alphas
    },
  },
  mounted() {
    const savedColors = JSON.parse(get('colors'))
    if (savedColors && Array.isArray(savedColors)) {
      console.log('Loaded saved palette.', savedColors)
      this.$store.commit('set', {
        colors: savedColors,
      })
    }
  },
  methods: {
    async go() {
      this.$emit('go', { ...this })
    },
    fileChange(e) {
      const fileList = this.$refs.fileinput.files
      if (fileList && fileList[0]) {
        if (!isImage(fileList[0].name))
          return alert('Please pick a valid image file.')
        this.$store.commit('set', { filename: fileList[0].name })
        const reader = new FileReader()
        reader.onload = async e =>
          this.$store.commit('set', { file: e.target.result })
        reader.readAsDataURL(fileList[0])
      }
    },
    removeImage() {
      this.$store.commit('set', {
        file: null,
        filename: 'file',
        alphas: [1, 1, 1, 1],
      })
      if (this.$refs.preview) this.$refs.preview.src = ''
    },
    editColors() {},
  },
}
function isImage(filename) {
  return !!/.*\.(jpe?g|png|gif)$/gi.exec(filename)
}
</script>

<style lang="scss" scoped>
.controlpanel {
  background: #f9f9f9;
  height: 100%;
  overflow: scroll;
  // box-shadow: 25px 0 25px rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  user-select: none;
}

.top {
  position: relative;
  display: flex;
  align-items: stretch;
  margin-bottom: 30px;

  & > * {
    width: 50%;
    margin: 0;
  }
}

.previewpane {
  position: relative;
  width: 100%;
  padding: 0 15px;

  div {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 15px;
    color: white;
    background: rgba(0, 0, 0, 0.3);
    padding: 3px;
    font-size: 0.9em;

    span {
      margin: -3px -3px -3px 5px;
      padding: 3px 6px;
      background: red;
      cursor: pointer;
    }
  }
}
.preview {
  display: block;
  max-width: 100%;
  max-height: 30vh;
  margin: 0 auto;
}

.pickers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 100px;
}
.picker {
  padding: 30px 0 0 0;
}
</style>
