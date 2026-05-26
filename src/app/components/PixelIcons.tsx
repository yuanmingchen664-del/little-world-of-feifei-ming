// 8-bit 像素风格图标组件
import type { CSSProperties } from "react";

interface PixelIconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function PixelHome({ size = 24, className = "", style }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <rect x="2" y="10" width="2" height="12"/>
      <rect x="4" y="8" width="2" height="2"/>
      <rect x="6" y="6" width="2" height="2"/>
      <rect x="8" y="4" width="2" height="2"/>
      <rect x="10" y="2" width="4" height="2"/>
      <rect x="14" y="4" width="2" height="2"/>
      <rect x="16" y="6" width="2" height="2"/>
      <rect x="18" y="8" width="2" height="2"/>
      <rect x="20" y="10" width="2" height="12"/>
      <rect x="4" y="10" width="16" height="12"/>
      <rect x="10" y="14" width="4" height="8"/>
    </svg>
  );
}

export function PixelBook({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="4" y="4" width="16" height="16"/>
      <rect x="6" y="6" width="12" height="12" fill="white"/>
      <rect x="8" y="8" width="8" height="2"/>
      <rect x="8" y="11" width="8" height="2"/>
      <rect x="8" y="14" width="6" height="2"/>
    </svg>
  );
}

export function PixelMail({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="2" y="6" width="20" height="12"/>
      <rect x="4" y="8" width="16" height="8" fill="white"/>
      <rect x="6" y="8" width="2" height="2"/>
      <rect x="8" y="10" width="2" height="2"/>
      <rect x="10" y="12" width="4" height="2"/>
      <rect x="14" y="10" width="2" height="2"/>
      <rect x="16" y="8" width="2" height="2"/>
    </svg>
  );
}

export function PixelCheckbox({ size = 24, className = "", checked = false }: PixelIconProps & { checked?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="4" y="4" width="16" height="16"/>
      <rect x="6" y="6" width="12" height="12" fill="white"/>
      {checked && (
        <>
          <rect x="8" y="12" width="2" height="2"/>
          <rect x="10" y="14" width="2" height="2"/>
          <rect x="12" y="12" width="2" height="2"/>
          <rect x="14" y="10" width="2" height="2"/>
          <rect x="16" y="8" width="2" height="2"/>
        </>
      )}
    </svg>
  );
}

export function PixelCalendar({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="4" y="6" width="16" height="14"/>
      <rect x="6" y="8" width="12" height="10" fill="white"/>
      <rect x="7" y="4" width="2" height="4"/>
      <rect x="15" y="4" width="2" height="4"/>
      <rect x="8" y="11" width="2" height="2"/>
      <rect x="11" y="11" width="2" height="2"/>
      <rect x="14" y="11" width="2" height="2"/>
      <rect x="8" y="14" width="2" height="2"/>
      <rect x="11" y="14" width="2" height="2"/>
    </svg>
  );
}

export function PixelImage({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="3" y="5" width="18" height="14"/>
      <rect x="5" y="7" width="14" height="10" fill="white"/>
      <rect x="7" y="9" width="3" height="3"/>
      <rect x="11" y="13" width="2" height="2"/>
      <rect x="13" y="11" width="2" height="2"/>
      <rect x="15" y="9" width="2" height="2"/>
    </svg>
  );
}

export function PixelList({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="6" y="6" width="2" height="2"/>
      <rect x="10" y="6" width="8" height="2"/>
      <rect x="6" y="11" width="2" height="2"/>
      <rect x="10" y="11" width="8" height="2"/>
      <rect x="6" y="16" width="2" height="2"/>
      <rect x="10" y="16" width="8" height="2"/>
    </svg>
  );
}

export function PixelPlus({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="11" y="6" width="2" height="12"/>
      <rect x="6" y="11" width="12" height="2"/>
    </svg>
  );
}

export function PixelTrash({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="8" y="4" width="8" height="2"/>
      <rect x="6" y="6" width="12" height="2"/>
      <rect x="7" y="9" width="10" height="11"/>
      <rect x="9" y="11" width="2" height="7" fill="white"/>
      <rect x="13" y="11" width="2" height="7" fill="white"/>
    </svg>
  );
}

