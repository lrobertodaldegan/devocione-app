import CacheService from "./CacheService"

const KEY = '@devocional_';

export const DevocionalService = {
    meusDevocionais: async () => {
        let ds = await CacheService.get(KEY);

            if(ds && ds != null){
            ds = JSON.parse(ds);

            ds.sort((a, b) => {
                if(a.id > b.id)
                    return 1;
                
                if(a.id < b.id)
                    return -1;

                return 0;
            });

            return ds;
        }

        return [];
    },
    salvarDevocional: async (novoDevocional) => {
        let devocionais = await CacheService.get(KEY);

        devocionais = JSON.parse(devocionais);

        if(devocionais && devocionais !== null && devocionais.length > 0){
            let devocional = devocionais.filter((d) => d.id === novoDevocional.id);

            if(devocional && devocional !== null && devocional.length > 0){        
                devocionais.splice(devocionais.indexOf(devocional[0]), 1);
                
                devocionais.push(novoDevocional);
            } else {
                devocionais.push(novoDevocional);
            }
        } else {
            devocionais = [novoDevocional];
        }

        return await CacheService.register(KEY, JSON.stringify(devocionais));
    }
}