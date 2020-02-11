import rawConfig from '../story-pal.config'

const parseConfig = (config) => {
  // Todo: just use example-components for now
  const dirs = Object.keys(config)
  return config[dirs[0]]
}

export default () => parseConfig(rawConfig)