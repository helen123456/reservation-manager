import { Input, NavBack, Toast } from "@/components";
import { Modal } from '@/components/base/Modal';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from "@/hooks/useTranslation";
import { getUserInfo, updateUserInfo } from '@/services/api/userService';
import { languages } from "@/utils/i18n";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import z from "zod";



export default function ProfileDetail() {
  const { t, currentLanguage, changeLanguage } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [singleButtonModal, setSingleButtonModal] = useState(true);
  const { theme } = useTheme();

  const schema = z.object({
    userName: z.string().min(1, t("userNameRequired")),
    email: z.string().email(t("emailInvalid")),
    phone: z.string().min(1, t("phoneRequired")).regex(/^\+?[1-9]\d{1,14}$/, t("phoneInvalid")), // 国际电话号码格式,
    address: z.string().min(1, t("addressRequired")),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      userName: "Marie Dubois",
      email: "marie@lepetitbistro.com",
      phone: "122",
      address: "123 Rue de la Paix, Paris, France",
    },
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isValid },
    reset
  } = methods;

  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  useEffect(() => {
    getUserInfo().then((res:any) => {
      reset(res)
    })
  }, [reset])

  const handleSave = async (data: z.infer<typeof schema>) => {
    if (!isValid) return;
    const uid = await AsyncStorage.getItem('uid')
    await updateUserInfo({...data,lang:currentLanguage,uid:uid||'1'})
     Toast.success('保存成功！');
  };

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage);
    setShowLanguageSelector(false);
  };

  const getCurrentLanguageName = () => {
    const language = languages.find((lang) => lang.code === currentLanguage);
    return language ? language.nativeName : "English";
  };

  const styles = createStyles(theme);

  const saveButton = (
    <TouchableOpacity
      style={styles.saveButton}
      onPress={handleSubmit(handleSave)}
    >
      <Feather name="save" size={14} color={theme.primaryForeground} />
      <Text style={styles.saveButtonText}>{t("save")}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NavBack
        title={t("profileTitle")}
        rightComponent={saveButton}
      />
      <ScrollView style={styles.scrollContent}>
        {/* Personal Information */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="user" size={18} color={theme.text} />
            <Text style={styles.cardTitle}>
              {t("personalInformation")}
            </Text>
          </View>
          <FormProvider {...methods}>
           

            <Input
              name={"userName"}
              label={t("userName")}
              placeholder={t("userName")}
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
              numberOfLines={2}
            />
          </FormProvider>
        </View>

        {/* Language Preferences */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="globe" size={18} color={theme.text} />
            <Text style={styles.cardTitle}>{t("preferences")}</Text>
          </View>

          <Text style={styles.label}>{t("language")}</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowLanguageSelector(true)}
          >
            <Text style={styles.selectButtonText}>
              {getCurrentLanguageName()}
            </Text>
            <Feather name="chevron-down" size={16} color={theme.mutedForeground} />
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
                  <Text style={styles.languageOptionText}>
                    {language.nativeName}
                  </Text>
                  <Text style={styles.languageOptionSubtext}>
                    ({language.name})
                  </Text>
                </TouchableOpacity>
              ))}
      </Modal>
     
    </View>
  );
}
const createStyles = (theme: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme.background,
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
    color: theme.text,
  },
  saveButton: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: theme.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveButtonText: {
    color: theme.primaryForeground,
    fontSize: 14,
    fontWeight: "500" as const,
    marginLeft: 4,
  },
  card: {
    backgroundColor: theme.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.border,
  },
  cardHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500" as const,
    color: theme.text,
    marginLeft: 8,
  },

  label: {
    fontSize: 14,
    color: theme.mutedForeground,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: theme.card,
    color: theme.text,
  },
  inputFocused: {
    borderColor: theme.primary,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: theme.card,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
  },
  selectButtonText: {
    fontSize: 16,
    color: theme.text,
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
    backgroundColor: theme.card,
    borderRadius: 8,
    padding: 16,
    margin: 20,
    maxHeight: 400,
  },
  languageModalTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: theme.text,
    marginBottom: 16,
    textAlign: "center" as const,
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  languageOptionSelected: {
    backgroundColor: theme.muted,
  },
  languageOptionText: {
    fontSize: 16,
    color: theme.text,
  },
  languageOptionSubtext: {
    fontSize: 12,
    color: theme.mutedForeground,
    marginTop: 2,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: theme.muted,
    borderRadius: 6,
    alignItems: "center" as const,
  },
  closeButtonText: {
    fontSize: 16,
    color: theme.text,
    fontWeight: "500" as const,
  },
});
