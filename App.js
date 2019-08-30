import React, { Component } from "react";
import {
  Camera,
  Container,
  ContainerButton,
  LayerInner,
  LayerOutterTop,
  LayerOutterBottom,
  LayerOutterLeft,
  LayerOutterRight,
  SnapButton,
  TextButton
} from "./style/global";
import { BASE_URL, API_KEY, GET_PERSON_URL } from "react-native-dotenv";

import { RNCamera } from "react-native-camera";
import {
  getFaceId,
  candidateData,
  candidateName
} from "./services/faceIdentify";
import base64ToArrayBuffer from "base64-arraybuffer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  takePicture = async () => {
    await this.setState({ ...this.state, loading: true });
    if (this.camera) {
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
      await this.camera.pausePreview();

      // detect = {
      //   url:
      //     "https://scontent.ffor4-1.fna.fbcdn.net/v/t1.0-9/44983994_1923609647755856_7889859879144259584_n.jpg?_nc_cat=107&_nc_oc=AQkjWnSomYGwHJl5YcI7o5wPiA2qC4_DruCzkm38OmQwPB6nzjrjJ8Qh68N1iYPCly0&_nc_ht=scontent.ffor4-1.fna&oh=1c94837a30faeb8ac6563391140e5360&oe=5E06D212"
      // },

      const faceId = await getFaceId(BASE_URL, selfie, headersFile),
        candidateId = await candidateData(BASE_URL, id, faceId, headersStatic),
        nameOfCandidate = await candidateName(
          GET_PERSON_URL,
          id,
          candidateId,
          headersStatic
        );
      this.setState({ loading: false });
      alert(nameOfCandidate);
      await this.camera.resumePreview();
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <Container>
        <Camera
          ref={camera => {
            this.camera = camera;
          }}
          type={RNCamera.Constants.Type.front}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          orientation={RNCamera.Constants.Orientation.portrait}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          captureAudio={false}
        >
          <LayerInner></LayerInner>
          <LayerOutterTop></LayerOutterTop>
          <LayerOutterBottom></LayerOutterBottom>
          <LayerOutterLeft></LayerOutterLeft>
          <LayerOutterRight></LayerOutterRight>
        </Camera>
        <ContainerButton>
          <SnapButton onPress={this.takePicture} disabled={loading}>
            <TextButton loading={loading}> SNAP </TextButton>
          </SnapButton>
        </ContainerButton>
      </Container>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {},
//   junkViewTest: {
//     width: 1000,
//     height: 100,
//     backgroundColor: "rgba(0, 0, 0, 0.4)"
//   },
//   preview: {},
//   buttonContainer: {},
//   capture: {},
//   captureOnLoad: {
//     display: "none"
//   },
//   buttonText: {
//     fontSize: 14
//   },
//   buttonTextOnLoad: {},
//   maskOutter: {},
//   maskInner: {},
//   maskInnerOnLoad: {},
//   loadingSpinner: {
//     paddingVertical: "50%"
//   },
//   onLoading: {
//     paddingTop: "15%",
//     paddingHorizontal: "50%",
//     fontSize: 16,
//     color: "white"
//   },
//   maskFrame: {
//     backgroundColor: "rgba(1,1,1,0.6)"
//   },
//   maskRow: {
//     width: "100%"
//   },
//   maskCenter: { flexDirection: "row" }
// });
