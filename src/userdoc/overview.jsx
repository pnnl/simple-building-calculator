import React from "react"

export default function OverviewPage(){
    return (
        <>
            <p>The <strong>Simple Building Calculator (SBC) </strong> is a tool for small and simple commercial buildings to generate quick and interactive estimates of energy efficiency measures. </p>
            <p>SBC can evaluate whole-building or single measure savings in new or existing buildings, compare measure package choices, or provide simplified performance modeling for energy codes and utility incentives. </p>
            <p>The tool combines physical (annual whole building prototype simulation) and statistical modeling techniques to predict annual energy performance. It supports a variety of building characteristics for envelope, HVAC, and lighting with parameters ranging from vintage to maximum technology (max-tech) configurations, as well as support for single-zone and simple multi-zone HVAC systems. </p>
            <p>The Simple Building Calculator is designed to provide immediate feedback for otherwise computationally intensive tasks like measure comparison, development of multiple measure package combinations, or verification that measures meet efficiency targets—all with the goal of providing a tool for quick annual energy simulation of simple commercial buildings. </p>
            <a href="https://pnnl.github.io/simple-building-calculator">Live deployment of the tool</a>
            <hr></hr>
            <h5>Main features (Video) | Walk through example </h5>
            <hr></hr>
            <h5>Impact</h5>
            <p>The <strong>Simple Building Calculator (SBC)</strong> has several practical applications such as providing a quick energy estimate for interactive savings in simple buildings. While the tool is not intended for precise results, it will compare interactive impact of various measure combinations quickly and allow selection of packages of integrated design options for simple commercial buildings to achieve target levels of energy efficiency compared to a standard baseline design without custom simulation. These savings can be applied to energy codes, utility incentive programs, building rating programs, or advanced design efforts. </p>
            <hr></hr>
            <h5>Cite us</h5>
            <p>Nambiar, Chitra, and Reid Hart. "SIMPLE BUILDING CALCULATOR." In <i>ASHRAE Topical Conference Proceedings</i>, pp. 423-430. American Society of Heating, Refrigeration and Air Conditioning Engineers, Inc., 2020. <a href="/simple-building-calculator/doc/d-bsc20-c051.pdf">Read</a></p>
            <p>Hart, Reid, Chitra Chandrasekharan Nambiar, Jeremiah Williams, and Michael Reiner. "An Energy Calculator for Simple Commercial Buildings." (2020). <a href="/simple-building-calculator/doc/143_0376_0549_000237.pdf">Read</a></p>
            <p>The tool is developed and maintained by the Pacific Northwest National Laboratory (PNNL)</p>
        </>
    )
}