import React from "react"
import { Link } from "react-router-dom"
import Question from "../components/Home/Question"
import Carousel from "../components/Home/Carousel"
import EducationSupportSection from "../components/Home/EducationSupportSection"
import KeyInterventionsSection from "../components/Home/KeyInterventionsSection"

export default function Home() {
    return (
    <div className="home-container">
        <Carousel/>
        <EducationSupportSection/>
        <KeyInterventionsSection/>
        <div className="faq mt-5 w-100 d-flex align-items-center flex-column mb-3 bg-white">
            <h1 className="display-3 text-center">FREQUENTLY ASKED QUESTIONs</h1>
            <Question/>
        </div>
    </div>
    )
};