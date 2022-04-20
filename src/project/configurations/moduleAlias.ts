import { addAlias } from 'module-alias'
import { resolve } from 'path'

const modulePath = process.env.NODE_ENV === 'production' ? 'dist' : 'src'

addAlias('@', resolve(modulePath))
