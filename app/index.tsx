import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function Home() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [category, setCategory] = useState("All");

  //free_api of foods
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.json())
      .then((data) => setRecipes(data.meals || []));
  }, []);

  //fav
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // filter
  const filteredRecipes = recipes.filter((item) => {
    const matchSearch = item.strMeal
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory = category === "All" || item.strCategory === category;
    return matchSearch && matchCategory;
  });

  // catagory
  const categories = [
    "All",
    ...Array.from(new Set(recipes.map((item) => item.strCategory))),
  ];

  return (
    <View
      style={{
        marginTop: 30,
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 15,
      }}
    >
      {/* Title */}
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
        🍽️ Recipes
      </Text>

      {/* Search */}
      <TextInput
        placeholder="Search recipes..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 12,
          marginBottom: 15,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 5,
          elevation: 2,
        }}
      />

      {/* Categories */}
      <View style={{ flexDirection: "row", marginBottom: 15 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setCategory(item)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 15,
                marginRight: 10,
                backgroundColor: category === item ? "#ff914d" : "#e0e0e0",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: category === item ? "#fff" : "#333",
                  fontWeight: category === item ? "bold" : "500",
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recipe List */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.idMeal}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Animated.View entering={FadeIn.duration(500)}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/details",
                  params: {
                    title: item.strMeal,
                    desc: item.strInstructions,
                    image: item.strMealThumb,
                  },
                })
              }
              style={{
                backgroundColor: "#fff",
                borderRadius: 15,
                marginBottom: 15,
                overflow: "hidden",
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 5,
                elevation: 3,
              }}
            >
              {/* Favorite Button */}
              <TouchableOpacity
                onPress={() => toggleFavorite(item.idMeal)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 1,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  {favorites.includes(item.idMeal) ? "❤️" : "🤍"}
                </Text>
              </TouchableOpacity>

              {/* Image */}
              <Image
                source={{ uri: item.strMealThumb }}
                style={{ width: "100%", height: 180 }}
              />

              {/* Content */}
              <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.strMeal}
                </Text>
                <Text style={{ color: "#888", marginTop: 4 }}>
                  {item.strCategory}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}
