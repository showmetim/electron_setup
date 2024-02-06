// 开发环境插件electron
import type { Plugin } from "vite";
import type { AddressInfo } from "node:net";
// 子进程传参
import { spawn } from "child_process";
import fs from 'fs'
export const ElectronDevPlugin = (): Plugin => {
  return {
    name: "electron-dev",
    configureServer(server) {
      const initElectron = () => {
        // 使用esbuild编译TypeScript代码为JavaScript
        require('esbuild').buildSync({
          entryPoints: ['src/background.ts'],
          bundle: true,
          outfile: 'dist/background.js',
          platform: 'node',
          target: 'node12',
          external: ['electron']
        })
      }
      // 调用初始化Electron函数
      initElectron()
      server?.httpServer?.on("listening", () => {
        // 读取vite服务信息
        const addressInfo = server.httpServer?.address() as AddressInfo
        // 拼接ip地址
        const IP = `http://localhost:${addressInfo.port}`;
        // 传到electron打开页面
        // require("electron")返回的是路径
        let electronProcess = spawn(require("electron"), ['dist/background.js', IP])
        // 监听主进程代码的更改
        fs.watchFile('src/background.ts', () => {
          // 杀死当前的Electron进程
          electronProcess.kill()
          // 重新编译主进程代码并重新启动Electron进程
          initElectron()
          electronProcess = spawn(require('electron'), ['dist/background.js', IP])
        })

        // 监听Electron进程的stdout输出
        electronProcess.stdout?.on('data', (data) => {
          console.log(`日志: ${data}`);
        });
      })
    }
  }
}