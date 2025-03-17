const App: { appUrl: string; version: string; urlExternal: string  } = {
    appUrl: `${import.meta.env.VITE_DEV_SERVER_URL || ''}/api/`,
    urlExternal:`${import.meta.env.VITE_EXTERNAL_SERVER_URL || ''}/api/`,
    version: 'v1',
  };
  
  export { App };
  