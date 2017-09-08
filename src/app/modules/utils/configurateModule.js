import AppModule from './AppModule';

function configurateModule(configs) {
  const appModule = AppModule.create(configs);
  return appModule.configurate();
}

export default configurateModule;
