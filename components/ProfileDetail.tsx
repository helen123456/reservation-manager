import { useMessage } from "@/components/GlobalMessage";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import z from "zod";
import { useTranslation } from "../hooks/useTranslation";
import { languages } from "../utils/i18n";
import { NavBack } from "./NavBack";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface ProfileDetailProps {
  onBack: () => void;
}

export default function ProfileDetail({ onBack }: ProfileDetailProps) {
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const message = useMessage();
  const [modalVisible, setModalVisible] = useState(false);
  const [singleButtonModal, setSingleButtonModal] = useState(true);

  const schema = z.object({
    restaurantName: z.string().min(1, t("restaurantNameRequired")),
    ownerName: z.string().min(1, t("ownerNameRequired")),
    email: z.string().email(t("emailInvalid")),
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .regex(/^\+?[1-9]\d{1,14}$/, t("phoneInvalid")), // 国际电话号码格式,
    address: z.string().min(1, t("addressRequired")),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      restaurantName: "Le Petit Bistro",
      ownerName: "Marie Dubois",
      email: "marie@lepetitbistro.com",
      phone: "122",
      address: "123 Rue de la Paix, Paris, France",
    },
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const handleSave = async (data: z.infer<typeof schema>) => {
    if (!isValid) return;
    console.log(data);
    message.success("保存成功！", 3);
    // Alert.alert("Success", t("profileUpdated"));
  };

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
    setShowLanguageSelector(false);
  };

  const getCurrentLanguageName = () => {
    const language = languages.find((lang) => lang.code === currentLanguage);
    return language ? language.nativeName : "English";
  };

  const saveButton = (
    <TouchableOpacity
      style={styles.saveButton}
      onPress={handleSubmit(handleSave)}
    >
      <Feather name="save" size={14} color="#fff" />
      <Text style={styles.saveButtonText}>{t("save")}</Text>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <NavBack
        title={t("profileTitle")}
        onBack={onBack}
        rightComponent={saveButton}
      />
      <ScrollView style={styles.scrollContent}>
        {/* Personal Information */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="user" size={18} color="#111827" />
            <ThemedText style={styles.cardTitle}>
              {t("personalInformation")}
            </ThemedText>
          </View>
          <FormProvider {...methods}>
            <Input
              name={"restaurantName"}
              label={t("restaurantName")}
              placeholder={t("restaurantName")}
            />

            <Input
              name={"ownerName"}
              label={t("ownerName")}
              placeholder={t("ownerName")}
            />

            <Input
              inputMode="email"
              name={"email"}
              label={t("email")}
              placeholder={t("email")}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              inputMode="tel"
              name={"phone"}
              label={t("phone")}
              placeholder={t("phone")}
              keyboardType="phone-pad"
            />

            <Input
              name={"address"}
              label={t("address")}
              placeholder={t("address")}
              multiline
            />
          </FormProvider>
        </View>

        {/* Language Preferences */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="globe" size={18} color="#111827" />
            <ThemedText style={styles.cardTitle}>{t("preferences")}</ThemedText>
          </View>

          <ThemedText style={styles.label}>{t("language")}</ThemedText>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowLanguageSelector(true)}
          >
            <Text style={styles.selectButtonText}>
              {getCurrentLanguageName()}
            </Text>
            <Feather name="chevron-down" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 单按钮 Modal */}
      <Modal
        visible={showLanguageSelector}
        title={t("language")}
        footer={false}
        onCancel={() => setShowLanguageSelector(false)}
      >
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageOption,
              currentLanguage === language.code &&
                styles.languageOptionSelected,
            ]}
            onPress={() => handleLanguageChange(language.code)}
          >
            <Text style={styles.languageOptionText}>{language.nativeName}</Text>
            <Text style={styles.languageOptionSubtext}>({language.name})</Text>
          </TouchableOpacity>
        ))}
      </Modal>
    </ThemedView>
  );
}
const styles = {
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  header: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    marginLeft: -8,
  },
  title: {
    fontSize: 18,
    fontWeight: "500" as const,
    color: "#111827",
  },
  saveButton: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500" as const,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  cardHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: "#111827",
    marginLeft: 8,
  },

  label: {
    fontSize: 14,
    color: "#5F6368",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#111827",
  },
  inputFocused: {
    borderColor: "#3b82f6",
  },
  selectButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  selectButtonText: {
    fontSize: 16,
    color: "#111827",
  },
  languageModal: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  languageModalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 20,
    maxHeight: 400,
  },
  languageModalTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#111827",
    marginBottom: 16,
    textAlign: "center" as const,
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  languageOptionSelected: {
    backgroundColor: "#f3f4f6",
  },
  languageOptionText: {
    fontSize: 16,
    color: "#111827",
  },
  languageOptionSubtext: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    alignItems: "center" as const,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500" as const,
  },
};
