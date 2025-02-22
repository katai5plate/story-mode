import { ipcMain, app } from 'electron'
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
  ipcMain.handle('template', async () => {
    const templatePath = join(app.getAppPath(), 'resources', 'default-template', 'template.ts')
    return fs.readFileSync(templatePath, { encoding: 'utf-8' })
  })
}
