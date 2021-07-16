<template>
  <div
    class="master"
    :class="{ dragging: isDragging }"
    @drop.prevent="fileDrop"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @dragend.prevent="isDragging = false"
  >
    <about />
    <transition name="fade">
      <intro v-if="!file" />
    </transition>
    <controlpanel @go="go" />
    <result
      :isLoading="isLoading"
      :output="outputChannels"
    />
  </div>
</template>

<script>
const { split } = require('~/assets/splitIntoCMYK')
import intro from '~/components/intro'
import controlpanel from '~/components/controlpanel'
import result from '~/components/result'
import about from '~/components/about'

export default {
  head() {
    return {
      title: `CMYK Tester`,
    }
  },
  data() {
    return {
      isLoading: false,
      isDragging: false,
      outputChannels: [],
    }
  },
  components: { intro, controlpanel, result, about },
  watch: {},
  mounted() {},
  computed: {
    file() {
      return this.$store.state.file
    },
    alphas() {
      return this.$store.state.alphas
    },
  },
  methods: {
    async go(params) {
      if (this.isLoading)
        return console.log('skipping double')

      if (!this.file) {
        console.log('clearing')
        this.outputChannels = []
        return
      }

      this.isLoading = true
      const newFiles = await split(
        this.file,
        [
          params.changeCTo.hex,
          params.changeMTo.hex,
          params.changeYTo.hex,
          params.changeKTo.hex,
        ],
        this.alphas,
        [
          params.subtractKC,
          params.subtractKM,
          params.subtractKY,
        ],
        500,
      )
      this.outputChannels = newFiles.map(
        (n, i) => n || this.outputChannels[i],
      )
      setTimeout(() => (this.isLoading = false), 100)
    },
    fileDrop(e) {
      this.isDragging = false
      const fileList = e.dataTransfer.files
      if (fileList && fileList[0]) {
        if (!isImage(fileList[0].name))
          return alert('Please pick a valid image file.')
        this.$store.commit('set', {
          filename: fileList[0].name,
        })
        const reader = new FileReader()
        reader.onload = async (e) =>
          this.$store.commit('set', {
            file: e.target.result,
          })
        reader.readAsDataURL(fileList[0])
      }
    },
  },
}

function isImage(filename) {
  return !!/.*\.(jpe?g|png|gif)$/gi.exec(filename)
}
</script>

<style lang="scss">
.master {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  display: grid;
  grid-template-columns: 300px 1fr;

  &:after {
    content: 'Drop an image to upload';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1000;
    background: rgba(50, 50, 50, 0.9);
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 30px solid rgba(50, 50, 50, 0.9) 3px solid white;
    opacity: 0;
    transition: opacity 0.2s;
  }
  &:before {
    content: '';
    position: absolute;
    pointer-events: none;
    z-index: 1001;
    top: 50px;
    left: 50px;
    right: 50px;
    bottom: 50px;
    border: 3px dashed white;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &.dragging {
    &:after,
    &:before {
      opacity: 1;
    }
  }
}
</style>
