<template>
  <div class="rightpane">
    <transition name="fade">
      <div class="loading" v-if="isLoading">Loading...</div>
    </transition>

    <transition name="fade">
      <div v-if="output[0]">
        <div class="output">
          <img :src="output[0]" />
          <img :src="output[1]" />
          <img :src="output[2]" />
          <img :src="output[3]" />
        </div>
        <div class="bycolor">
          <img :src="output[0]" />
          <img :src="output[1]" />
          <img :src="output[2]" />
          <img :src="output[3]" />
        </div>
        <download class="bottomcenter" />
      </div>
    </transition>
  </div>
</template>

<script>
import download from '~/components/download'

export default {
  props: { isLoading: {}, output: { default: () => [] } },
  data() {
    return {}
  },
  components: { download },
  watch: {},
  mounted() {},
  computed: {
    file() {
      return this.$store.state.file
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.rightpane {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-bottom: 5vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  color: white;
  padding: 30px 50px;
  z-index: 3;
}

.output {
  position: relative;
  flex: 0;
  // height: 100%;
  width: 100%;
}

.output img {
  position: relative;
  width: 95%;
  max-height: 77vh;
  object-fit: contain;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  mix-blend-mode: multiply;
  transition: opacity 0.2s;
  z-index: 1;
}
.output.fade img {
  opacity: 0.1;
}

.output div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.output img:not(:first-of-type) {
  position: absolute;
}

.bycolor {
  position: relative;
  width: 95%;
  max-height: 13vh;
  display: flex;
  margin: 0 auto;
}
.bycolor img {
  object-fit: contain;
  flex: 1;
  width: 25%;
}

.bottomcenter {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  margin: 0;
}
</style>
