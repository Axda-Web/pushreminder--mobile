import { NativeModule, requireNativeModule } from "expo";

import { GalaxiesModuleEvents } from "./Galaxies.types";

declare class GalaxiesModule extends NativeModule<GalaxiesModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
  getDeviceInfo(): {
    deviceModel: string;
    appVersion: string;
  };
}

// This call loads the native module object from the JSI.
export default requireNativeModule<GalaxiesModule>("Galaxies");
