import { useDispatch, useSelector } from "react-redux";
import lottoApi from "../api/casaJalisoApi";
import { onAddRegister, onLoadEvents, onLoadusers, onFindBoletos, onFindUserId, onReset, onFindTicket, onFindApartados } from "../store/lotto/lottoSlice";

export const useLottoStore = () => {
    
    const { boletos, usuarios, isLoadingEvents, activeEvent, registro, boletos_usuarios, usuarioId, ticketsID, apartados } = useSelector(state => state.lotto);
    const dispatch = useDispatch();

    const startSavingBoletos = async(formValues) => {
        try {
            const data = await lottoApi.post('/lotto/boletaje', formValues);
            dispatch(onAddRegister({apartados: data.data.isApartados, no_apartados: data.data.noApartados}));
            return data.data;
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startLoadingBoletos = async() => {
        try {
            const data = await lottoApi.get('/lotto/boletos?q=20');
            // const data = await lottoApi.get('/lotto/boletos');
            dispatch(onLoadEvents(data.data.boletos));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingUsers = async() => {
        try {
            const data = await lottoApi.get('/lotto/usuarios');
            dispatch(onLoadusers(data.data.usuario));
        } catch (error) {
            console.log(error);
        }
    }

    const startFindBoletos = async(number) => {

        try {
            const data = await lottoApi.post('/lotto/find', number);
            console.log(data);
            dispatch(onFindBoletos(data.data));
            return data.data;
        } catch (error) {
            console.log(error);
        }
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

    const startResetState = () => {
        dispatch(onReset());
    }
    
    return {
        // Propiedades
        activeEvent,
        boletos,
        usuarios,
        isLoadingEvents,
        registro,
        boletos_usuarios,
        usuarioId,
        ticketsID,
        apartados,

        //Metodos
        startLoadingBoletos,
        startSavingBoletos,
        startLoadingUsers,
        startFindBoletos,
        startFindUserById,
        startFindByTicked,
        startResetState,
        startFindApartados,
    }
}