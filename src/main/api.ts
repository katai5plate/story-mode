import { app, ipcMain } from 'electron'
import fs from 'fs'
import { join } from 'path'

export default () => {
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.handle('json', () => {
    const result = JSON.parse(
      fs.readFileSync(join(app.getAppPath(), 'resources', 'default-template', 'template.json'), {
        encoding: 'utf8'
      })
    )
    return result
  })
}
