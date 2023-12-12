import CacheService from "./CacheService"

const KEY = '@oracao_';

export const OracaoService = {
  minhasOracoes: async () => {
      let reasons = await CacheService.get(KEY);

      return JSON.parse(reasons);
  },
  salvarOracao: async (novaOracao) => {
    let oracoes = await CacheService.get(KEY);

    oracoes = JSON.parse(oracoes);

    
    if(oracoes && oracoes !== null && oracoes.length > 0){
      let oracao = oracoes.filter((o) => o.reason === novaOracao.reason);
      
      if(oracao && oracao !== null && oracao.length > 0){
        oracoes.map((o) => {
          if(o.reason === novaOracao.reason)
            o.done = novaOracao.done;
        });
      } else {
        oracoes.push(novaOracao);
      }
    } else {
      oracoes = [novaOracao];
    }

    return await CacheService.register(KEY, JSON.stringify(oracoes));
  },
  removerOracao: async (id) => {
    let oracoes = await CacheService.get(KEY);

    oracoes = JSON.parse(oracoes);

    if(oracoes && oracoes !== null && oracoes.length > 0){
      let oracao = oracoes.filter((o) => o.reason === id);

      let pos = oracoes.indexOf(oracao[0]);

      oracoes.splice(pos, 1);
      
      return await CacheService.register(KEY, JSON.stringify(oracoes));
    }
  },
}