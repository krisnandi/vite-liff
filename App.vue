<template>
  <img alt="Vue logo" src="./logo.png" />
  <section class="liff-container">
    <button @click="attachLiff">Attach Liff SDK</button>
    <div class="lineborder" />

    <input type="text" v-model="liffId" placeholder="liff id">
    <button @click="initializeLiff">Initialize Liff</button>
    <div class="lineborder" />

    <button @click="checkIsLIFFExist">check isLIFFExist</button>
    <div class="lineborder" />

    <button @click="checkIsInClient">check isInClient</button>
    <div class="lineborder" />

    <button @click="checkIsLoggedIn">check isLoggedIn</button>
    <div class="lineborder" />

    <button @click="goToRedirectUrl">go to Redirect URl</button>
    <p>{{ redirectUrl }}</p>
    <div class="lineborder" />

    <button @click="getLiffAccessToken">get liff token</button>
    <p v-if="liffToken">liff token: {{ liffToken }}</p>
    <p v-else>no liff token</p>
  </section>

  <liffForm title="localStorage" @get="localStorageGet" @set="localStorageSet"></liffForm>
  <liffForm title="sessionStorage" @get="sessionStorageGet" @set="sessionStorageSet"></liffForm>
  <liffForm title="cookie" @get="cookieGet" @set="cookieSet" ></liffForm>

  <section class="goToUrl">
    <input type="text" v-model="url" placeholder="url">
    <div class="lineborder" />
    <button @click="goToUrl">Go To</button>
    <div class="lineborder" />
    <button @click="openExternalWindow">Open External Window</button>
    <div class="lineborder" />
    <button @click="openInternalWindow">Open Internal Window</button>
    <div class="lineborder" />
    <button @click="closeWindow">Close Window</button>
    <div class="lineborder" />
  </section>
</template>

<script>
  import liffForm from './components/liffForm.vue'
  import liffUtils from './utils/liffUtils'

  const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(const i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return ""
  }

  const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  export default {
    name: 'App',
    components: {
      liffForm,
    },
    data() {
      return {
        local: '',
        session: '',
        cookie: '',
        url: '',

        liffId: '',
        liffToken: '',
        isLIFFExist: '',
        isInClient: '',
        isLoggedIn: '',
        redirectUrl: ''
      }
    },
    created () {
      this.redirectUrl = getParameterByName('redirectUrl')
    },
    methods: {
      localStorageSet({ key, value }) {
        localStorage.setItem(key, value)
      },
      localStorageGet({ key }) {
        this.local = localStorage.getItem(key) || 'key not found'
        alert(this.local)
      },
      sessionStorageSet({ key, value }) {
        sessionStorage.setItem(key, value)
      },
      sessionStorageGet({ key }) {
        this.session = sessionStorage.getItem(key) || 'key not found'
        alert(this.session)
      },
      cookieSet({ key, value }) {
        document.cookie = `${key}=${value}; expires=Thu, 18 Dec 2020 12:00:00 UTC; path=/`;
      },
      cookieGet({ key }) {
        this.cookie = getCookie(key)
        alert(this.cookie)
      },
      goToUrl () {
        location.href = this.url
      },
      goToRedirectUrl () {
        location.replace(this.redirectUrl)
      },

      attachLiff () {
        liffUtils.attachSDK()
      },
      initializeLiff () {
        liffUtils.initSDK(this.liffId)
      },
      getLiffAccessToken () {
        alert(liffUtils.getAccessToken())
        this.liffToken = liffUtils.getAccessToken()
      },

      openExternalWindow () {
        liffUtils.openWindow( { url: this.url, external: true })
      },
      openInternalWindow () {
        liffUtils.openWindow( { url: this.url, external: false })
      },

      closeWindow () {
        liffUtils.closeWindow()
      },

      checkIsLIFFExist () {
        alert(liffUtils.isLIFFExist())
      },

      checkIsInClient () {
        alert(liffUtils.isInClient())
      },

      checkIsLoggedIn () {
        alert(liffUtils.isLoggedIn())
      },
    }
  }
</script>

<style scoped>
  .lineborder {
    border-bottom: solid 2px black;
    margin: 1rem;
  }
  .liff-container {
    font-size: 4rem;
  }
  .liff-container button {
    font-size: 4rem;
    width: 100%;
  }
  .liff-container input {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .goToUrl {
    margin: 2rem;
  }
  .goToUrl input {
    font-size: 4rem;
  }

  .goToUrl button {
    font-size: 4rem;
  }
</style>