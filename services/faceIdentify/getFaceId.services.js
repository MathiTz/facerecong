import axios from "axios";

export async function getFaceId(base_url, data, headersFile) {
  try {
    const faceIdsData = await axios.post(`${base_url}/detect`, data, {
      headers: headersFile
    });

    const faceIds = faceIdsData.data.map(item => item.faceId);
    return faceIds;
  } catch (err) {
    alert("Não detectamos seu rosto, tira a foto novamente, por favor!");
  }

  // alert(JSON.stringify(faceIdsData));

  // alert(faceIdsData);
}
