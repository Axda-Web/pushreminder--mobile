import { Text, View } from "react-native";
import Galaxies from "@/modules/galaxies";
import { useState, useEffect } from "react";
import { usePush } from "@/hooks/usePush";

export default function Index() {
  const { registerForPushNotificationsAsync } = usePush();
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log(token);
      setExpoPushToken(token);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "yellow" }}>{Galaxies.hello()}</Text>
      <Text>{Galaxies.PI}</Text>
      {/* <Text>{JSON.stringify(Galaxies.getDeviceInfo())}</Text>*/}
      <Text>{expoPushToken}</Text>
    </View>
  );
}
