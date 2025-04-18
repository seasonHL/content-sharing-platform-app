import { createStyle } from "@/utils";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// 定义按钮类型的枚举
enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
}

enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

// 定义按钮组件的 props 类型
interface ButtonProps {
  /** 按钮文本 */
  title: string;
  /** 按钮类型 */
  type?: "primary" | "secondary";
  /** 按钮尺寸 */
  size?: "small" | "medium" | "large";
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击事件 */
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = ButtonType.Primary,
  size = ButtonSize.Medium,
  disabled = false,
  onPress,
}) => {
  const getButtonPadding = () => {
    switch (size) {
      case ButtonSize.Small:
        return styles.smallPd;
      case ButtonSize.Medium:
        return styles.mediumPd;
      case ButtonSize.Large:
        return styles.largePd;
      default:
        return styles.mediumPd;
    }
  };

  const getButtonStyle = () => {
    if (disabled) {
      return [styles.disabledButton, getButtonPadding()];
    }
    switch (type) {
      case ButtonType.Primary:
        return [styles.primaryButton, getButtonPadding()];
      case ButtonType.Secondary:
        return [styles.secondaryButton, getButtonPadding()];
      default:
        return [styles.primaryButton, getButtonPadding()];
    }
  };

  const getTextStyle = () => {
    if (disabled) {
      return styles.disabledText;
    }
    switch (type) {
      case ButtonType.Primary:
        return styles.primaryText;
      case ButtonType.Secondary:
        return styles.secondaryText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = createStyle({
  primaryButton: {
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "transparent",
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "lightgray",
    borderRadius: 5,
    alignItems: "center",
  },
  primaryText: {
    color: "white",
    fontSize: 16,
  },
  secondaryText: {
    color: "white",
    fontSize: 16,
  },
  disabledText: {
    color: "darkgray",
    fontSize: 16,
  },
  smallPd: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  mediumPd: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  largePd: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
