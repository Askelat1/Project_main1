import Button from "../components/ui/Button.jsx";
import { useReducer } from 'react'
import Modal from "../components/Modal";
import module from "./Main.module.css"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../app/firebase'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Main = (props) => {
    const [modal, dispatch] = useReducer(reducer, {
        active: false,
        content: 'registration'
        });

    const [user, loading, error] = useAuthState(auth);

    function reducer(state, action) {
        switch (action.type) {
            case 'modal':
                return {
                    ...state,
                    active: action.modal
                };
            case 'content':
                return {
                    ...state,
                    content: action.content
                };
            default:
                return state
        }
    }

    const modalState = {
        props: modal,
        dispatch: dispatch,
    }

    async function openModal(content) {
        await dispatch({type: 'content', content: content})
        await dispatch({type: 'modal', modal: true})
    }

    const signOut = () => {
        auth.signOut();
    };

    if (user) {
        return (
            <div className={module.container_center_flex}>
                Главная страница
                <div>Поздравляю, вы вошли в свой аккаунт {user.displayName}</div>
                <div>Ваша почта: {user.email}</div>
                <div onClick={signOut}>
                    <Button text='Выйти с аккаунта' />
                </div>
            </div>
        )
    } else {(
        <div className="container center-flex">
            Главная страница
            <div>Вам нужно подтвердить почту</div>
            <div onClick={signOut}>
                <Button text='Выйти с аккаунта' />
            </div>
        </div>
    )
        // return (
        //     <div>
        //         <Header />
        //         <div className="container center-flex">
        //             Главная страница
        //             <div onClick={() => openModal('Authorization')}>
        //                 <Button text='Авторизация' />
        //             </div>
        //             <div onClick={() => openModal('Registration')}>
        //                 <Button text='Регистрация' />
        //             </div>
        //             <div>
        //                 <Button text='Восстановление пароля' />
        //             </div>
                    
        //             <Modal modal={modalState}/>
        //         </div>
        //         <Footer />
        //     </div>
            
        // );
    }
};

export default Main;