import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { styles } from "../style/styles";
import { Category, RootStackScreenProps } from "../types";
import uuid from "react-native-uuid";
import { showMessage } from "react-native-flash-message";
import axios from "axios";
import { API, BASE_URL, BASE_URL_PRODUCTS } from "../store/statics";
import { SafeAreaView } from "react-native-safe-area-context";
import { addProductNew } from "../store/products";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + API,
  },
});

const CreateProduct = ({
  navigation,
  route,
}: RootStackScreenProps<"CreateProduct">) => {
  const dispatch = useAppDispatch();
  // category
  const categories: Category[] = useAppSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // title
  const [title, setTitle] = useState("");
  // price
  const [price, setPrice] = useState("");
  // Description
  const [desc, setDesc] = useState("");
  // image Link
  const [img, setImg] = useState("");

  const renderItemsCat: ListRenderItem<Category> = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCategory(item.name);
        }}
        key={index}
        style={[
          {
            borderColor: "#000",
            borderWidth: 1,
            marginEnd: 15,
            borderRadius: 20,
            backgroundColor: selectedCategory === item.name ? "#000" : "#fff",
          },
        ]}
      >
        <Text
          style={{
            color: selectedCategory === item.name ? "#fff" : "#000",
            padding: 20,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // add product
  const addProduct = () => {
    //console.log(title, price, desc, img, selectedCategory);
    if (
      title !== "" &&
      price !== "" &&
      selectedCategory !== "" &&
      desc !== "" &&
      img !== ""
    ) {
      axiosInstance
        .post(BASE_URL_PRODUCTS, {
          name: title,
          price: parseInt(price),
          category: selectedCategory,
          description: desc,
          avatar: img,
          developerEmail: "badiei.sam0@gmail.com",
        })
        .then((res) => {
          dispatch(
            addProductNew({
              name: title,
              price: parseInt(price),
              category: selectedCategory,
              description: desc,
              avatar: img,
              developerEmail: "badiei.sam0@gmail.com",
              _id: "0",
              __v: 0,
              createdAt: "",
              updatedAt: "",
            })
          );
          showMsg();
        });
    } else {
      showMsgError();
    }
  };
  // show message
  const showMsg = () => {
    showMessage({
      message: "Product added",
      type: "success",
    });
  };

  const showMsgError = () => {
    showMessage({
      message: "Data can not be empty",
      type: "danger",
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView
        style={[
          styles.container,
          {
            flex: 1,
          },
        ]}
      >
        <View>
          <View style={{ flexDirection: "column" }}>
            <Text>Product title</Text>
            <TextInput
              style={{
                backgroundColor: "#eee",
                borderRadius: 20,
                padding: 15,
                marginTop: 10,
              }}
              placeholder="Product title"
              value={title}
              onChangeText={(e) => setTitle(e)}
            />
          </View>
          <View style={{ flexDirection: "column", marginTop: 20 }}>
            <Text>Price</Text>
            <TextInput
              style={{
                backgroundColor: "#eee",
                borderRadius: 20,
                padding: 15,
                marginTop: 10,
              }}
              placeholder="Price"
              keyboardType="numeric"
              value={price}
              onChangeText={(e) => setPrice(e)}
            />
          </View>
          <View style={{ flexDirection: "column", marginTop: 20 }}>
            <Text>Description</Text>
            <TextInput
              style={{
                backgroundColor: "#eee",
                borderRadius: 20,
                padding: 15,
                marginTop: 10,
                paddingBottom: 100,
              }}
              placeholder="Description"
              value={desc}
              onChangeText={(e) => setDesc(e)}
            />
          </View>

          <View style={{ flexDirection: "column", marginTop: 20 }}>
            <Text>Image Link</Text>
            <TextInput
              style={{
                backgroundColor: "#eee",
                borderRadius: 20,
                padding: 15,
                marginTop: 10,
              }}
              placeholder="Image Link"
              value={img}
              onChangeText={(e) => setImg(e)}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              marginTop: 20,
              marginBottom: 100,
            }}
          >
            <Text>Selected Category: {selectedCategory}</Text>
            <FlatList
              style={{ marginTop: 10 }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={categories.filter((x, index) => index !== 0)}
              renderItem={renderItemsCat}
              keyExtractor={(item) => uuid.v4().toString()}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: "#000",
          marginTop: "auto",
          borderRadius: 20,
          padding: 20,
          marginBottom: 40,
          marginHorizontal: 20,
        }}
        onPress={addProduct}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Add Product</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateProduct;
