import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

export default function Details() {
  const { title, desc, image } = useLocalSearchParams();

  // ✅ Fix for TypeScript (string | string[])
  const imageUrl = Array.isArray(image) ? image[0] : image;
  const recipeTitle = Array.isArray(title) ? title[0] : title;
  const recipeDesc = Array.isArray(desc) ? desc[0] : desc;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 🍔 Image */}
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: 250 }}
      />

      {/* 📄 Content */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: "bold" }}>{recipeTitle}</Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            color: "gray",
            lineHeight: 22,
          }}
        >
          {recipeDesc}
        </Text>
      </View>
    </ScrollView>
  );
}
