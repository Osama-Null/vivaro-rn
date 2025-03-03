import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { total } = route.params || { total: 0 };

  const [openBank, setOpenBank] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [openPrefix, setOpenPrefix] = useState(false);
  const [cardPrefix, setCardPrefix] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [openMonth, setOpenMonth] = useState(false);
  const [expiryMonth, setExpiryMonth] = useState("");
  const [openYear, setOpenYear] = useState(false);
  const [expiryYear, setExpiryYear] = useState("");
  const [pin, setPin] = useState("");

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 50,
          backgroundColor: "#282A36",
          borderColor: "#282A36",
          borderTopWidth: 0,
        },
      });
  }, [navigation]);

  const handleSubmit = () => {
    console.log("Submitting payment:", {
      selectedBank,
      cardPrefix,
      cardNumber,
      expiryMonth,
      expiryYear,
      pin,
    });
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const banks = [
    { label: "Select Your Bank", value: "" },
    { label: "Al Ahli Bank of Kuwait", value: "ABK" },
    { label: "Kuwait Finance House", value: "KFH" },
    { label: "National Bank of Kuwait", value: "NBK" },
  ];

  const prefixes = [
    { label: "Prefix", value: "" },
    { label: "Visa", value: "4" },
    { label: "MasterCard", value: "5" },
  ];

  const months = [
    { label: "MM", value: "" },
    ...[...Array(12).keys()].map((i) => ({
      label: `${i + 1}`.padStart(2, "0"),
      value: `${i + 1}`.padStart(2, "0"),
    })),
  ];

  const years = [
    { label: "YYYY", value: "" },
    ...[...Array(10).keys()].map((i) => {
      const year = new Date().getFullYear() + i;
      return { label: `${year}`, value: `${year}` };
    }),
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="orange" />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/ABK_Logo.svg/1200px-ABK_Logo.svg.png",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerRow}>
          <Text style={styles.headerLabel}>Merchant:</Text>
          <Text style={styles.headerValue}>Al Ahli Bank of Kuwait</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.headerRow}>
          <Text style={styles.headerLabel}>Amount:</Text>
          <Text style={styles.headerValue}>KD {total.toFixed(3)}</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        {/* Select Your Bank */}
        <View style={styles.formRow}>
          <Text style={styles.label}>Select Your Bank:</Text>
          <View style={styles.inputWrapper}>
            <DropDownPicker
              open={openBank}
              value={selectedBank}
              items={banks}
              setOpen={setOpenBank}
              setValue={setSelectedBank}
              style={styles.picker}
              dropDownContainerStyle={styles.dropDownContainer}
              textStyle={styles.pickerText}
              placeholder="Select Your Bank"
              placeholderStyle={styles.placeholderStyle}
              zIndex={3000} // Ensure correct stacking
              zIndexInverse={1000}
            />
            <Ionicons
              name="caret-down"
              size={15}
              color="#4d4d4d"
              style={styles.pickerIcon}
            />
          </View>
        </View>
        <View style={styles.divider} />

        {/* Card Number */}
        <View style={styles.formRow}>
          <Text style={styles.label}>Card Number:</Text>
          <View style={styles.cardNumberContainer}>
            <View style={styles.prefixWrapper}>
              <DropDownPicker
                open={openPrefix}
                value={cardPrefix}
                items={prefixes}
                setOpen={setOpenPrefix}
                setValue={setCardPrefix}
                style={styles.prefixPicker}
                dropDownContainerStyle={styles.dropDownContainer}
                textStyle={styles.pickerText}
                placeholder="Prefix"
                placeholderStyle={styles.placeholderStyle}
                zIndex={2000}
                zIndexInverse={2000}
              />
              <Ionicons
                name="caret-down"
                size={15}
                color="#4d4d4d"
                style={styles.prefixIcon}
              />
            </View>
            <TextInput
              style={styles.cardNumberInput}
              placeholder=""
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
            />
          </View>
        </View>
        <View style={styles.divider} />

        {/* Expiration Date */}
        <View style={styles.formRow}>
          <Text style={styles.label}>Expiration Date:</Text>
          <View style={styles.expirationContainer}>
            <View style={styles.expirationPickerWrapper}>
              <DropDownPicker
                open={openMonth}
                value={expiryMonth}
                items={months}
                setOpen={setOpenMonth}
                setValue={setExpiryMonth}
                style={styles.expirationPicker}
                dropDownContainerStyle={styles.dropDownContainer}
                textStyle={styles.pickerText}
                placeholder="MM"
                placeholderStyle={styles.placeholderStyle}
                zIndex={1000}
                zIndexInverse={3000}
              />
              <Ionicons
                name="caret-down"
                size={15}
                color="#4d4d4d"
                style={styles.expirationIcon}
              />
            </View>
            <View style={styles.expirationPickerWrapper}>
              <DropDownPicker
                open={openYear}
                value={expiryYear}
                items={years}
                setOpen={setOpenYear}
                setValue={setExpiryYear}
                style={styles.expirationPicker}
                dropDownContainerStyle={styles.dropDownContainer}
                textStyle={styles.pickerText}
                placeholder="YYYY"
                placeholderStyle={styles.placeholderStyle}
                zIndex={1000}
                zIndexInverse={3000}
              />
              <Ionicons
                name="caret-down"
                size={15}
                color="#4d4d4d"
                style={styles.expirationIcon}
              />
            </View>
          </View>
        </View>
        <View style={styles.divider} />

        {/* PIN */}
        <View style={styles.formRow}>
          <Text style={styles.label}>PIN:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ALL Rights Reserved. Copyright 2025 ©
        </Text>
        <Text style={styles.footerText}>
          The Shared Electronic Banking Services Company - KNET
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282A36",
    padding: 20,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 16,
    zIndex: 999,
    padding: 8,
    borderRadius: 20,
  },
  header: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 60,
  },
  logoContainer: {
    width: 80,
    height: 60,
    alignSelf: "center",
    marginBottom: 10,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLabel: {
    color: "#2C68C5",
    fontWeight: "bold",
    fontSize: 15,
  },
  headerValue: {
    color: "#4d4d4d",
    fontWeight: "bold",
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  formContainer: {
    width: "100%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C68C5",
    width: 150,
  },
  inputWrapper: {
    position: "relative",
    flex: 1,
  },
  picker: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "rgba(200, 198, 199, 0.31)",
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "rgba(200, 198, 199, 0.31)",
  },
  pickerText: {
    fontSize: 15,
    color: "#4d4d4d",
    fontWeight: "bold",
  },
  placeholderStyle: {
    fontSize: 15,
    color: "#4d4d4d",
    fontWeight: "bold",
  },
  pickerIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -7 }],
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(200, 198, 199, 0.31)",
    color: "#4d4d4d",
    fontSize: 15,
  },
  cardNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  prefixWrapper: {
    position: "relative",
    width: 90,
  },
  prefixPicker: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "rgba(200, 198, 199, 0.31)",
  },
  prefixIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -7 }],
  },
  cardNumberInput: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(200, 198, 199, 0.31)",
    color: "#4d4d4d",
    fontSize: 15,
  },
  expirationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  expirationPickerWrapper: {
    position: "relative",
    flex: 1,
  },
  expirationPicker: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "rgba(200, 198, 199, 0.31)",
  },
  expirationIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -7 }],
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    gap: 10,
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
});

export default PaymentScreen;
