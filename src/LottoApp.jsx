import { BrowserRouter } from "react-router-dom"
import { AppRouer } from "./router/AppRouer"
import { Provider } from "react-redux"
import { store } from "./store/store"

export const LottoApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouer/>
            </BrowserRouter>
        </Provider>
)}