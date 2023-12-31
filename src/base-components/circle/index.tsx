import { styles } from 'base-components/view/styled';
import * as React from 'react';
import { Component, CSSProperties } from 'react';

export interface CircleProps {
  progress: number;
  animate?: boolean;
  animationDuration?: string;
  showPercentage?: boolean;
  showPercentageSymbol?: boolean;
  progressColor?: string;
  bgColor?: string;
  textColor?: string;
  size?: string;
  lineWidth?: string;
  percentSpacing?: number;
  textStyle?: CSSProperties;
  roundedStroke?: boolean;
  responsive?: boolean;
  onAnimationEnd?(): void;
  styles?: CSSProperties
}

export interface CircleState {

}

const radius = 200;
const diameter = Math.round(Math.PI * radius * 2);
const getOffset = (val = 0) => Math.round((100 + Math.min(val, 100)) / 100 * diameter);

export class Circle extends Component<CircleProps, CircleState> {
  static defaultProps: CircleProps = {
    progress: 0,
    animate: true,
    animationDuration: '1s',
    showPercentage: true,
    showPercentageSymbol: true,
    progressColor: 'rgb(76, 154, 255)',
    bgColor: '#ecedf0',
    textColor: '#6b778c',
    size: '100',
    lineWidth: '25',
    percentSpacing: 10,
    textStyle: { font: 'bold 4rem Helvetica, Arial, sans-serif' },
    styles: {}
  }

  get text() {
    const { progress, showPercentage, textColor, textStyle, styles, percentSpacing, showPercentageSymbol } = this.props;
    if (!showPercentage) return;

    return (
      <text style={textStyle} fill={textColor} x={radius} y={radius} textAnchor="middle" dominantBaseline="central">
        {progress}{showPercentageSymbol && <tspan dx={percentSpacing}>%</tspan>}
      </text>
    );
  }

  render() {
    const { progress, size, bgColor, progressColor, lineWidth, animate, animationDuration, roundedStroke, responsive, onAnimationEnd } = this.props;
    const strokeDashoffset = getOffset(progress);
    const transition = animate ? `stroke-dashoffset ${animationDuration} ease-out` : undefined;
    const strokeLinecap = roundedStroke ? 'round' : 'butt';
    const svgSize = responsive ? '100%' : size;
    return (
      <svg width={svgSize} height={svgSize} viewBox="0 0 200 200">
        <circle stroke={bgColor} cx="100" cy="100" r="95" strokeWidth={lineWidth} fill="none" />
        <circle stroke={progressColor} transform="rotate(-90 100 100)" cx="100" cy="100" r="95" strokeDasharray="1100" strokeWidth={lineWidth} strokeDashoffset="1100" strokeLinecap={strokeLinecap} fill="none" style={{ strokeDashoffset, transition }} onTransitionEnd={onAnimationEnd} />
        {strokeDashoffset}
      </svg>
    );
  }
}
