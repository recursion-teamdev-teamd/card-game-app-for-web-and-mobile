import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cardgame.app',
  appName: 'card-game-app',
  webDir: 'out',
  bundledWebRuntime: false,
  "server" : {
    "url" : "http://192.168.11.9:3000",
    "cleartext" : true
  }
};


export default config;
