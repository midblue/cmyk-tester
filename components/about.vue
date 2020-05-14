<template>
  <div class="modalcontainer" @click="checkClose" v-if="aboutOpen">
    <div class="about">
      <div class="close" @click="$store.commit('set', { aboutOpen: false })">
        ✖
      </div>
      <!-- <h2>CMYK Tester</h2> -->
      <p>
        Made by
        <a href="https://www.jasperstephenson.com/" target="_blank"
          >Jasper Stephenson</a
        >
        in 2020 as freeware for risograph printers. <br />
        No images are stored online in any capacity, nor can I view anything you
        edit here. <br />
        <a href="mailto:jasperstephenson@gmail.com" target="_blank">Email me</a>
        if you have any feedback or feature requests.
      </p>
      <p>
        日本語も喋るので、評価や機能依頼があれば気軽に<a
          href="mailto:jasperstephenson@gmail.com"
          target="_blank"
          >連絡して</a
        >ください！
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  watch: {},
  mounted() {},
  computed: {
    aboutOpen() {
      return this.$store.state.aboutOpen
    },
  },
  methods: {
    checkClose(e) {
      if (e.path[0].classList[0] === 'modalcontainer')
        this.$store.commit('set', { aboutOpen: false })
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
  z-index: 1050;
  background: rgba(30, 30, 30, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.about {
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

p {
  line-height: 1.6;
  font-weight: normal;
  margin: 15px 0;
}
</style>
