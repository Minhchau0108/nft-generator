import path from 'path'
import getConfig from 'next/config'

const serverPath = (staticFilePath) => {
  return path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, staticFilePath)
}

module.exports = serverPath