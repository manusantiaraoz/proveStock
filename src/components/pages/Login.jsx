import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { loginApi } from '../../helpers/auth';

const Login = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const logger = await loggerUser(data);
            alert(logger)
        } catch (error) {
            console.error("Error en onSubmit:", error);
        }
    };

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    const loggerUser = async (info) => {
        try {
            const repuesta = await loginApi(info);
            const { user, token } = repuesta;
            console.log(`datos de la funcion ${user} y ${token}`); 

            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('accessToken', token.accessToken);
            return { message: 'usuario logeado' };
        } catch (e) {
            console.error("Error en loggerUser:", e); 
            alert("Error al iniciar sesión. Verifica tus credenciales.");
            throw e; 
        }
    };

    return (
        <div className="containter w-75">
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
                <input placeholder="example@gmail.com" className='input-group-text'  {...register("email", { required: true })} />
                {errors.email && <span>campo obligatorio</span>}
                <input placeholder="*******" type="password" className='input-group-text ' {...register("password", { required: true })} />
                {errors.password && <span>campo obligatorio</span>}
                <input className="btn btn-outline-secondary" type="submit" />
            </form>
            <div></div>
        </div>
    );
};

export default Login;