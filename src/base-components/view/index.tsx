/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import styled from '@emotion/styled'
import { PropsWithChildren, CSSProperties, FC, DetailedHTMLProps, HTMLAttributes } from 'react'

import { styles } from './styled'

export type PropsWithStyle<P = any> = PropsWithChildren<{ className?: string; style?: CSSProperties } & P>

export function View<P = any>({
  children,
  className,
  style,
  ...extra
}: PropsWithStyle<P & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>) {
  return (
    <div css={styles.view} className={`${className}`} style={style} {...extra}>
      {children}
    </div>
  )
}
type TextVariant = 'main' | 'h1' | 'h2' | 'h3' | 'sub' | 'sub1' | 'sub2' | 'sub3'

const TextVariantStyle: Record<TextVariant, { fontSize: string }> = {
  main: {
    fontSize: '0.16rem',
  },
  h1: {
    fontSize: '0.32rem',
  },
  h2: {
    fontSize: '0.24rem',
  },
  h3: {
    fontSize: '0.16rem',
  },
  sub: {
    fontSize: '0.14rem',
  },
  sub1: {
    fontSize: '0.12rem',
  },
  sub2: {
    fontSize: '0.1rem',
  },
  sub3: {
    fontSize: '0.08rem',
  },
}
interface TextProps {
  variant?: TextVariant
}
export const Text: FC<PropsWithStyle<TextProps>> = styled.span(({ variant = 'main' }: TextProps) => {
  return {
    ...(TextVariantStyle[variant] ?? TextVariantStyle['main']),
    color: '#000',
  }
})
