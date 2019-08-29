import React, { Component } from "react";
import { BASE_URL, API_KEY, GET_PERSON_URL } from "react-native-dotenv";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator
} from "react-native";

import { RNCamera } from "react-native-camera";
import axios from "axios";
import base64ToArrayBuffer from "base64-arraybuffer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  takePicture = async () => {
    await this.setState({ ...this.state, loading: true });
    if (this.camera) {
      //alert(this.state.loading);
      const options = { quality: 0.25, base64: true },
        data = await this.camera.takePictureAsync(options),
        headersStatic = {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": API_KEY
        },
        headersFile = {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": API_KEY
        },
        id = 2,
        selfie = base64ToArrayBuffer.decode(data.base64);
      // detect = {
      //   url:
      //     "https://scontent.ffor4-1.fna.fbcdn.net/v/t1.0-9/44983994_1923609647755856_7889859879144259584_n.jpg?_nc_cat=107&_nc_oc=AQkjWnSomYGwHJl5YcI7o5wPiA2qC4_DruCzkm38OmQwPB6nzjrjJ8Qh68N1iYPCly0&_nc_ht=scontent.ffor4-1.fna&oh=1c94837a30faeb8ac6563391140e5360&oe=5E06D212"
      // },

      const faceIdsData = await axios
        .post(`${BASE_URL}/detect`, selfie, {
          headers: headersFile
        })
        .catch(err => {
          alert(err);
          this.setState({ loading: false });
        });

      // alert(JSON.stringify(faceIdsData));

      // alert(faceIdsData);

      const faceIds = faceIdsData.data.map(item => item.faceId);
      // alert(faceIds);
      const candidates = await axios
        .post(
          `${BASE_URL}/identify`,
          {
            personGroupId: id,
            faceIds: faceIds
          },
          { headers: headersStatic }
        )
        .catch(err => {
          this.setState({ loading: false });
          alert("Não foi possível lhe identificar, por favor diriga-se ao RH");
        });
      // alert(JSON.stringify(candidates));

      const candidateId = candidates.data.map(item =>
        item.candidates.map(i => i.personId)
      );

      // alert(candidateId);
      const nameCandidate = await axios
        .get(`${GET_PERSON_URL}/${id}/persons/${candidateId}`, {
          headers: headersStatic
        })
        .catch(err => {
          this.setState({ loading: false });
          alert(err);
        });
      this.setState({ loading: false });
      alert(JSON.stringify(nameCandidate.data.name));
    }
  };

  render() {
    const { height, width } = Dimensions.get("window");
    const maskRowHeight = Math.round((height - 422) / 20);
    const maskColWidth = (width - 300) / 2;
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={camera => {
            this.camera = camera;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          captureAudio={false}
        >
          <View style={styles.maskOutter}>
            <View
              style={[
                { flex: maskRowHeight },
                styles.maskRow,
                styles.maskFrame
              ]}
            />
            <View style={[{ flex: 30 }, styles.maskCenter]}>
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              <View
                style={[loading ? styles.maskInnerOnLoad : styles.maskInner]}
              >
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  animating={loading}
                  style={styles.loadingSpinner}
                />
              </View>
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            </View>
            <View
              style={[
                { flex: maskRowHeight },
                styles.maskRow,
                styles.maskFrame
              ]}
            />
          </View>
          {/* <View style={styles.maskOutter}>
            <View style={loading ? styles.maskInnerOnLoad : styles.maskInner}>
              
            </View>
          </View> */}
        </RNCamera>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.takePicture}
            style={styles.capture}
            disabled={loading}
          >
            <Text
              style={!loading ? styles.buttonText : styles.buttonTextOnLoad}
            >
              {" "}
              SNAP{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  junkViewTest: {
    width: 1000,
    height: 100,
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  captureOnLoad: {
    display: "none"
  },
  buttonText: {
    fontSize: 14
  },
  buttonTextOnLoad: {
    fontSize: 14,
    opacity: 0.5
  },
  maskOutter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0.2, 0.2, 0.2, 0.2)",
    alignItems: "center",
    justifyContent: "space-around"
  },
  maskInner: {
    width: 300,
    height: 300,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1
  },
  maskInnerOnLoad: {
    width: 300,
    height: 300,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderColor: "white",
    borderWidth: 1
  },
  loadingSpinner: {
    paddingVertical: "50%"
  },
  onLoading: {
    paddingTop: "15%",
    paddingHorizontal: "50%",
    fontSize: 16,
    color: "white"
  },
  maskFrame: {
    backgroundColor: "rgba(1,1,1,0.6)"
  },
  maskRow: {
    width: "100%"
  },
  maskCenter: { flexDirection: "row" }
});
