// electron 主进程文件
import { app, BrowserWindow } from 'electron';

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,  //可以在渲染进程使用node的api
      contextIsolation: false,
      webSecurity:false //关闭跨域检测
    },
  });
  // 获取vite地址，打开页面
  if (process.argv[2]) {
    win.loadURL(process.argv[2])  //开发环境
  } else {
    win.loadFile('index.html')  //生产环境
  }
});