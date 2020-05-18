export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  slideConfig: any,
}

export type RendererProps = {
  index: number,
  key: string,
}
