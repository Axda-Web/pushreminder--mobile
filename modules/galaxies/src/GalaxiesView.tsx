import { requireNativeView } from 'expo';
import * as React from 'react';

import { GalaxiesViewProps } from './Galaxies.types';

const NativeView: React.ComponentType<GalaxiesViewProps> =
  requireNativeView('Galaxies');

export default function GalaxiesView(props: GalaxiesViewProps) {
  return <NativeView {...props} />;
}
