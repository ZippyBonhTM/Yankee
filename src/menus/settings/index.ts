import { settingsChannelMenu, settingsChannelsMenu, settingsChannelsOptions } from "./channels.js";
import { settingsMainMenu } from "./main.js";
import { navMenu } from "./nav.js";

export const settingsMenu = {
    nav: navMenu,
    main: settingsMainMenu,
    channels: {
        options: settingsChannelsOptions,
        main: settingsChannelsMenu,
        submenu: settingsChannelMenu
    }
}