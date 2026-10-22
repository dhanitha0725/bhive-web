'use client';

import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode
} from 'react';
import Link from 'next/link';
import { motion, LayoutGroup } from 'framer-motion';

type Palette = 'dark' | 'light';
type Size = 'sm' | 'md' | 'lg';
type Rgba = number[];

export interface GooeyNavItem {
  label?: string;
  href?: string;
  icon?: ReactNode;
}

export interface GooeyNavProps {
  items?: GooeyNavItem[];
  initialActiveIndex?: number;
  activeIndex?: number;
  onChange?: (index: number, item: GooeyNavItem) => void;
  theme?: Palette;
  color?: string;
  activeTextColor?: string;
  colors?: string[];
  size?: Size;
  frame?: boolean;
  animationTime?: number;
  particleCount?: number;
  timeVariance?: number;
  spread?: number;
  gooeyness?: number;
  wobble?: number;
  hoverEffect?: boolean;
  className?: string;
  style?: CSSProperties;
}

const THEMES: Record<Palette, Record<string, string>> = {
  dark: {
    '--gn-frame': 'rgba(38, 35, 46, 0.66)',
    '--gn-frame-edge': 'rgba(255, 255, 255, 0.08)',
    '--gn-frame-highlight': 'rgba(255, 255, 255, 0.07)',
    '--gn-frame-shadow': '0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
    '--gn-ink': '#f4f4f5',
    '--gn-muted': 'rgba(244, 244, 245, 0.62)'
  },
  light: {
    '--gn-frame': 'rgba(240, 240, 243, 0.8)',
    '--gn-frame-edge': 'rgba(24, 24, 27, 0.07)',
    '--gn-frame-highlight': 'rgba(255, 255, 255, 0.95)',
    '--gn-frame-shadow': '0 22px 44px -22px rgba(24, 24, 27, 0.3), 0 6px 16px -10px rgba(24, 24, 27, 0.16)',
    '--gn-ink': '#27272a',
    '--gn-muted': 'rgba(39, 39, 42, 0.62)'
  }
};

const PILLS: Record<Palette, { color: string; hover: string }> = {
  dark: { color: '#f4f4f5', hover: 'rgba(255, 255, 255, 0.08)' },
  light: { color: '#27272a', hover: 'rgba(24, 24, 27, 0.06)' }
};

const SIZES: Record<Size, Record<string, string>> = {
  sm: { '--gn-pad': '5px', '--gn-gap': '2px', '--gn-font': '13px', '--gn-x': '13px', '--gn-y': '7px' },
  md: { '--gn-pad': '6px', '--gn-gap': '4px', '--gn-font': '14px', '--gn-x': '16px', '--gn-y': '9px' },
  lg: { '--gn-pad': '7px', '--gn-gap': '6px', '--gn-font': '16px', '--gn-x': '20px', '--gn-y': '11px' }
};

const ROOT = 'relative inline-flex max-w-full text-[length:var(--gn-font)] leading-[1.2]';
const FRAMED =
  'rounded-full p-[var(--gn-pad)] backdrop-blur-[20px] backdrop-saturate-[1.6] [background:var(--gn-frame)] [box-shadow:var(--gn-frame-shadow)]';
const LIST_BASE = 'm-0 flex list-none flex-wrap items-center gap-[var(--gn-gap)] p-0';
const LIST = `relative ${LIST_BASE}`;
const LINK_BASE =
  'relative z-10 inline-flex items-center gap-2 whitespace-nowrap rounded-full border-none bg-transparent px-[var(--gn-x)] py-[var(--gn-y)] [font-family:inherit] [font-size:inherit] [line-height:inherit] font-medium no-underline cursor-pointer transition-colors duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gn-ink)]';
const ICON = 'inline-flex flex-none [&_svg]:h-[1.15em] [&_svg]:w-[1.15em]';
const RIM =
  'pointer-events-none absolute inset-0 rounded-[inherit] [box-shadow:inset_0_0_0_1px_var(--gn-frame-edge),inset_0_1px_0_var(--gn-frame-highlight)]';

