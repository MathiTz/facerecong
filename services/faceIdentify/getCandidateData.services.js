import axios from "axios";

export async function candidateData(base_url, idGroup, faceId, headersStatic) {
  try {
    const candidates = await axios.post(
      `${base_url}/identify`,
      {
        personGroupId: idGroup,
        faceIds: faceId
      },
      { headers: headersStatic }
    );
    const candidateId = candidates.data.map(item =>
      item.candidates.map(i => i.personId)
    );
    return candidateId;
  } catch (err) {
    alert("Seu rosto não consta no banco de dados, por favor diriga-se ao RH");
  }
  // alert(candidateId);
}
