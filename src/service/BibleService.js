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

    await save('@bible_text', result);

    return result;
  });
}

const changeChosedVerse = async (verse) => {
  if(verse && verse !== null){
    let result = {status:200, content:{...verse}, dt:getDt()};

    await save('@bible_text', result);

    return result;
  }

  return null;
}

const save = async (key, response) => {
  return await CacheService.register(key, JSON.stringify(response));
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

const getBooks = async (errorHandler=()=>null) => {
  let books = await CacheService.get('@bible_books');

  if(books && books !== null){
    return JSON.parse(books);
  } else {
    return get('https://www.abibliadigital.com.br/api/books', 
                errorHandler, HEADERS)
    .then(async (response) => {
      let books = {status:response.status, books:[...response.data]};

      await save('@bible_books', books);

      return books;
    });
  }
}

const getChapter = async (abrev, chap, errorHandler=()=>null) => {
  let key = `@bible_book_${abrev}${chap}`;

  let chapter = await CacheService.get(key);

  if(chapter && chapter !== null){
    return JSON.parse(chapter);
  } else {
    return get(`https://www.abibliadigital.com.br/api/verses/nvi/${abrev}/${chap}`, 
                errorHandler, HEADERS)
    .then(async (response) => {
      let result = {status:response.status, content:{...response.data}};

      await save(key, result);

      return result;
    });
  }
}

export { 
  getRandomVerse, 
  getVerseFromCache, 
  getBooks, 
  getChapter, 
  changeChosedVerse 
}