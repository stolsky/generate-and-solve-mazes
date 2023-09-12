import Configuration, { type ConfigurationData } from '../../simulator/classes/Configuration'
import file from './config.json'

const config = new Configuration(file as ConfigurationData[])

export default config