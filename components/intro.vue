<template>
  <div class="intro">
    <h1>CMYK Tester</h1>
    <div class="dropzone">
      <div><uploadbutton /></div>
      <div>Or, drag an image in to start.</div>
    </div>
    <button
      class="secondary"
      @click="$store.commit('set', { aboutOpen: true })"
    >
      About
    </button>
  </div>
</template>

<script>
import uploadbutton from '~/components/uploadbutton'
export default {
  props: {},
  data() {
    return {}
  },
  components: { uploadbutton },
  watch: {},
  mounted() {},
  computed: {},
  methods: {},
}
</script>

<style scoped>
.intro {
  position: fixed;
  z-index: 950;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0;
  background: #222;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dropzone {
  width: 60vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.2);
  margin-bottom: 60px;
}

h1 {
  font-size: 3em;
  font-weight: 800;
  margin-bottom: 30px;
}

div {
  margin: 15px 0;
}

button {
  max-width: 200px;
}
</style>
