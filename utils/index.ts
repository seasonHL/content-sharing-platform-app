import { Dimensions, PixelRatio, Image, StyleSheet, ImageStyle, TextStyle, ViewStyle } from "react-native";

/**
 * 从对象中选择指定的键值对
 * @param obj - 要从中选择键值对的对象
 * @param keys - 要选择的键的列表
 * @returns 一个新对象，包含从原对象中选择的键值对
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const ret: any = {};
    keys.forEach((key) => {
        if (key in obj) {
            ret[key] = obj[key];
        }
    });
    return ret;
}
/**
 * 从对象中排除指定的键值对
 * @param obj - 要从中排除键值对的对象
 * @param keys - 要排除的键的列表
 * @returns 一个新对象，包含从原对象中排除的键值对
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const ret: any = { ...obj };
    keys.forEach((key) => {
        if (key in ret) {
            delete ret[key];
        }
    });
    return ret;
}

const screenWidth = Dimensions.get('window').width;
const DESIGN_WIDTH = 414;
export function vw(designSize: number) {
    const scale = screenWidth / DESIGN_WIDTH;
    return PixelRatio.roundToNearestPixel(designSize * scale);
}


type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

// 定义 options 参数的类型
type CreateStyleOptions = {
    exclude: string[];
};

const DEFAULT_OPTIONS: CreateStyleOptions = { exclude: ['borderRadius'] };

// 提取样式转换逻辑到单独的函数
function transformStyleValue(style: any, options: CreateStyleOptions) {
    const { exclude } = options;
    for (const prop in style) {
        if (exclude.includes(prop)) {
            continue;
        }
        const value = style[prop];
        if (typeof value === 'number') {
            style[prop] = vw(value);
        }
        if (typeof value === 'string' && value.includes('vw')) {
            style[prop] = vw(parseFloat(value.replace('vw', '')));
        }
    }
    return style;
}

export const createStyle = <T extends NamedStyles<T> | NamedStyles<any>>(styles: T & NamedStyles<any>, options: CreateStyleOptions = DEFAULT_OPTIONS): T => {
    // 验证传入的 styles 参数是否为对象
    if (typeof styles !== 'object' || styles === null) {
        throw new Error('The "styles" parameter must be an object.');
    }
    // 验证传入的 options 参数是否为对象
    if (typeof options !== 'object' || options === null) {
        throw new Error('The "options" parameter must be an object.');
    }
    // 验证 options 中的 exclude 参数是否为数组
    if (!Array.isArray(options.exclude)) {
        throw new Error('The "exclude" property in "options" must be an array.');
    }

    const transformedStyles = { ...styles } as T;
    for (const key in transformedStyles) {
        const style = transformedStyles[key] as any;
        transformedStyles[key] = transformStyleValue(style, options);
    }
    return StyleSheet.create(transformedStyles);
};

/**
 * 时间戳转换
 * 
 * 当日显示时分，一周内显示星期几，一年内显示月日，超过一年显示年月日
 */
export function timestampToTime(timestamp: number | string | Date) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diffDay < 1) {
        return date.toLocaleString('zh-CN', { hour: 'numeric', minute: 'numeric' });
    }
    if (diffDay < 7) {
        return date.toLocaleString('zh-CN', { weekday: 'short' });
    }
    if (diffDay < 365) {
        return date.toLocaleString('zh-CN', { month: 'short', day: 'numeric' });
    }
    return date.toLocaleString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * 获取图片尺寸
 * @param url - 图片URL
 * @returns 图片尺寸
 */
export function getImageSize(url: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        Image.getSize(
            url,
            (width, height) => {
                resolve({ width, height });
            },
            (error) => {
                reject(new Error(`Failed to load image from URL: ${url}. Error: ${error}`));
            }
        );
    });
}