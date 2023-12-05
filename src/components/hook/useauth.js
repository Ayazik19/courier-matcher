import { useSelector } from "react-redux";

export function useAuth() {
    const { id, displayName, password, token, email, cookie, photoAcc } = useSelector(state => state.user);

    return{
        isAuth: !!email,
        id,
        token,
        displayName,
        password,
        email,
        cookie,
        photoAcc,
    };
}