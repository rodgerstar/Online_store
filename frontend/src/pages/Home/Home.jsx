import React, {useState} from "react";
import './Home.css'
import Header from "../../components/Header/Header.jsx";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import YarnDisplay from "../../components/YarnDisplay/YarnDisplay.jsx";
import AppDownload from "../../components/AppDownload/AppDownload.jsx";

const Home = () => {

        const [category,setCategory] = useState("All")

    return (
        <div>
            <Header/>
            <ExploreMenu category={category} setCategory={setCategory}/>
            <YarnDisplay category={category}/>
            <AppDownload />
        </div>
    )
}

export default Home