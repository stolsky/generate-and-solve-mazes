import file from './config.json'
import Configuration, { ConfigurationData } from '../../classes/Configuration'

const config = new Configuration(file as ConfigurationData[])

export default config