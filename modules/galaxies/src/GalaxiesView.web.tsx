import * as React from 'react';

import { GalaxiesViewProps } from './Galaxies.types';

export default function GalaxiesView(props: GalaxiesViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
