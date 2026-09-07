"use client";
import { Dialog } from "./dialog";
import type { ReactNode } from "react";
export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) { return <Dialog open={open} onClose={onClose} title={title} presentation="drawer">{children}</Dialog>; }
