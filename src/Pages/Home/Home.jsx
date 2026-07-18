import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Category from '../../Components/categories/category';
import BestSellingProducts from '../../Components/BestSelling/BestSellingProducts';
import NewArrival from '../../Components/NewAraival/NewAraival';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <BestSellingProducts></BestSellingProducts>
            <NewArrival></NewArrival>
        </div>
    );
};

export default Home;