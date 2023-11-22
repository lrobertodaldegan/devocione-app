import { get } from "../utils/Rest";
import CacheService from "./CacheService";
import { Days } from "../utils";

const HEADERS = {
  'X-Requested-With': 'XMLHttpRequest',
  'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBOb3YgMjAgMjAyMyAxOTo1OTozNCBHTVQrMDAwMC5scm9iZXJ0b2RhbGRlZ2FuQGhvdG1haWwuY29tIiwiaWF0IjoxNzAwNTEwMzc0fQ.XMsrrf_p_edVWE3DbVn1u7ety2Ny62o2JE1vF7JlMbw'
}

const getDt = () => {
  let d = new Date();

  return `${Days[d.getDay()]} - ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

const getRandomVerse = async (errorHandler=()=>null) => {
  return get('https://www.abibliadigital.com.br/api/verses/nvi/random', 
              errorHandler, HEADERS)
  .then(async (response) => {
    let result = {status:response.status, content:{...response.data}, dt:getDt()};

    await saveText(result);

    return result;
  });
}

const saveText = async (response) => {
  return await CacheService.register('@bible_text', JSON.stringify(response));
}

const getVerseFromCache = async () => {
  let text = await CacheService.get('@bible_text');

  if(text && text !== null){
    text = JSON.parse(text);

    if(`${getDt()}` === `${text.dt}`)
      return text;
  }

  return await getRandomVerse();
}

const getBooks = (errorHandler=()=>null) => {
  return get('https://www.abibliadigital.com.br/api/books', errorHandler, HEADERS)
  .then(async (response) => {
    return {status:response.status, books:[...response.data]};
  });
}

const getChapter = (abrev, chap, errorHandler=()=>null) => {
  return get(`https://www.abibliadigital.com.br/api/verses/nvi/${abrev}/${chap}`, 
              errorHandler, HEADERS)
  .then(async (response) => {
    return {status:response.status, content:{...response.data}};
  });
}

export { getRandomVerse, getVerseFromCache, getBooks, getChapter }