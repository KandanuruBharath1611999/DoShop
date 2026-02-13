import { createContext, useEffect, useState } from 'react';
import {db} from '../firebase/firebase_1'
import { collection,writeBatch,doc,getDocs, query} from 'firebase/firestore';
import {SHOP_DATA} from './shop-data';

export const ProductContext = createContext(null);
/*export const pushDb = async () =>
{
    const res = collection(db,"categories");
    const batch = writeBatch(db);
    SHOP_DATA.forEach((map)=>
    {
        const ref = doc(res,map.title);
        batch.set(ref,map)
    })
    await batch.commit();
    
}*/


export const pulldb = async () =>
{
    const collectionsRef = collection(db,"categories");
    const q = query(collectionsRef);
    const pr = await getDocs(q);
    const tot = pr.docs.map((mp)=>
    {
        return(
        mp.data())
    })

    tot.forEach((category) => {
        if (category.items) {
            category.items.sort((a, b) => b.price - a.price);
        }
    });

    return tot
}

export const ProductWrap = ({children}) =>
{
    
    const [shopData,setShopData] = useState(null);
    useEffect(() =>
    {
        const fetchData = async () => {
            const fetchedItems = await pulldb();  
            setShopData(fetchedItems);
        };

        fetchData(); 
    }, []);
    return (<ProductContext.Provider value={{shopData,setShopData}} >{children}</ProductContext.Provider>)
}
