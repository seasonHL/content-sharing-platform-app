import { useEffect, useMemo } from "react";
import { FlatList, FlatListProps, ScrollView, Text, View } from "react-native";

interface Props<T = any> extends FlatListProps<T> {}
const WaterFallList = (props: Props) => {
  const { data, numColumns = 1, ...rest } = props;
  if (!data) {
    return null;
  }
  const columnList = useMemo(() => {
    const columnLength = data.length / numColumns;
    const array = Array.from(data);
    const columnList = Array.from({ length: numColumns }, (v, k) =>
      array.slice(k * columnLength, (k + 1) * columnLength)
    );
    return columnList;
  }, [data, numColumns]);

  return (
    // FlatList不能直接嵌套在ScrollView中，不使用ScrollView会导致多列滚动不同步
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        {columnList.map((item, index) => (
          <FlatList key={index} data={item} {...rest} />
        ))}
      </View>
    </ScrollView>
  );
};

export default WaterFallList;
