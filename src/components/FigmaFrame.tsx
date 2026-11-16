import type { ReactNode } from 'react';

type FigmaFrameProps = {
  children: ReactNode;
};

/** Base estrutural preservada do frame 1-2 recebido no pacote Figma. */
export default function FigmaFrame({ children }: FigmaFrameProps) {
  return (
    <div data-layer="Frame 1" data-node-id="1-2" className="Frame1">
      {children}
    </div>
  );
}
