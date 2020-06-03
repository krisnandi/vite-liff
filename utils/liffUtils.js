const LIFF = {
  attachSDK () {
    return new Promise((resolve, reject) => {
      const sdkScriptTag = document.getElementById('line_SDK')
      if (sdkScriptTag) {
        resolve()
      } else {
        const script = document.createElement('script')
        script.id = 'line_SDK'
        script.src = 'https://static.line-scdn.net/liff/edge/2.1/sdk.js'
        document.head.appendChild(script)
        script.onload = () => resolve()
      }
    })
  },

  initSDK (liffId) {
    if (!liffId) {
      alert('no liff Id')
      return
    }
    if (!liff) {
      attachSDK().then(() => {return init(liffId)})
    }

    return new Promise(resolve => {
      if (!this.isInClient()) {
        resolve({ success: false })
      } else {
        liff.init({ liffId }, () => resolve({ success: true }), () => resolve({ success: false }))
      }
    })
  },

  isLIFFExist () {
    return window.liff && liff
  },

  isInClient () {
    return this.isLIFFExist && liff.isInClient()
  },

  openWindow (option) {
    return this.isLIFFExist && liff.openWindow(option)
  },

  closeWindow () {
    return this.isLIFFExist && liff.closeWindow()
  },

  isLoggedIn () {
    return this.isLIFFExist && liff.isLoggedIn()
  },

  getAccessToken () {
    return this.isLIFFExist && this.isLoggedIn() && liff.getAccessToken()
  },
}

export default LIFF