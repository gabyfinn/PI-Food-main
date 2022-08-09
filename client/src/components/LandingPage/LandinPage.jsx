import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';



const LandingPage = () => {

    return (
        <div id="showcase">
            <Link to={'/recipes/'}>
                <div className="container">
                    <h1>Welcome to the Food App</h1>
                    <p>Created by Gabyfinn</p>

                    <p className="button">Enter</p>

                </div>
            </Link>
        </div>
    )

}

export default LandingPage;