
export default {
  mode: 'universal',
  srcDir:'src/',
  target: 'server',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'iview/dist/styles/iview.css',
  ],
  plugins: [
    '@/plugins/iview',
    '@/plugins/mavonEditor.js',
    { src: '~plugins/debounce.js', ssr: false }  // 表示只在客户端引入
  ],
  components: true,
  buildModules: [
  ],
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true,
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:5000', //线上地址
      // target: process.env.BASE_URL || 'http://120.53.220.238:5000', //本地测试
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      },
    },
    '/uploads': {
      target: 'http://127.0.0.1:5000/',
      changeOrigin: true,
    },
  }, 
  build: {
  },
  
}
