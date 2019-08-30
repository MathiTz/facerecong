import styled from "styled-components/native";
import { RNCamera } from "react-native-camera";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const LayerOutterTop = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 23.5%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: space-around;
`;
export const LayerOutterBottom = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: space-around;
`;

export const LayerOutterLeft = styled.View`
  position: absolute;
  top: 23.5%;
  left: 0;
  width: 29;
  height: 61.5%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: space-around;
`;

export const LayerOutterRight = styled.View`
  position: absolute;
  top: 23.5%;
  right: 0;
  width: 29;
  height: 61.5%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: space-around;
`;

export const LayerInner = styled.View`
  position: relative;
  bottom: 15%;
  width: 300;
  height: 300;
  background-color: rgba(0, 0, 0, 0);
  border-color: white;
  border-width: 1;
  z-index: 100;
`;

export const ContainerButton = styled.View`
  width: 100%;
  height: 80;
  background-color: black;
  flex-direction: row;
  justify-content: center;
`;

export const SnapButton = styled.TouchableOpacity`
  width: 80;
  background-color: #fff;
  border-radius: 5;
  padding-vertical: 15;
  padding-horizontal: 20;
  align-self: center;
  margin-top: 20;
  margin-bottom: 20;
  margin-left: 20;
  margin-right: 20;
`;

export const TextButton = styled.Text`
  font-size: 14;
  opacity: ${props => (props.loading ? 0.5 : 1)};
`;
