import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plugins = [];

export const loadPlugins = async () => {
    console.log("memuat plugin...");
    const pluginDir = path.join(__dirname, "../plugins");

    const files = fs.readdirSync(pluginDir);

    for (let file of files) {
        const fullPath = path.join(pluginDir, file);
        const module = await import(fullPath);

        plugins.push(module);
    }
    console.log("plugin berhasil dimuat!");

    console.log("Total Plugin:", plugins.length);
};

export const handleCommand = async datas => {
    for (let plugin of plugins) {
        if (!plugin.cmd) continue;

        if (plugin.cmd.includes(datas.cmd)) {
            try {
                plugin.handler(datas);
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};
