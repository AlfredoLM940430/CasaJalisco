import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoadingEvents: true,
    isLoadingUsers: true,
    isLoadingBoletos_Usuarios: true,
    isLoadingApartados: true,
    boletos: [ ],
    usuarios: [ ],
    registro: [ ],
    boletos_usuarios: [ ],
    usuarioId: [ ],
    ticketsID: [ ],
    apartados: [ ],
}

export const lottoSlice = createSlice({
    name: 'casaJalisco',
    initialState: initialState,
    reducers: { 
        onAddRegister: (state, {payload = []}) => {
            state.registro = payload;  
        },
        onLoadEvents: (state, { payload = [] } ) => {
            state.isLoadingEvents = false;
            state.boletos = [];
            payload.forEach(el => {
                const exist = state.boletos.some(dbBoleto => dbBoleto.numero === el.numero)
                if (!exist) {
                    state.boletos.push(el)
                }
            });
        },
        onLoadusers: (state, { payload = []} ) => {
            state.isLoadingUsers = false;
            state.usuarios = [];
            payload.forEach(el => {
                const exist = state.usuarios.some(dbUser => dbUser.telefono === el.telefono)
                if (!exist) {
                    state.usuarios.push(el)
                }
            });
        },
        onFindBoletos: (state, { payload = []} ) => {
            state.boletos_usuarios = payload
        },
        onFindUserId: (state, { payload = []} ) => {
            state.usuarioId = payload
        },
        onFindTicket: (state, { payload = []} ) => {
            state.ticketsID = payload
        },
        onFindApartados: (state, { payload = []} ) => {
            state.isLoadingApartados = false;
            state.apartados = [];
            payload.apartados.forEach(el => {
                const exist = state.apartados.some(dbUser => dbUser.numero === el.numero)
                if (!exist) {
                    state.apartados.push(el)
                }
            });
        },
        onReset: (state) => (state = initialState)
     },
});

export const { onLoadEvents, onLoadusers, onFindBoletos, onAddRegister, onFindUserId, onFindTicket, onFindApartados, onReset } = lottoSlice.actions;