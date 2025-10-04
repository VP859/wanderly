import React, { ReactNode, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export const ReadMoreText = ({ children, numberOfLines = 3 }: { children: ReactNode; numberOfLines?: number }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <View>
      <Text
        numberOfLines={showMore ? undefined : numberOfLines}
        style={styles.text}
      >
        {children}
      </Text>
      <TouchableOpacity onPress={() => setShowMore(!showMore)}>
        <Text style={styles.readMoreText}>
          {showMore ? "Read less" : "Read more"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  readMoreText: {
    marginTop: 6,
    color: "#909090ff",
    fontWeight: "500",
  },
});

export default function App() {
  return (
    <View style={{ padding: 20 }}>
      <ReadMoreText numberOfLines={3}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos.
      </ReadMoreText>
    </View>
  );
}
