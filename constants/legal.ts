export type PrivacyPolicyLinks = {
  primary: string;
  backup: string;
};

export const PRIVACY_POLICY_URLS: Record<string, PrivacyPolicyLinks> = {
  en: {
    primary: 'https://neo.com/privacy/en',
    backup: 'https://status.neo.com/privacy/en'
  },
  fr: {
    primary: 'https://neo.com/privacy/fr',
    backup: 'https://status.neo.com/privacy/fr'
  }
};

export const getPrivacyPolicyLinks = (language: string): PrivacyPolicyLinks => {
  if (PRIVACY_POLICY_URLS[language]) {
    return PRIVACY_POLICY_URLS[language];
  }

  return PRIVACY_POLICY_URLS.en;
};
