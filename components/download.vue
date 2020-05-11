<template>
  <div class="download">
    <button @click="download" :disabled="isLoading" class="tertiary">
      <!-- <div v-if="isLoading" class="loader"></div> -->
      {{
        isLoading
          ? 'Loading, Please Wait... (May take some time)'
          : 'Download High-Res Channels'
      }}
    </button>
  </div>
</template>

<script>
const { split, preload } = require('~/assets/splitIntoCMYK')

export default {
  props: {},
  data() {
    return {
      isLoading: false,
      targetColor: '#000000',
      maxWH: 3000,
    }
  },
  components: {},
  watch: {},
  mounted() {},
  computed: {
    file() {
      return this.$store.state.file
    },
    filename() {
      return this.$store.state.filename
    },
    alphas() {
      return this.$store.state.alphas
    },
  },
  methods: {
    async download() {
      this.isLoading = true
      const newFiles = await split(
        this.file,
        [
          this.targetColor,
          this.targetColor,
          this.targetColor,
          this.targetColor,
        ],
        this.alphas,
        this.maxWH,
      )
      for (let i in newFiles) {
        let a = document.createElement('a')
        a.href = newFiles[i]
        a.download = `${this.filename} ${['C', 'M', 'Y', 'K'][i]}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
      setTimeout(() => (this.isLoading = false), 100)
    },
  },
}
</script>

<style>
.download {
  margin: 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
button {
  margin: 0;
  width: 100%;
}

.loader {
  display: inline-block;
}
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 1em;
  height: 1em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #ffffff;
  font-size: 10px;
  margin: 0px 25px 0 0;
  position: relative;
  top: -2.5em;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
