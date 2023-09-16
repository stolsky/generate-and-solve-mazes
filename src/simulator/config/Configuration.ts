import Configuration, { type ConfigurationData } from '../../global/Configuration'
import file from './config.json'

const config = new Configuration(file as ConfigurationData[])

export default config