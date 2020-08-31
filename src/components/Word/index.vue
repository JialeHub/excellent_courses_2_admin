<script>
  export default {
    name: "Word",
    props: {
      zh: {
        type: String,
        default: ""
      },
      en: {
        type: String,
        default: ""
      }
    },
    computed: {
      language() {
        return this.$storeGet.setting.language
      }
    },
    render(createElement) {
      let en = this.en.replace(/[_]/g, " ");
      return createElement('span', this.language === 'zh' ? this.zh : en)
    }
  }
</script>
