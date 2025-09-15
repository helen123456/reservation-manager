import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "../hooks/useTranslation";
import NavBack from "./NavBack";


interface HelpSupportProps {
  onBack: () => void;
}

export default function HelpSupport({ onBack }: HelpSupportProps) {
  const { t } = useTranslation();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: t('howToAcceptReservation'),
      answer: t('howToAcceptReservationAnswer')
    },
    {
      question: t('howToManageTables'),
      answer: t('howToManageTablesAnswer')
    },
    {
      question: t('howToChangeLanguage'),
      answer: t('howToChangeLanguageAnswer')
    },
    {
      question: t('howToSetBusinessHours'),
      answer: t('howToSetBusinessHoursAnswer')
    }
  ];

  const quickActions = [
    {
      icon: "message-circle",
      title: t('liveChat'),
      description: t('liveChatDescription'),
      action: () => {}
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <NavBack 
        title={t('helpSupport')}
        subtitle={t('helpSupportDescription')}
        onBack={onBack}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.sectionsContainer}>
            {/* Quick Actions */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>{t('quickHelp')}</Text>
              <View style={styles.actionsContainer}>
                {quickActions.map((action, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={action.action}
                    style={styles.actionItem}
                  >
                    <View style={styles.actionContent}>
                      <Feather name={action.icon as any} size={20} color="#666" />
                      <View style={styles.actionText}>
                        <Text style={styles.actionTitle}>{action.title}</Text>
                        <Text style={styles.actionDescription}>{action.description}</Text>
                      </View>
                    </View>
                    <Feather name="chevron-right" size={16} color="#666" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* FAQ Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>{t('frequentlyAskedQuestions')}</Text>
              <View style={styles.faqContainer}>
                {faqItems.map((item, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      style={styles.faqItem}
                      onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      <View style={styles.faqHeader}>
                        <Text style={styles.faqQuestion}>{item.question}</Text>
                        <Feather 
                          name={expandedFaq === index ? "chevron-up" : "chevron-down"} 
                          size={16} 
                          color="#666" 
                        />
                      </View>
                    </TouchableOpacity>
                    {expandedFaq === index && (
                      <View style={styles.faqAnswer}>
                        <Text style={styles.faqAnswerText}>{item.answer}</Text>
                      </View>
                    )}
                    {index < faqItems.length - 1 && <View style={styles.separator} />}
                  </View>
                ))}
              </View>
            </View>

            {/* Contact Support */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>{t('contactSupport')}</Text>
              <View style={styles.contactContainer}>
                <View style={styles.contactItem}>
                  <View style={styles.contactInfo}>
                    <Feather name="mail" size={20} color="#666" />
                    <View style={styles.contactText}>
                      <Text style={styles.contactTitle}>{t('emailSupport')}</Text>
                      <Text style={styles.contactDetail}>support@neo.com</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.contactButton}>
                    <Feather name="external-link" size={16} color="#007AFF" />
                    <Text style={styles.contactButtonText}>{t('sendEmail')}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <View style={styles.contactItem}>
                  <View style={styles.contactInfo}>
                    <Feather name="phone" size={20} color="#666" />
                    <View style={styles.contactText}>
                      <Text style={styles.contactTitle}>{t('phoneSupport')}</Text>
                      <Text style={styles.contactDetail}>+1 (555) 123-4567</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.contactButton}>
                    <Feather name="phone" size={16} color="#007AFF" />
                    <Text style={styles.contactButtonText}>{t('callNow')}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <View style={styles.supportHours}>
                  <Text style={styles.supportHoursText}>
                    <Text style={styles.supportHoursTitle}>{t('supportHours')}</Text>
                    {"\n"}{t('supportHoursDetails')}
                  </Text>
                </View>
              </View>
            </View>

            {/* App Info */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>{t('appInformation')}</Text>
              <View style={styles.appInfoContainer}>
                <View style={styles.appInfoItem}>
                  <Text style={styles.appInfoLabel}>{t('version')}</Text>
                  <Text style={styles.appInfoValue}>1.2.0</Text>
                </View>
                <View style={styles.appInfoItem}>
                  <Text style={styles.appInfoLabel}>{t('lastUpdated')}</Text>
                  <Text style={styles.appInfoValue}>Dec 15, 2024</Text>
                </View>
                <View style={styles.appInfoItem}>
                  <Text style={styles.appInfoLabel}>{t('buildNumber')}</Text>
                  <Text style={styles.appInfoValue}>20241215.1</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
  },
  content: {
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth:1,
    borderColor:"#e0e0e0"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  actionsContainer: {
    gap: 12,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
   
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionText: {
    marginLeft: 12,
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  actionDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  faqContainer: {
    gap: 16,
  },
  faqItem: {
    paddingVertical: 4,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    marginTop: 8,
    paddingLeft: 4,
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 16,
  },
  contactContainer: {
    gap: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  contactText: {
    marginLeft: 12,
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  contactDetail: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#007AFF",
    backgroundColor: "white",
  },
  contactButtonText: {
    color: "#007AFF",
    fontSize: 14,
    marginLeft: 4,
  },
  supportHours: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
  },
  supportHoursText: {
    fontSize: 14,
    color: "#666",
  },
  supportHoursTitle: {
    fontWeight: "600",
    color: "#1a1a1a",
  },
  appInfoContainer: {
    gap: 8,
  },
  appInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appInfoLabel: {
    fontSize: 14,
    color: "#666",
  },
  appInfoValue: {
    fontSize: 14,
    color: "#1a1a1a",
  },
});