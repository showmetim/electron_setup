- 创建vue项目 `npm init vue`

- 在项目中结合electron `npm i electron electron-builder -D`

- 在`src`目录下添加`background.ts`作为主进程文件

- 在根目录下添加`plugins`文件夹，里面添加`vite.electron.builds.ts`和`vite.electron.dev.ts`，分别是生成和开发环境的插件

- 注：

  Cache文件不是必须，如果打包时下载的文件不成功，可以将Cache文件夹放在`C:\Users\name\AppData\Local\electron-builder`下

