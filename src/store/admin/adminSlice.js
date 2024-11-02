import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoadingApartados: true,
    apartados: [ ],
    usuarioId: [ ],
    ticketsID: [ ],
    savedTicket: [ ],
    deletedTicket: [ ],
    isW: [ ],
    isLoadingComprados: true,
    comprados: [ ],
    getWinner: [ ],
}

export const adminSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: { 
        onFindApartados: (state, { payload = []} ) => {
            state.isLoadingApartados = false;
            state.apartados = [];
            if(!!payload.apartados) {
                payload.apartados.forEach(el => {
                    const exist = state.apartados.some(dbUser => dbUser.numero === el.numero)
                    if (!exist) {
                        state.apartados.push(el)
                    }
                });
            } else {
                payload.forEach(el => {
                    const exist = state.apartados.some(dbUser => dbUser.numero === el.numero)
                    if (!exist) {
                        state.apartados.push(el)
                    }
                });
            }
        },
        onFindUserId: (state, { payload = []} ) => {
            console.log(payload);
            state.usuarioId = payload
        },
        onFindTicket: (state, { payload = []} ) => {
            state.ticketsID = payload
        },
        onConfirmTicket: (state, { payload = []}) => {
            state.savedTicket = payload
        },
        onUnconfirmTicket: (state, { payload = []}) => {          
            state.deletedTicket = payload
        },
        onFindGanador: (state, { payload = []}) => {          
            state.isW = payload.id
        },
        onFindComprados: (state, { payload = []} ) => {
            state.isLoadingComprados = false;
            state.comprados = [];
            payload.comprados.forEach(el => {
                const exist = state.comprados.some(dbUser => dbUser.numero === el.numero)
                if (!exist) {
                    state.comprados.push(el)
                }
            });
        },
        
        onGettingGanador: (state, { payload = []} ) => {
            
        },
        
        // Limpiar [REGISTRO]
        onClear: (state) => {
            state.savedTicket = initialState.savedTicket;
            state.deletedTicket = initialState.deletedTicket;
        },
        onReset: (state) => {
            state.usuarioId = initialState.usuarioId;
            state.ticketsID = initialState.ticketsID;
        }
        //onReset: (state) => (state = initialState),
    },
});

export const { onFindApartados, onFindUserId, onFindTicket, onConfirmTicket, onUnconfirmTicket, onFindGanador, onFindComprados, onGettingGanador, onClear, onReset } = adminSlice.actions;