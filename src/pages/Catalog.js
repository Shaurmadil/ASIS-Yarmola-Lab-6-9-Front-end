import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useCompanies from "../hooks/useCompanies";
import { PuffLoader } from "react-spinners";
import useCompaniesStore from "../store/companiesStore";
import useBasketStore from "../store/basketStore";
import SearchBar from "../components/SearchBar";

function Catalog() {
    const basket = useBasketStore((state) => state.basket);
    const companies = useCompaniesStore((state) => state.companies);
    const addProduct = useBasketStore((state) => state.addProduct);
    const removeProduct = useBasketStore((state) => state.removeProduct);
    const inCart = useBasketStore((state) => state.inCart);

    const setCompanies = useCompaniesStore((state) => state.setCompanies);

    const getCompanies = useCompanies();

    useEffect(() => {
        if (getCompanies.data) {
            setCompanies(getCompanies.data);
        }
    }, [getCompanies.data]);

    const allProducts = companies.map((pr) => {
        const btn = inCart(pr.id) ? (
            <button
                className="product__del"
                onClick={() => {
                    removeProduct(pr.id);
                }}
            >
                Видалити з кошика
            </button>
        ) : (
            <button
                className="product__add"
                onClick={() => {
                    addProduct(pr);
                }}
            >
                Купити
            </button>
        );
        return (
            <li key={pr.id} className="product__elem">
                <Link to={"/product/" + pr.id}>
                    <div className="product__elem__top">
                        <div className="product__name">{pr.name}</div>
                        <LazyLoadImage
                            className="product__img"
                            src={pr.photo}
                            placeholderSrc={pr.photo}
                            effect="blur"
                            draggable="false"
                        />
                    </div>
                </Link>
                <div className="product__elem__footer">
                    <p>{pr.price} $</p>
                    {btn}
                </div>
            </li>
        );
    });

    return (
        <div className="products _container">
            <SearchBar />
            <div className={"flex"}>
                {getCompanies.isLoading ? (
                    <div className="_container catalog__loading">
                        <PuffLoader
                            size={"350px"}
                            cssOverride={{ marginTop: "150px" }}
                        />
                    </div>
                ) : (
                    <ul className="products__list">{allProducts}</ul>
                )}
            </div>
        </div>
    );
}

export default Catalog;
