import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './Galaxies.types';

type GalaxiesModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class GalaxiesModule extends NativeModule<GalaxiesModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(GalaxiesModule);
