import {useEffect, useState} from "react";

export const HomePage = () => {

    const [isLogin, setLogin] = useState(false);


    useEffect(()=>{
        console.log(`Home page ${isLogin}`);
    },[isLogin]);

    return (
        <>
            <div className="text-2xl font-bold text-black">🏠 Home Page</div>

            <button
                className={"bg-amber-300 hover:bg-amber-100 p-2"}
                onClick={() => setLogin(!isLogin)}
            >
                {isLogin ? 'login' : 'register'}
            </button>


            {isLogin && (
            <div className="text-xl font-bold text-black">Hello</div>
            )}

        </>
    );
};