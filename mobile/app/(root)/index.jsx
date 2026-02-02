import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import {
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from "react-native";
import { SignOutButton } from "../../components/SignOutButton.jsx";
import { useTransactions } from "../../hooks/useTransactions.js";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader.js";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { COLORS } from "../../constants/colors.js";

import { styles } from "../../assets/styles/home.styles.js";
import BalanceCart from "../../components/BalanceCart.js";
import TransactionItem from "../../components/TransactionItem.js";
import NoTransactionsFound from "../../components/NoTransactionsFound.js";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions(user.id);

  useEffect(() => {
    loadData();
  }, [loadData]);
  if (isLoading && !refreshing) return <PageLoader />;

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteTransaction(id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* header */}
        <View style={styles.header}>
          {/* left */}
          <View style={styles.headerLeft}>
            <Image
              source={COLORS.logo}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          {/* right */}
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Ionicons name="add" size={24} color="#fff" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
        <BalanceCart summary={summary} />
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
