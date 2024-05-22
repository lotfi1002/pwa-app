import React from "react";
import { isOnline } from "../utilities/CheckOnline";
import Layout from '../components/Layout/Layout';
import { useAuth } from "../hooks/AuthProvider";

export const CloseCaissePage = () => {
    const auth = useAuth(); 
    if(!isOnline()){
        auth.logOut();   
    }

    return (
        <>
        <Layout>
                close register 
        </Layout>
        </>
    )

}
export default CloseCaissePage;
