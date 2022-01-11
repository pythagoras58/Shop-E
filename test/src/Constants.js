import React from "react";

export const lacalhost = "http://127.0.0.1:8000";
export const api = "/api";
export const endpoint = `${lacalhost}${api}`;

export const productListUrl = `${endpoint}/product-list/`;
export const productDetailUrl = (id) => `${endpoint}/product/${id}`;
export const addToCartUrl = `${endpoint}/add-to-cart/`;
