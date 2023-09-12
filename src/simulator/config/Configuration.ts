import Configuration, { type ConfigurationData } from '../classes/Configuration'
import file from './config.json'

const config = new Configuration(file as ConfigurationData[])

export default config