<template>
  <section class="liffForm">
    <h2>{{ title }}</h2>
    <div class="inline radio">
      <input type="radio" id="get" value="get" v-model="picked">
      <label for="get">Get</label>
      <input type="radio" id="set" value="set" v-model="picked">
      <label for="set">Set</label>
    </div>

    <div class="inline text">
      <input type="text" v-model="key" placeholder="key">
      <input v-if="picked === 'set'" type="text" v-model="value" placeholder="value">
    </div>

    <div class="inline submit">
      <button @click="submit">Submit</button>
    </div>

    <slot></slot>
  </section>
</template>

<script>
  export default {
    name: "liffForm",
    props: ['title'],
    data() {
      return {
        picked: 'get',
        key: '',
        value: '',
      }
    },
    methods: {
      submit () {
        if (this.picked === 'set') {
          (!this.key && !this.value) && alert('insert key and value')
          this.$emit('set', { key: this.key, value: this.value })
        } else {
          (!this.key) && alert('insert key')
          this.$emit('get', { key: this.key })
        }
      }
    }
  }
</script>

<style scoped>
  .liffForm {
    border: solid 2px black;
    width: 100%;
    display: flex;
    flex-flow: column;
    font-size: 3rem;
    padding-bottom: 5rem;
  }

  input, button {
    font-size: 3rem;
    width: 100%;
  }

  .radio input {
    height: 3rem;
    width: 3rem;
    margin: 1rem;
  }

  .text input {
    margin: 1rem;
  }

</style>