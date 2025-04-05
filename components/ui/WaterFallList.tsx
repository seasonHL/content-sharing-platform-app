import { useEffect, useMemo } from "react";
import { FlatList, FlatListProps, ScrollView, Text, View } from "react-native";

interface Props<T = any> extends FlatListProps<T> {}
const WaterFallList = (props: Props) => {
  const { data, numColumns = 1, ...rest } = props;
  if (!data) {
    return null;
  }
  const columnList = useMemo(() => {
    const columnLength = Math.ceil(data.length / numColumns);
    const array = Array.from(data);
    const columnList = Array.from({ length: numColumns }, (v, k) =>
      array.slice(k * columnLength, (k + 1) * columnLength)
    );
    return columnList;
  }, [data, numColumns]);

  return (
    <FlatList
      refreshControl={rest.refreshControl}
      data={columnList}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <FlatList data={item} {...rest} />}
    />
  );
};

export default WaterFallList;
