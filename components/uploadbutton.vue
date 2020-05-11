<template>
  <div class="passthrough">
    <label for="file-upload" class="button"><slot>Pick Image</slot></label>
    <input
      id="file-upload"
      type="file"
      ref="fileinput"
      @change="fileChange"
      :file="file"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  watch: {
    file() {
      if (!this.file) this.$refs.fileinput.files = undefined
    },
  },
  computed: {
    file() {
      return this.$store.state.file
    },
  },
  mounted() {},
  methods: {
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
  },
}
function isImage(filename) {
  return !!/.*\.(jpe?g|png|gif)$/gi.exec(filename)
}
</script>

<style lang="scss" scoped>
input[type='file'] {
  display: none;
}

label {
  margin: 0;
}

.passthrough {
  position: relative;
}
</style>
