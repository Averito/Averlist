if(!self.define){let e,a={};const i=(i,s)=>(i=new URL(i+".js",s).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let c={};const o=e=>i(e,r),d={module:{uri:r},exports:c,require:o};a[r]=Promise.all(s.map((e=>d[e]||o(e)))).then((e=>(n(...e),c)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/5vHKUUXRB2PEiL3nyVHKV/_buildManifest.js",revision:"d35afa497a797215fb0d0db32f824738"},{url:"/_next/static/5vHKUUXRB2PEiL3nyVHKV/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/5vHKUUXRB2PEiL3nyVHKV/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0.5bc507bba88c418a.js",revision:"5bc507bba88c418a"},{url:"/_next/static/chunks/112-7ba6a75ae516e185.js",revision:"7ba6a75ae516e185"},{url:"/_next/static/chunks/152-3cb3ddbcc7f13774.js",revision:"3cb3ddbcc7f13774"},{url:"/_next/static/chunks/252f366e-1d33602614d5b0b5.js",revision:"1d33602614d5b0b5"},{url:"/_next/static/chunks/299-1aa7751e1974eda4.js",revision:"1aa7751e1974eda4"},{url:"/_next/static/chunks/352-613f562b4f765211.js",revision:"613f562b4f765211"},{url:"/_next/static/chunks/561.50c5fb9dd5258c6c.js",revision:"50c5fb9dd5258c6c"},{url:"/_next/static/chunks/61.26be9d06d467ebe2.js",revision:"26be9d06d467ebe2"},{url:"/_next/static/chunks/768.6b280f5afb58b3e4.js",revision:"6b280f5afb58b3e4"},{url:"/_next/static/chunks/776.5d62b2f0b8b8773d.js",revision:"5d62b2f0b8b8773d"},{url:"/_next/static/chunks/916c7f34.bf643ffd383b4133.js",revision:"bf643ffd383b4133"},{url:"/_next/static/chunks/986.0e76a1ea17cf09e7.js",revision:"0e76a1ea17cf09e7"},{url:"/_next/static/chunks/framework-a72557da0219a550.js",revision:"a72557da0219a550"},{url:"/_next/static/chunks/main-5035a05945ec0e6e.js",revision:"5035a05945ec0e6e"},{url:"/_next/static/chunks/pages/404-e4548481d31d5f6a.js",revision:"e4548481d31d5f6a"},{url:"/_next/static/chunks/pages/_app-829b419812ff8876.js",revision:"829b419812ff8876"},{url:"/_next/static/chunks/pages/_error-0a004b8b8498208d.js",revision:"0a004b8b8498208d"},{url:"/_next/static/chunks/pages/anime-e25dd04947feff98.js",revision:"e25dd04947feff98"},{url:"/_next/static/chunks/pages/anime/%5BanimeCode%5D-97d6a6abeb054555.js",revision:"97d6a6abeb054555"},{url:"/_next/static/chunks/pages/collections-83e62bfcb988d7d6.js",revision:"83e62bfcb988d7d6"},{url:"/_next/static/chunks/pages/collections/%5Bid%5D-2162de9e2563afc9.js",revision:"2162de9e2563afc9"},{url:"/_next/static/chunks/pages/index-5ff1cdf01abc0872.js",revision:"5ff1cdf01abc0872"},{url:"/_next/static/chunks/pages/lk-7ff139fd3ca0555e.js",revision:"7ff139fd3ca0555e"},{url:"/_next/static/chunks/pages/lk/anime-list-d7d316afd538661d.js",revision:"d7d316afd538661d"},{url:"/_next/static/chunks/pages/lk/collections-5d2e487ceb1d9fae.js",revision:"5d2e487ceb1d9fae"},{url:"/_next/static/chunks/pages/lk/collections/create-14734837b584991a.js",revision:"14734837b584991a"},{url:"/_next/static/chunks/pages/lk/collections/favorites-ee25f097b1483882.js",revision:"ee25f097b1483882"},{url:"/_next/static/chunks/pages/login-297bc29756fe56bb.js",revision:"297bc29756fe56bb"},{url:"/_next/static/chunks/pages/registration-8d990625b106534b.js",revision:"8d990625b106534b"},{url:"/_next/static/chunks/pages/reset-password-0d46e7adb6d9427b.js",revision:"0d46e7adb6d9427b"},{url:"/_next/static/chunks/pages/set-password-9ef1eeb0dc0083f2.js",revision:"9ef1eeb0dc0083f2"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-e97b2711a3c6caa5.js",revision:"e97b2711a3c6caa5"},{url:"/_next/static/css/0d50d77ff72ddbd7.css",revision:"0d50d77ff72ddbd7"},{url:"/_next/static/css/1a2c5be17b0286ef.css",revision:"1a2c5be17b0286ef"},{url:"/_next/static/css/1a968dc785daf7fd.css",revision:"1a968dc785daf7fd"},{url:"/_next/static/css/21be60401274db0f.css",revision:"21be60401274db0f"},{url:"/_next/static/css/3fa41a6e85e0dcfc.css",revision:"3fa41a6e85e0dcfc"},{url:"/_next/static/css/4bc7dbbe8f728ad6.css",revision:"4bc7dbbe8f728ad6"},{url:"/_next/static/css/4e4f68fe9c506ea1.css",revision:"4e4f68fe9c506ea1"},{url:"/_next/static/css/555c597729f35089.css",revision:"555c597729f35089"},{url:"/_next/static/css/598d66597bec1d5d.css",revision:"598d66597bec1d5d"},{url:"/_next/static/css/6cec4920ef777301.css",revision:"6cec4920ef777301"},{url:"/_next/static/css/712b86b9dfb83f74.css",revision:"712b86b9dfb83f74"},{url:"/_next/static/css/808d8841b637fa51.css",revision:"808d8841b637fa51"},{url:"/_next/static/css/8310541359006e7c.css",revision:"8310541359006e7c"},{url:"/_next/static/css/94d94604578c1247.css",revision:"94d94604578c1247"},{url:"/_next/static/css/a66725c2cf311b45.css",revision:"a66725c2cf311b45"},{url:"/_next/static/css/d68001d4ce27996f.css",revision:"d68001d4ce27996f"},{url:"/_next/static/css/f83b25ab1da50717.css",revision:"f83b25ab1da50717"},{url:"/_next/static/css/faf14b57a1d08585.css",revision:"faf14b57a1d08585"},{url:"/_next/static/media/Inter-Black.fe65acfa.ttf",revision:"fe65acfa"},{url:"/_next/static/media/Inter-Bold.1e3e4a31.ttf",revision:"1e3e4a31"},{url:"/_next/static/media/Inter-ExtraBold.30e41037.ttf",revision:"30e41037"},{url:"/_next/static/media/Inter-ExtraLight.4a67ef74.ttf",revision:"4a67ef74"},{url:"/_next/static/media/Inter-Light.8be0a11c.ttf",revision:"8be0a11c"},{url:"/_next/static/media/Inter-Medium.04937818.ttf",revision:"04937818"},{url:"/_next/static/media/Inter-Regular.8c0fe73b.ttf",revision:"8c0fe73b"},{url:"/_next/static/media/Inter-SemiBold.48eaf57b.ttf",revision:"48eaf57b"},{url:"/_next/static/media/Inter-Thin.d2f40396.ttf",revision:"d2f40396"},{url:"/_next/static/media/OpenSans-Bold.eb4aee20.ttf",revision:"eb4aee20"},{url:"/_next/static/media/OpenSans-ExtraBold.362af41e.ttf",revision:"362af41e"},{url:"/_next/static/media/OpenSans-Light.3832d4b7.ttf",revision:"3832d4b7"},{url:"/_next/static/media/OpenSans-Medium.585bcdbb.ttf",revision:"585bcdbb"},{url:"/_next/static/media/OpenSans-Regular.4b2dbd13.ttf",revision:"4b2dbd13"},{url:"/_next/static/media/OpenSans-SemiBold.9fc13a39.ttf",revision:"9fc13a39"},{url:"/_next/static/media/defaultAvatar.20579340.png",revision:"4aa4dc7ee7e3f768154414f8e5dd38e7"},{url:"/_next/static/media/discord.d592c7c6.png",revision:"98d702bb5a337f3ffc6d6dfa40625c4a"},{url:"/_next/static/media/saoAuthLayout.7379445a.webp",revision:"0c2ec12a092edc4e4395d6551bea0bd5"},{url:"/_next/static/media/vk.aee8170f.png",revision:"fa874038e2cacdfe5412f64d4b535584"},{url:"/android/android-launchericon-144-144.png",revision:"fd5b794c391c4ec781fa79edd9ec0e64"},{url:"/android/android-launchericon-192-192.png",revision:"e4e5d29f9fb2da1f04b0e956f25a7d10"},{url:"/android/android-launchericon-48-48.png",revision:"8e10b7eb2e6949d9d45dc6f045cc22fd"},{url:"/android/android-launchericon-512-512.png",revision:"a81e18baaef32199f3399a40820a8927"},{url:"/android/android-launchericon-72-72.png",revision:"697c4f41f2067708f5747acb17eddb85"},{url:"/android/android-launchericon-96-96.png",revision:"c4576b9ad3f5ea67c219c1ca51bdb758"},{url:"/favicon.ico",revision:"2c2d8a1aee94c7b4f47d5017d53346fe"},{url:"/ios/100.png",revision:"573f232764fd1b561e89191b8ad5bc7f"},{url:"/ios/1024.png",revision:"28b3211b666aae371319b4a9ca9c9955"},{url:"/ios/114.png",revision:"87e5f0f27f64bd5ff4adb98d8fb0e596"},{url:"/ios/120.png",revision:"f2ee5e0133a004f766e8ee6e062330a6"},{url:"/ios/128.png",revision:"bce4f8b68359441187e51801a3ad112d"},{url:"/ios/144.png",revision:"fd5b794c391c4ec781fa79edd9ec0e64"},{url:"/ios/152.png",revision:"82a8a741db03e6d04ca755a70352c2ce"},{url:"/ios/16.png",revision:"8f4f07b2e1bc29f061b7f8540b362f09"},{url:"/ios/167.png",revision:"62855b38dede4176d7ad99ea6e5eeea1"},{url:"/ios/180.png",revision:"8d9d565285fbc22ab20bb67a6ace3118"},{url:"/ios/192.png",revision:"e4e5d29f9fb2da1f04b0e956f25a7d10"},{url:"/ios/20.png",revision:"36e30e659a7618c240277154eaf68937"},{url:"/ios/256.png",revision:"32e5baaef3c01131cc74c4edab1fb3b7"},{url:"/ios/29.png",revision:"c947d73851fa786b31006c1623641fc9"},{url:"/ios/32.png",revision:"2d44ef1f8689c681642ae4bcdf6303d2"},{url:"/ios/40.png",revision:"7757401a86173d18eb127009bdcfaa41"},{url:"/ios/50.png",revision:"24bd0ae26ceb4d4cdaa85848225462af"},{url:"/ios/512.png",revision:"a81e18baaef32199f3399a40820a8927"},{url:"/ios/57.png",revision:"1e555dbe0596cd729d5e20bcb0ff386b"},{url:"/ios/58.png",revision:"4a3726d1da1378005ce1e26fc27e85e2"},{url:"/ios/60.png",revision:"98a23a4cdad851ddfe28a9c860918205"},{url:"/ios/64.png",revision:"5577a2ddeaa15d3e962b1b3f8acfb04d"},{url:"/ios/72.png",revision:"697c4f41f2067708f5747acb17eddb85"},{url:"/ios/76.png",revision:"d21d30f3a4e09c67815f19524805fe24"},{url:"/ios/80.png",revision:"bda8cf13e734ddcad2720e373e3bad6a"},{url:"/ios/87.png",revision:"e5ad8a8ed1c0e28139823bfdb1801266"},{url:"/manifest.json",revision:"8e29ef2b254ea8695998d3e0caadcbb8"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"},{url:"/windows11/LargeTile.scale-100.png",revision:"ccb324d8b620b6450e5ac6082d75b158"},{url:"/windows11/LargeTile.scale-125.png",revision:"065e8be026a524fe1748f91e3762bddc"},{url:"/windows11/LargeTile.scale-150.png",revision:"f1e7a4141c5da83a6ce1bb2b2b4e9b4c"},{url:"/windows11/LargeTile.scale-200.png",revision:"4bc717b23aa2f7fb989c805be552ee60"},{url:"/windows11/LargeTile.scale-400.png",revision:"6dca4a67537a6cb4eace6daf2b1a62a8"},{url:"/windows11/SmallTile.scale-100.png",revision:"68ff6420c39d9f2c95906fc6a4bc782d"},{url:"/windows11/SmallTile.scale-125.png",revision:"8906e3ac726475237d37d83d61bc5c6d"},{url:"/windows11/SmallTile.scale-150.png",revision:"358b018bb287ed3617c889189fc926af"},{url:"/windows11/SmallTile.scale-200.png",revision:"900ccf1dacdfe5db4bb7069b1d980186"},{url:"/windows11/SmallTile.scale-400.png",revision:"c807ef226681896f35a8c9407e4430e4"},{url:"/windows11/SplashScreen.scale-100.png",revision:"261ac786498f358dc4a95bb64de55713"},{url:"/windows11/SplashScreen.scale-125.png",revision:"9eef6b5d8d7796ad68d83d7928f1072a"},{url:"/windows11/SplashScreen.scale-150.png",revision:"ee83ad2a5ebd74239635a517aefade95"},{url:"/windows11/SplashScreen.scale-200.png",revision:"95238821f98e9b850b40f829c45ea2d1"},{url:"/windows11/SplashScreen.scale-400.png",revision:"692b44de3d55efc80d2b5fc00a4cc3d6"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"c7b60f12384778f6a336a2c6c2d0b90d"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"8021b745bc2f820edb5a146973462b55"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"7a960255efab4c6ae0050c8d31099bcb"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"d6cc52181bac260072bd68ddfb152713"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"b6c39afe99d4f79d1f6d294db7981b9c"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"a27a1611f803824f0933da2000fdab7a"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"631fda630b216afea1144fe69f389f16"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"90aa5a5296345900e131736f726eb5e4"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"d561bb926c7b0b19ec808b63ed97048a"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"eec585171d04c61fbde564e7bf7b15c8"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"5c27266f8c780871945fba0c4339fa4e"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"781286cf8fe1b578497a3713edd0d90d"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"45f4152f735b8a58cbf83e1e8548f23a"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"ef43a281d0a881f134b7b5e11b605e14"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"0fd52d2e9815bd02968d653cf60dd517"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"1268bffbd518ae9d0da3bf236b13709c"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"1a244a9f89ca16df1cc09536006687b2"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"312e8740c8eccb9f357a47712db1a2ce"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"e6fe5053bb2c7062fd72c03b396084b4"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"566c88b1430f5806efc5aaa03a8cfc1a"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"a27a1611f803824f0933da2000fdab7a"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"631fda630b216afea1144fe69f389f16"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"90aa5a5296345900e131736f726eb5e4"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"d561bb926c7b0b19ec808b63ed97048a"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"eec585171d04c61fbde564e7bf7b15c8"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"5c27266f8c780871945fba0c4339fa4e"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"781286cf8fe1b578497a3713edd0d90d"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"45f4152f735b8a58cbf83e1e8548f23a"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"ef43a281d0a881f134b7b5e11b605e14"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"0fd52d2e9815bd02968d653cf60dd517"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"1268bffbd518ae9d0da3bf236b13709c"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"1a244a9f89ca16df1cc09536006687b2"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"312e8740c8eccb9f357a47712db1a2ce"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"e6fe5053bb2c7062fd72c03b396084b4"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"566c88b1430f5806efc5aaa03a8cfc1a"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"ef43a281d0a881f134b7b5e11b605e14"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"952e1b2fbd2b845b45625d762b7cb535"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"3c9c73f5747eb7cb20ce13e4a23374dd"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"24bd7aec9495656446225b798af35087"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"7e714e372d23957fc834ee83f2f28c8b"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"a27a1611f803824f0933da2000fdab7a"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"631fda630b216afea1144fe69f389f16"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"90aa5a5296345900e131736f726eb5e4"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"d561bb926c7b0b19ec808b63ed97048a"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"eec585171d04c61fbde564e7bf7b15c8"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"5c27266f8c780871945fba0c4339fa4e"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"781286cf8fe1b578497a3713edd0d90d"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"45f4152f735b8a58cbf83e1e8548f23a"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"ef43a281d0a881f134b7b5e11b605e14"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"0fd52d2e9815bd02968d653cf60dd517"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"1268bffbd518ae9d0da3bf236b13709c"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"1a244a9f89ca16df1cc09536006687b2"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"312e8740c8eccb9f357a47712db1a2ce"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"e6fe5053bb2c7062fd72c03b396084b4"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"566c88b1430f5806efc5aaa03a8cfc1a"},{url:"/windows11/StoreLogo.scale-100.png",revision:"24bd0ae26ceb4d4cdaa85848225462af"},{url:"/windows11/StoreLogo.scale-125.png",revision:"604386fc9db9edd5aff025ca70585bba"},{url:"/windows11/StoreLogo.scale-150.png",revision:"0cce5a66909577d5741e3ff3baa99b70"},{url:"/windows11/StoreLogo.scale-200.png",revision:"573f232764fd1b561e89191b8ad5bc7f"},{url:"/windows11/StoreLogo.scale-400.png",revision:"fe1e4d504fb150f15c666372971c840e"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"675e3847c0dad5dbb005f421967f55e3"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"94a156da600e6966b7d1b8a282eafe59"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"70d3724028dbe3b3c8f5caf3411b2439"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"261ac786498f358dc4a95bb64de55713"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"95238821f98e9b850b40f829c45ea2d1"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));