export function PixelSend({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="4" y="11" width="2" height="2"/>
      <rect x="6" y="9" width="2" height="2"/>
      <rect x="6" y="13" width="2" height="2"/>
      <rect x="8" y="7" width="2" height="2"/>
      <rect x="8" y="15" width="2" height="2"/>
      <rect x="10" y="9" width="2" height="6"/>
      <rect x="12" y="11" width="8" height="2"/>
      <rect x="16" y="9" width="2" height="2"/>
      <rect x="16" y="13" width="2" height="2"/>
      <rect x="18" y="11" width="2" height="2"/>
    </svg>
  );
}

export function PixelHeart({ size = 24, className = "", style, filled = false }: PixelIconProps & { filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} className={className} style={style}>
      <rect x="6" y="6" width="4" height="2" fill="currentColor"/>
      <rect x="14" y="6" width="4" height="2" fill="currentColor"/>
      <rect x="4" y="8" width="2" height="4" fill="currentColor"/>
      <rect x="18" y="8" width="2" height="4" fill="currentColor"/>
      <rect x="6" y="12" width="2" height="2" fill="currentColor"/>
      <rect x="16" y="12" width="2" height="2" fill="currentColor"/>
      <rect x="8" y="14" width="2" height="2" fill="currentColor"/>
      <rect x="14" y="14" width="2" height="2" fill="currentColor"/>
      <rect x="10" y="16" width="4" height="2" fill="currentColor"/>
      <rect x="12" y="18" width="2" height="2" fill="currentColor"/>
      {filled && (
        <>
          <rect x="6" y="8" width="4" height="4"/>
          <rect x="14" y="8" width="4" height="4"/>
          <rect x="8" y="12" width="8" height="2"/>
          <rect x="10" y="14" width="4" height="2"/>
        </>
      )}
    </svg>
  );
}

export function PixelCat({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="4" y="4" width="2" height="4"/>
      <rect x="18" y="4" width="2" height="4"/>
      <rect x="6" y="8" width="12" height="8"/>
      <rect x="8" y="10" width="2" height="2" fill="white"/>
      <rect x="14" y="10" width="2" height="2" fill="white"/>
      <rect x="11" y="13" width="2" height="2" fill="white"/>
      <rect x="6" y="16" width="2" height="2"/>
      <rect x="16" y="16" width="2" height="2"/>
    </svg>
  );
}

export function PixelFeather({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="12" y="4" width="2" height="2"/>
      <rect x="10" y="6" width="2" height="2"/>
      <rect x="14" y="6" width="2" height="2"/>
      <rect x="8" y="8" width="2" height="2"/>
      <rect x="12" y="8" width="2" height="2"/>
      <rect x="16" y="8" width="2" height="2"/>
      <rect x="6" y="10" width="2" height="2"/>
      <rect x="10" y="10" width="2" height="2"/>
      <rect x="14" y="10" width="2" height="2"/>
      <rect x="8" y="12" width="2" height="2"/>
      <rect x="12" y="12" width="2" height="2"/>
      <rect x="6" y="14" width="2" height="2"/>
      <rect x="10" y="14" width="2" height="2"/>
      <rect x="4" y="16" width="2" height="2"/>
      <rect x="8" y="16" width="2" height="2"/>
      <rect x="6" y="18" width="2" height="2"/>
    </svg>
  );
}

export function PixelCamera({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="4" y="8" width="16" height="10"/>
      <rect x="6" y="10" width="12" height="6" fill="white"/>
      <rect x="9" y="6" width="6" height="2"/>
      <rect x="10" y="12" width="4" height="2"/>
      <rect x="17" y="10" width="2" height="2" fill="red"/>
    </svg>
  );
}

export function PixelSparkle({ size = 24, className = "" }: PixelIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="11" y="4" width="2" height="4"/>
      <rect x="11" y="16" width="2" height="4"/>
      <rect x="4" y="11" width="4" height="2"/>
      <rect x="16" y="11" width="4" height="2"/>
      <rect x="7" y="7" width="2" height="2"/>
      <rect x="15" y="7" width="2" height="2"/>
      <rect x="7" y="15" width="2" height="2"/>
      <rect x="15" y="15" width="2" height="2"/>
    </svg>
  );
}
