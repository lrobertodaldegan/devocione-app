import CacheService from "./CacheService"

const KEY_A = '@plan_a';
const KEY_S = '@plan_s';
const KEY_F = '@plan_f';

const get = async (key) => {
  let ds = await CacheService.get(key);

  if(ds && ds != null)
    return JSON.parse(ds);

  return [];
}

export const PlanService = {
  planoAnualMarcados: async () => await get(KEY_A),
  planoSemestralMarcados: async () => await get(KEY_S),
  planoLivreMarcados: async () => await get(KEY_F),
  marcarPlano: async (item, type) => {
    let key = KEY_A;

    if(type === 'S')
      key = KEY_S;

    if(type === 'F')
      key = KEY_F;

    let planos = await CacheService.get(key);

    planos = JSON.parse(planos);

    if(planos && planos !== null && planos.length > 0){
      let plano = planos.filter((d) => d.id === item.id);

      if(plano && plano !== null && plano.length > 0){        
        planos.splice(planos.indexOf(plano[0]), 1);
          
        planos.push(item);
      } else {
        planos.push(item);
      }
    } else {
      planos = [item];
    }

    return await CacheService.register(key, JSON.stringify(planos));
  },
  desmarcarPlano: async (item, type) => {
    let key = KEY_A;

    if(type === 'S')
      key = KEY_S;

    if(type === 'F')
      key = KEY_F;

    let planos = await CacheService.get(key);

    planos = JSON.parse(planos);

    if(planos && planos !== null && planos.length > 0){
      let plano = planos.filter((d) => d.id === item.id);

      if(plano && plano !== null && plano.length > 0){        
        planos.splice(planos.indexOf(plano[0]), 1);
          
        await CacheService.register(key, JSON.stringify(planos));
      }
    }

    return true;
  }
}