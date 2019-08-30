import axios from "axios";

export async function candidateName(
  url_person,
  idGroup,
  candidateId,
  headersStatic
) {
  try {
    const nameCandidate = await axios.get(
      `${url_person}/${idGroup}/persons/${candidateId}`,
      {
        headers: headersStatic
      }
    );
    return JSON.stringify(nameCandidate.data.name);
  } catch (err) {
    alert(
      "Não foi possível identificar o seu nome no banco de dados, por favor, compareça ao setor de Tecnologia"
    );
  }
}
