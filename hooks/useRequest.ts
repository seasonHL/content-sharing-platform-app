import { useFocusEffect } from 'expo-router';
import { useState, useEffect, useCallback } from 'react';

/** 自定义请求函数类型 */
type RequestFunction<T> = (params: any) => Promise<T>;
type UseRequestOptions<R> = {
    /** 初始参数 */
    initialParams?: any;
    /** 最大重试次数，默认 3 次 */
    maxRetries?: number;
    /** 重试延迟时间，默认 1000ms */
    retryDelay?: number
    /** 请求成功回调 */
    onSuccess?: (data: R) => void;
};
/** 自定义请求 hook */
export const useRequest = <T>(
    requestFn: RequestFunction<T>,
    {
        initialParams,
        maxRetries = 3,
        retryDelay = 1000,
        onSuccess = () => { }
    }: UseRequestOptions<T> = {}
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [params, setParams] = useState(initialParams);
    const [retryCount, setRetryCount] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await requestFn(params);
            onSuccess(result);
            setData(result);
            setRetryCount(0); // 请求成功，重置重试次数
        } catch (err) {
            if (retryCount < maxRetries) {
                setTimeout(() => {
                    setRetryCount(prevCount => prevCount + 1);
                }, retryDelay);
            } else {
                setError(err as Error);
            }
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [params, retryCount])
    );
    /** 手动重新请求 */
    const refetch = (newParams: any = {}) => {
        setParams((prevParams: any) => ({ ...prevParams, ...newParams }));
        setRetryCount(0); // 手动重新请求时，重置重试次数
    };

    return { data, loading, error, refetch };
};

export default useRequest;
