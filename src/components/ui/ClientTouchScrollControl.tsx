"use client";
import dynamic from 'next/dynamic';

// Client-only dynamic import for touch scroll control
const TouchScrollControl = dynamic(
  () => import('./TouchScrollControl'),
  { ssr: false }
);

export default function ClientTouchScrollControl() {
  return <TouchScrollControl />;
}
