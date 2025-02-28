import type { FC, ReactNode } from "react";
interface Props {
  when: boolean;
  children: ReactNode;
}
export const Show: FC<Props> = ({ when, children }) => {
  return when ? children : null;
};
