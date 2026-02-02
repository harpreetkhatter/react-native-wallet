import { View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "../../constants/api";
import {styles} from "../../assets/styles/create.styles"
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const CATEGORIES = [
  { id: "food", name: "Food", icon: "fast-food" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "document-text" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "others", name: "Others", icon: "ellipsis-horizontal" },
];
const CreateScreen = () => {
  const router = useRouter();
  const user = useUser();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    //valodations
    if (!title.trim())
      return Alert.alert("Error", "Please enter a valid title");
    if (!amount.trim() || isNaN(parseFloat(amount)))
      return Alert.alert("Error", "Please enter a valid amount");

    if (!selectedCategory)
      return Alert.alert("Error", "Please select a category");

    setIsLoading(true);
    try {
      //formatted amoutn

      const formattedAmount = isExpense
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));

      //create transaction object
      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user.id,
          title,
          amount: formattedAmount,
          category: selectedCategory,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create transaction");
      }
      Alert.alert("Success", "Transaction created successfully");
      router.back();
    } catch (error) {
      console.log("Error creating transaction:", error);
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <TouchableOpacity onPress={handleCreate} disabled={isLoading} style={[styles.saveButtonContainer, isLoading && styles.disabledButton]}>
          <Text style={styles.saveButton}>{isLoading ? "Saving..." : "Save"}</Text>
          {!isLoading && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.typeSelector}>
          {/* expense selector */}
          <TouchableOpacity onPress={() => setIsExpense(true)} style={[styles.typeButton, isExpense && styles.typeButtonActive]}>
            <Ionicons name="arrow-down-circle" size={22} color={isExpense ? COLORS.white : COLORS.expense} style={styles.typeIcon}/>
            <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>Expense</Text>
          </TouchableOpacity>


          {/* income selector */}
          <TouchableOpacity onPress={() => setIsExpense(false)} style={[styles.typeButton, !isExpense && styles.typeButtonActive]}>
            <Ionicons name="arrow-up-circle" size={22} color={!isExpense ? COLORS.white : COLORS.income} style={styles.typeIcon}/>
            <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>Income</Text>
          </TouchableOpacity>

        </View>

         {/* amount container */}
         <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        {/* INPUT CONTAINER */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Transaction Title"
            placeholderTextColor={COLORS.textLight}
            value={title}
            onChangeText={setTitle}
          />
        </View>



        <Text style={styles.sectionTitle}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text} /> Category
        </Text>

        <View style={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryButton, selectedCategory === category.name && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Ionicons name={category.icon} size={20} color={selectedCategory === category.name ? COLORS.white : COLORS.text}  style={styles.categoryIcon}/>
              <Text style={[styles.categoryButtonText, selectedCategory === category.name && styles.categoryButtonTextActive]}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>

      {isLoading
        &&  <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      }

    </View>
  );
};

export default CreateScreen;
