import AppModule from '../AppModule';

function createAppModuleBody() {
  return {
    component: () => null,
    reducer: {
      initialState: {
        counter: 0,
      },
      workers: [
        ['SOMEONE_ACTION', () => null],
      ],
    },
    saga: [],
  };
}

describe('AppModule', () => {
  const body = createAppModuleBody();

  describe('static create(body)', () => {
    it('should create instance of AppModule', () => {
      const appModule = AppModule.create(body);

      expect(appModule).toBeInstanceOf(AppModule);
    });
  });

  describe('configurate()', () => {
    it('should return object with configurated module fragments', () => {
      const appModule = AppModule.create(body);

      const plainModule = appModule.configurate();
      const plainModulePropertiesName = Object.keys(plainModule);
      const configFragmentsName = Object.keys(body);

      expect(plainModulePropertiesName).toEqual(configFragmentsName);
    });
  });
});
