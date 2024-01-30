const { getDefaultConfig } = require("expo/metro-config");

const MetroConfig = require("@ui-kitten/metro-config");

const evaConfig = {
    evaPackage: "@eva-design/eva",
    customMappingPath: "./custom-mapping.json",
};

module.exports = async () => {
    const defaultConfig = await getDefaultConfig(__dirname);
    return MetroConfig.create(evaConfig, defaultConfig);
};
