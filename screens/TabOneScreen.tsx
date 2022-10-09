import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { getCategory } from "../store/categories";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { filterProducts, getProducts } from "../store/products";
import {
  API,
  BASE_URL,
  BASE_URL_CATEGORIES,
  BASE_URL_PRODUCTS,
} from "../store/statics";
import { styles } from "../style/styles";
import { Category, Products, RootTabScreenProps } from "../types";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + API,
  },
});

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const dispatch = useAppDispatch();
  const products: Products[] = useAppSelector((state) => state.products.filter);
  const categories: Category[] = useAppSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const scrollRef = useRef<FlatList>(null);

  const onPressTouch = () => {
    scrollRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  useEffect(() => {
    axiosInstance.get(BASE_URL_PRODUCTS).then((res) => {
      const data: Products[] = res.data.products;

      dispatch(getProducts(data));
    });

    axiosInstance.get(BASE_URL_CATEGORIES).then((res) => {
      const data = res.data.categories;
      dispatch(getCategory(data));
    });
  }, []);

  useEffect(() => {
    dispatch(
      filterProducts({
        category: selectedCategory,
      })
    );
  }, [selectedCategory]);

  const renderItems: ListRenderItem<Products> = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProductDetails", item);
        }}
        key={index}
        style={[
          {
            marginStart: 10,
            flex: 1 / 2,
            flexDirection: "column",
            marginBottom: 50,
            backgroundColor: "white",
          },
          styles.borderRad30,
          styles.shadow,
          styles.itemWH,
        ]}
      >
        <View style={{ padding: 10 }}>
          <Image
            source={{ uri: item.avatar }}
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              borderRadius: 10,
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: "black",
            flexDirection: "column",
            marginTop: 50,
            borderRadius: 20,
            justifyContent: "space-between",
            height: 60,
            padding: 10,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={{ color: "#ffffff80", fontWeight: "bold" }}>
            {item.price + "$"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemsCat: ListRenderItem<Category> = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPressTouch();
          setSelectedCategory(item.name);
        }}
        key={index}
        style={[
          {
            borderColor: "#000",
            borderWidth: 1,
            marginEnd: categories.length - 1 === index ? 15 : 0,
            marginStart: 15,
            borderRadius: 20,
            backgroundColor: selectedCategory === item.name ? "#000" : "#fff",
          },
        ]}
      >
        <Text
          style={{
            color: selectedCategory === item.name ? "#fff" : "#000",
            padding: 10,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.droidSafeArea,
        { position: "relative", backgroundColor: "#fff" },
      ]}
    >
      <View style={[styles.container, { padding: 0, paddingBottom: 150 }]}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "italic",
            marginStart: 20,
          }}
        >
          UPayment Store
        </Text>
        <View style={{ marginTop: 20 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categories}
            renderItem={renderItemsCat}
            keyExtractor={(item) => uuid.v4().toString()}
          />
        </View>
        <View style={{ padding: 10, marginTop: 3 }}>
          <FlatList
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            data={products}
            numColumns={2}
            renderItem={renderItems}
            keyExtractor={(item) => uuid.v4().toString()}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          position: "absolute",
          borderWidth: 1,
          borderColor: "#000",
          borderRadius: 100,
          backgroundColor: "#fff",
          right: 20,
          bottom: 20,
        }}
        onPress={() => {
          navigation.navigate("CreateProduct");
        }}
      >
        <AntDesign
          style={{ padding: 20 }}
          name="plus"
          size={40}
          color="black"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
