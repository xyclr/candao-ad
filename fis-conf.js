fis.require('jello')(fis);



// 标记 staitc/libs 下面的 js 为模块化代码。
fis.match('/static/libs/**.js', {
  isMod: true
});

fis.match('/static/libs/calendar_diy/**.js', {
  isMod: false
});

// jello 里面默认用的 commonjs 这里改成 amd 方案。
fis.unhook('commonjs');
fis.hook('amd', {
  packages: [

    // 用来存放 libs 库
    {
      name: 'libs',
      location: 'static/libs/',
      main: 'index'
    }
  ],
  shim: {
    'libs/calendar_diy/WdatePicker.js': {
      deps: ['jquery'],
      exports: 'WdatePicker'
    },
    'libs/twbsPagination.js':{
      deps: ['jquery'],
      exports: 'twbsPagination'
    }
  }
});

// 设置 *.scss 配置配置项
fis.match('*.scss', {
  rExt: '.css',
  parser: fis.plugin('node-sass', {
    include_paths: [
      './static/scss',
      './components/compass-mixins'
    ]
  }),
  useHash: true
});

// 不启用 less
fis.match('*.less', {
  parser: null
});

// 解析 markdown，编译成 html
fis.match('*.md', {
  parser: fis.plugin('marked'),
  rExt: '.html'
});

fis.match('*.{js,css,png}', {
  useHash: true
});

fis.media('prod')
  .match('::package', {
    // 关于打包配置，请参考：https://github.com/fex-team/fis3-packager-deps-pack
    packager: fis.plugin('deps-pack', {
      'pkg/base.css': [
        'components/bootstrap/**.css',
        '/static/scss/**.css',
        '/static/scss/**.scss',
        '/widget/**.scss',
      ],
      'pkg/libs.js': [
        'static/js/require.js', 
        'components/jquery/jquery.js',
        'components/bootstrap/bootstrap.js',
        'components/bootstrap/bootstrap.js:deps' // 匹配依赖部分
      ],
      'pkg/app.js': [
        'page/examples/form.js',
        'page/examples/form.js:deps'
      ],
      'pkg/base.js':[
        '/static/libs/alert.js',
        '/static/libs/confirm.js',
        '/static/libs/modal.js',
        '/static/libs/notice.js',
        '/static/libs/twbsPagination.js',
      ],
      'pkg/common.js':[
        '/static/libs/conf.js',
        '/static/libs/utils.js',
        '/widget/*/**.js'
      ]
    })
  })
