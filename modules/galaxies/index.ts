// Reexport the native module. On web, it will be resolved to GalaxiesModule.web.ts
// and on native platforms to GalaxiesModule.ts
export { default } from './src/GalaxiesModule';
export { default as GalaxiesView } from './src/GalaxiesView';
export * from  './src/Galaxies.types';
