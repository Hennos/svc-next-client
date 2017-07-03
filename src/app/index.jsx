import React from 'react';
import createAppStore from './createAppStore';
import wrapWithRouter from './utils/wrapWithRouter';
import wrapWithStoreProvider from './utils/wrapWithStoreProvider';
import Routes from './routes';

function App() {
  const store = createAppStore();
  const RouterBind = wrapWithRouter(Routes);
  const StoreBind = wrapWithStoreProvider(RouterBind);
  return (
    <div className="App">
      <StoreBind store={store} />
    </div>
  );
}

export default App;
