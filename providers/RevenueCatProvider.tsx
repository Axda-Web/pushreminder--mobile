import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { CustomerInfo } from "react-native-purchases";
import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";

const APIKeys = {
  apple: "appl_glySUaJSyxmkhGGNUZprwjuvJUk",
  google: "goog_RNlvUuTsBBLpCAtKAuKSKzlSeDQ",
};

interface RevenueCatProps {
  isPro: boolean;
  goPro: () => Promise<boolean>;
}

const RevenueCatContext = createContext<Partial<RevenueCatProps>>({});

export const RevenueCatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPro, setIsPro] = useState(false);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const init = async () => {
      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

      if (Platform.OS === "ios") {
        Purchases.configure({
          apiKey: APIKeys.apple,
        });
      } else {
        Purchases.configure({
          apiKey: APIKeys.google,
        });
      }

      setIsReady(true);

      Purchases.addCustomerInfoUpdateListener((customerInfo) => {
        console.log("Customer info updated:", customerInfo);
        updateCustomerInformation(customerInfo);
      });

      const products = await Purchases.getProducts(["gpt_499_1m"]);
      console.log("Products:", products);

      const offerings = await Purchases.getOfferings();
      console.log("offerings", offerings);
    };
    init();
  }, []);

  const updateCustomerInformation = async (customerInfo: CustomerInfo) => {
    if (customerInfo?.entitlements.active["Pro"] !== undefined) {
      setIsPro(true);
    }
  };

  const goPro = async () => {
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall({
      displayCloseButton: true,
    });

    switch (paywallResult) {
      case PAYWALL_RESULT.NOT_PRESENTED:
      case PAYWALL_RESULT.ERROR:
      case PAYWALL_RESULT.CANCELLED:
        return false;
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
        return true;
      default:
        return false;
    }
  };

  const value = {
    isPro,
    goPro,
  };

  if (!isReady) return <></>;

  return (
    <RevenueCatContext.Provider value={value}>
      {children}
    </RevenueCatContext.Provider>
  );
};

export const useRevenueCat = () => useContext(RevenueCatContext);
