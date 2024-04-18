import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import NetInfo from '@react-native-community/netinfo';
import { StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class News2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselItems: [],
      newsData: [],
      error: null,
      loading: false,
      activeRequests: 0,
      apiCallFailed: false, // State to track if API call fails
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchCarouselImages();
  }

  startRequest = () => {
    this.setState((prevState) => ({
      loading: true,
      activeRequests: prevState.activeRequests + 1,
    }));
  };

  finishRequest = () => {
    this.setState((prevState) => ({
      activeRequests: prevState.activeRequests - 1,
    }), () => {
      if (this.state.activeRequests === 0) {
        this.setState({ loading: false });
      }
    });
  };

  fetchCarouselImages = () => {
    this.startRequest();
    const IMAGES_URL = "https://news.shreegajanana.com/api/upload/";

    fetch(IMAGES_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedImages = data.map((item) => ({
          source: { uri: `https://news.shreegajanana.com${item.image}` },
          link: item.website_link,
        }));
        this.setState({
          carouselItems: formattedImages,
        });
      })
      .catch((error) => {
        this.setState({ error: error.toString(), apiCallFailed: true });
      })
      .finally(() => {
        this.finishRequest();
      });
  };

  fetchData = () => {
    this.startRequest();
    const BASEURL = "https://news.shreegajanana.com/api/news/";
    const endpoints = [
      "jntuh_notifications/",
      
    ];

    Promise.all(
      endpoints.map((endpoint) =>
        fetch(BASEURL + endpoint).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      )
    )
    .then((data) => {
      const combinedData = [].concat(...data);
      this.setState({ newsData: combinedData });
    })
    .catch((error) => {
      this.setState({ error: error.toString(), apiCallFailed: true });
    })
    .finally(() => {
      this.finishRequest();
    });
  };

  handlePress = (url) => {
    if (url) {
      Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
    } else {
      console.error("URL not provided or is invalid");
    }
  };

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.handlePress(item.link)}>
        <Image
          source={item.source}
          style={{
            width: wp("80%"),
            height: hp("40%"),
            borderRadius: 5,
            resizeMode: "cover",
            marginTop: 12,
            alignSelf: 'center',
            marginBottom: 210,
          }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { error, loading, newsData, apiCallFailed } = this.state;

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading, please wait...</Text>
        </View>
      );
    }

    if (apiCallFailed) {
      return (
        <View style={styles.loaderContainer}>
          <Image
            source={require('../assets/netconn.png')} // Your error image path
            style={styles.adImage}
          />
        <Text style={styles.errorText}>
  Unable to connect. Please try again later.
</Text>
        </View>
      );
    }

    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <View> 
          <Carousel
            data={this.state.carouselItems}
            renderItem={this._renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={wp("90%")}
            containerCustomStyle={{
              marginBottom: 20,
            }}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={2000}
            loop={true}
          />  
       
       
          <ScrollView style={styles.newsContainer}>
            {newsData &&
              newsData.map((item, index) => (
                <View key={index} style={styles.newsItem}>
                  <TouchableOpacity
                    onPress={() => this.handlePress(item.url || item.link)}
                    style={styles.newsContent}
                  >
                    <Text style={styles.newsTitle}>
                      {item.text || item.title}
                    </Text>
                    {item.media_url && (
                      <Image
                        source={{ uri: item.media_url }}
                        style={styles.newsImage}
                      />
                    )}
                    <Text style={styles.newsSource}>{item.source}</Text>
                  </TouchableOpacity>
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Know More..."
                      onPress={() => this.handlePress(item.url || item.link)}
                    />
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  loadingText: {
    marginTop: 20,
    color: "white",
    fontSize: 16,
  },
  newsContainer: {
    // marginTop: -10,
    
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
  },
  errorText: {
    color: "white",
    padding: 10,
    fontSize:18,
    textAlign:'center',
  },
  errorTextt: {
    color: "white",
    padding: 10,
    fontSize:15,
    textAlign:'center',
  },
  newsItem: {
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  },
  newsContent: {
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  newsImage: {
    width: "100%",
    height: hp("0.1%"),
    borderRadius: 5,
    marginVertical: 10,
  },
  newsSource: {
    fontSize: 14,
    color: "red",
  },

  categoriesContainer: {
    marginTop: 0,
    flexGrow: 0,
    position: "sticky",
    marginBottom: -2,
  },
  categoryText: {
    color: "white",
    fontSize: wp("4%"),
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    height: hp("5%"),
  },
  carouselContainer: {
    backgroundColor: "black",
    borderRadius: 5,
    marginTop: 100, // Adjust this value as needed
  },
  adImage: {
    width: width * 0.9, // Use 90% of screen width
    height: height * 0.25, // Use 25% of screen height
    resizeMode: 'contain',
  },
});