import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardSection from "./Section";
import Header from "./Header";


export default function HomePage() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <div style={{"height": '20px'}}>
                <Header />
            </div>
            <div>
                <CardSection />
            </div>
        </div>
    );
};