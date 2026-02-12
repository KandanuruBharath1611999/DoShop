import { ProductContext } from '../context/product_provider';
import { CartContext } from '../context/cart_context';
import { useContext, useState, Fragment } from 'react';

import {useSelector} from 'react-redux';
import {db , auth} from '../firebase/firebase_1';
import { getDoc,doc,setDoc } from 'firebase/firestore';
import './category.css';

const Jackets = () => {
    const { shopData } = useContext(ProductContext);
    const [addCart, setAddCart] = useState("");
    const { setCount, count, dispatch,state} = useContext(CartContext);
    const details = useSelector((state) => state.details)

    const mouseOver = (event) => {
        setAddCart(event);
    };

    const addCartButton =async (obj) => {
        setCount(count + 1);
        const array = [...state];
        let found = false;

        array.forEach((item) => {
            if (item.name === obj.name) {
                found = true;
                item.count += 1;
            }
        });

        if (!found) {
            array.push({ ...obj, count: 1 });
        }
        dispatch({type:"FETCH_CART_DETAILS",cart:array})
        if(auth.currentUser!=null)
        {
                const ref = await doc(db,"users",auth.currentUser.uid);
                const get = await getDoc(ref);
                const info = get.data();
                setDoc(ref,{...details,cart:array})
        }
    };

    const filteredData = shopData ? shopData.filter((map) => map.title === "Jackets") : [];

    return (
        <div className="Navbelow">
            <h2 className="category-heading">Jackets Collection</h2>
            <div className="InnerCon">
                {filteredData.map((category) =>
                    category.items.map((item) => (
                        <div onMouseOver={() => mouseOver(item.imageUrl)} onMouseLeave={()=>{ setAddCart()}} key={item.id} className="shopping-item">
                            <Fragment>
                                <div className="image-container">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="product-image"
                                    />
                                    {addCart === item.imageUrl && (
                                        <div>
                                            <button
                                                className="add-to-cart-button"
                                                onClick={() => addCartButton(item)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="price-and-name">
                                    <h4 className="product-name">{item.name}</h4>
                                    <h4 className="product-price">${item.price}</h4>
                                </div>
                            </Fragment>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Jackets;
