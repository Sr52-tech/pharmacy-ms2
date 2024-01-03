import React, { createContext } from 'react'
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase-config"
export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: []
    }

    componentDidMount = async () => {
        const prevProducts = this.state.products;
        const q = query(collection(db, 'products'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            prevProducts.push({
                ProductId: doc.data().ProductId,
                ProductName: doc.data().ProductName,
                ProductPrice: doc.data().ProductPrice,
                ProductImage: doc.data().ProductImage,
                Product_quantity: doc.data().Product_quantity,
                Description: doc.data().Description,
                Category: doc.data().Category,
                Prescription: doc.data().Prescription,
            });
        });
        this.setState({
            products: prevProducts
        });
    }

    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}