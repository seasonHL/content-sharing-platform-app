import { FC, ReactNode } from "react";
interface Props {
  defaultComponent: ReactNode;
  toggleComponent: ReactNode;
  isToggle: boolean | ReactNode;
}
export const Toggle: FC<Props> = ({
  isToggle,
  defaultComponent,
  toggleComponent,
}) => {
  return isToggle ? toggleComponent : defaultComponent;
};
