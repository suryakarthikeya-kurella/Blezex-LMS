import { ReactNode } from "react";
export const Card = ({ children, className = "", hov = false }: { children: ReactNode; className?: string; hov?: boolean }) =>
  <div className={`sketch-card ${hov ? "hov" : ""} ${className}`}>{children}</div>;
export const Annotation = ({ text }: { text: string }) => <span className="font-hand text-brand text-xl leading-none">{text}</span>;
export const Title = ({ children, note }: { children: ReactNode; note?: string }) =>
  <div className="mb-5"><h1 className="text-3xl font-extrabold">{children}</h1>{note && <Annotation text={note} />}</div>;
export const Msg = ({ m }: { m: string }) => m ? <p className="text-sm text-brand-dark font-medium my-2">{m}</p> : null;
export const Empty = ({ t }: { t: string }) => <p className="text-muted text-sm py-6 text-center">{t}</p>;