const DEFAULT_ITEMS: GooeyNavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Work', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' }
];

const parse = (value: string): Rgba => {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(value).trim());
  if (match) {
    const hex = match[1].length === 3 ? match[1].replace(/./g, digit => digit + digit) : match[1];
    return [0, 2, 4].map(index => parseInt(hex.slice(index, index + 2), 16) / 255).concat(1);
  }
  const rgba = /rgba?\(([^)]+)\)/i.exec(String(value));
  if (rgba) {
    const parts = rgba[1].split(',').map(part => parseFloat(part));
    return [parts[0] / 255, parts[1] / 255, parts[2] / 255, parts[3] ?? 1];
  }
  return [1, 1, 1, 1];
};

const contrastInk = (rgb: Rgba) => (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2] > 0.55 ? '#18161d' : '#ffffff');

const GooeyNav = ({
  items = DEFAULT_ITEMS,
  initialActiveIndex = 0,
  activeIndex,
  onChange,
  theme = 'dark',
  color,
  activeTextColor,
  size = 'md',
  frame = true,
  hoverEffect = true,
  className = '',
  style
}: GooeyNavProps) => {
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (activeIndex !== prevActiveIndex) {
    setPrevActiveIndex(activeIndex);
    setSelectedTab(null);
  }

  const resolvedIndex = selectedTab ?? activeIndex ?? initialActiveIndex;
  const current = resolvedIndex >= 0 && resolvedIndex < items.length ? resolvedIndex : 0;

  const palette = theme === 'light' ? 'light' : 'dark';
  const pillColor = color || PILLS[palette].color;
  const pillRgb = parse(pillColor);
  const textColor = activeTextColor || contrastInk(pillRgb);

  const select = (index: number) => {
    if (index === current) return;
    setSelectedTab(index);
    onChange?.(index, items[index]);
  };

  return (
    <LayoutGroup id="gooey-nav">
      <nav
        className={`${ROOT}${frame ? ` ${FRAMED}` : ''} ${className}`.trim()}
        style={
          {
            ...(SIZES[size] ?? SIZES.md),
            ...THEMES[palette],
            '--gn-pill': pillColor,
            '--gn-active-ink': textColor,
            ...style
          } as CSSProperties
        }
      >
        {frame && <span className={RIM} />}
        <ul
          className={LIST}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {items.map((item, index) => {
            const isActive = index === current;
            const content = (
              <span className="relative z-10 flex items-center gap-2">
                {item.icon && <span className={ICON}>{item.icon}</span>}
                {item.label && <span>{item.label}</span>}
              </span>
            );

            const shared = {
              className: `${LINK_BASE} ${
                isActive
                  ? 'text-[var(--gn-active-ink)]'
                  : 'text-[var(--gn-muted)] hover:text-[var(--gn-ink)]'
              }`,
              'aria-current': isActive ? ('page' as const) : undefined,
              onClick: (event: MouseEvent) => {
                if (!item.href || item.href === '#') event.preventDefault();
                select(index);
              },
              onMouseEnter: () => setHoveredIndex(index)
            };

            const isInternal = item.href && (item.href.startsWith('/') || item.href.startsWith('#'));

            return (
              <li
                key={item.href || item.label || index}
                className="relative flex items-center"
                data-gooey-index={index}
                data-active={isActive ? '' : undefined}
              >
                {hoverEffect && hoveredIndex === index && !isActive && (
                  <motion.div
                    layoutId="gooey-nav-hover-pill"
                    className="absolute inset-0 rounded-full bg-neutral-900/[0.05] dark:bg-white/[0.08]"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 35
                    }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="gooey-nav-active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: pillColor }}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
                {item.href ? (
                  isInternal ? (
                    <Link href={item.href} {...shared}>
                      {content}
                    </Link>
                  ) : (
                    <a href={item.href} {...shared}>
                      {content}
                    </a>
                  )
                ) : (
                  <button type="button" {...shared}>
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </LayoutGroup>
  );
};

export default GooeyNav;
