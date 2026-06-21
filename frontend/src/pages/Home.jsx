import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import {Increase, Decrease} from "../features/count/countSlice";
import Hero from "../components/home/Hero";
import SearchServices from "../components/home/SearchServices";
import Categories from "../components/home/Categories";
import WhyChoose from "../components/home/WhyChoose";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";

function Home() {
    const count = useSelector((state) => state.count.count);
    const dispatch = useDispatch();
    return (
        <main>
            <Hero />
            <SearchServices />
            <Categories />
            <WhyChoose />
            <HowItWorks />
            <Testimonials />
            <CallToAction />
        </main>
    )
}

export default Home