import { useDispatch, useSelector } from "react-redux";
import lottoApi from "../api/casaJalisoApi";
import { onFindComprados, onUnconfirmTicket, onConfirmTicket, onFindApartados, onFindTicket, onFindUserId, onReset, onClear } from "../store/admin/adminSlice";

export const useAdminStore = () => {

    const { apartados, usuarioId, ticketsID, savedTicket, deletedTicket, comprados } = useSelector(state => state.admin);

    const dispatch = useDispatch();

    const startFindApartados = async() => {
        try {
            const data = await lottoApi.get('/admin/selected');
            dispatch(onFindApartados(data.data));
            return data.data;
        } catch (error) {
            console.log(error);
            return error
        }
    }
    
    const updateFindApartados = (data) => {
        dispatch(onFindApartados(data));
        return data;
    }

    const startFindUserById = async(ticket) => {
        try {
            const data = await lottoApi.post('/admin/findbyuser', ticket);
            dispatch(onFindUserId(data.data));
            return data.data;
        } catch (error) {
            console.log(error);
            return error
        }
    }

    const startUpdateUserById = (data) => {
        dispatch(onFindUserId(data));
        return data;
    }

    const startFindByTicked = async(ticket) => {
        try {
            const data = await lottoApi.post('/admin/findbyticket', ticket);
            dispatch(onFindTicket(data.data));
            return data.data;
        } catch (error) {
            console.log(error);
            return error
        }
    }

    const startSavingConfirmed = async(ticket) => {              
        try {
            const data = await lottoApi.post('/admin/compra', ticket);  //!!!!!!!!!!!!!
            console.log(data.data);
            dispatch(onConfirmTicket(data.data));
            return data.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const startDeleteUnconfirmed = async(ticket) => {
        try {
            const data = await lottoApi.post('/admin/borrar', ticket);
            dispatch(onUnconfirmTicket(data.data));
            return data.data;
        } catch (error) {
            console.log(error);
            return error;        
        }
    }

    const startFindComprados = async() => {
        try {
            const data = await lottoApi.get('/admin/buyed');
            dispatch(onFindComprados(data.data));
            return data.data;
        } catch (error) {
            console.log(error);
            return error
        }
    }

    const startResetState = () => {
        dispatch(onReset());
    }

    const resetSD = () => {
        dispatch(onClear());
    }
    
    return {
        // Propiedades
        apartados,
        usuarioId,
        ticketsID,
        savedTicket,
        deletedTicket,
        comprados,
        onReset,
        onClear,
        

        //Metodos
        startFindApartados,
        startFindUserById,
        startFindByTicked,
        startSavingConfirmed,
        startDeleteUnconfirmed,
        startFindComprados,

        updateFindApartados,
        startUpdateUserById,

        resetSD,
        startResetState,
    }
} 