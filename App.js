// import React, { useEffect, useState } from 'react';
// import { ScrollView, View, Text, Button, Linking, Image, StyleSheet } from 'react-native';

// const App = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/news/')
//       .then(response => response.json())
//       .then(data => {
//         setNewsData(data);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         setError(error);
//       });
//   }, []);

//   const handlePress = (url) => {
//     Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>SHREE GAJANANA ENTERPRISES LLP </Text>
//       {error && <Text style={styles.errorText}>Error fetching data</Text>}
//       {newsData.map((item, index) => (
//         <View key={index} style={styles.newsItem}>
//           <View style={styles.newsContent}>
//             <Text style={styles.newsTitle}>{item.title}</Text>
//             <Button 
//               title="Know More" 
//               onPress={() => handlePress(item.link)} 
//               color="#007bff" // Custom button color
//             />
//           </View>
//           {item.media_url && (
//             <Image
//               source={{ uri: item.media_url }}
//               style={styles.newsImage}
//             />
//           )}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   newsItem: {
//     backgroundColor: '#f9f9f9',
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   newsContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   newsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     flexShrink: 1, // Allow text to shrink if needed
//   },
//   newsImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 5,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
// });

// export default App;
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['ViewPropTypes will be removed']);



import { View, Text } from 'react-native'
import React from 'react'
import Stacknavigator from './Stacknavigator'

const App = () => {
  return (
    <>
    <Stacknavigator />
     </>
  );
}

export default App