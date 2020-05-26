export function init () {
  return new Promise(resolve => {
    const sdkScriptTag = document.getElementById('line_SDK')
    if (sdkScriptTag) {
      resolve()
    } else {
      const script = document.createElement('script')
      script.id = 'line_SDK'
      script.src = 'https://static.line-scdn.net/liff/edge/2.1/sdk.js'
      document.head.appendChild(script)
      script.onload = async () => {
        let liffId = '1654247933-dK2YBpAb'
        await liff.init({ liffId })
        resolve()
      }
    }
  })
}

export async function login () {
  if (!liff.isLoggedIn()) {
    const redirectUri = location.href
    await liff.login({ redirectUri })
  }
}

export function isInLine () {
  return window.liff && window.liff.isInClient()
}

export function getAccessToken () {
  return window.liff && window.liff.getAccessToken()
}

export function getIDToken () {
  return window.liff && window.liff.getIDToken()
}

export function openWindow (url) {
  return window.liff && window.liff.openWindow(url)
}

export function closeWindow () {
  return window.liff && window.liff.closeWindow()
}
