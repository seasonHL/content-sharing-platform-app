import { Dimensions, PixelRatio } from "react-native";

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