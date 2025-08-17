import type { ReactNode } from "react";

export default function AdminTitle({ children }: { children: ReactNode }) {
  return <h1 className={`text-3xl font-bold text-[#43319A]`}>{children}</h1>;
}
