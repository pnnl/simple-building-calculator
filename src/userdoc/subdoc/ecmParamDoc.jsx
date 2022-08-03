import { MathJaxContext, MathJax } from "better-react-mathjax";
import React from "react";

function Formula(props){
    const texStr = "\\(" + props.tex + "\\)"
    return(
        <MathJaxContext>
            <MathJax inline>{texStr}</MathJax>
        </MathJaxContext>
    )
}

export default function ECMParamDoc(){
    return (
        <>
            <p>ECM list and parameters include:</p>
            <ul>
                <li>
                    <strong>Window to wall ratio (WWR): </strong>The ratio of total vertical fenestration (window) to wall area.
                    <dd>- <Formula tex={"WWR = \\frac{\\text{total window area}}{\\text{total wall area}}"}></Formula></dd>
                </li>
                <li>
                    <strong>Skylight to rool ratio (SRR): </strong>The ratio of total skylight area to roof area.
                    <dd>- <Formula tex={"SRR = \\frac{\\text{total skylight area}}{\\text{total roof area}}"}></Formula></dd>
                </li>
                <li>
                    <strong>Floor F-factor (Btu/h-ft-F): </strong>The F-factor of an unheated slab-on-grade floor.
                </li>
                <li>
                    <strong>Wall U-factor (Btu/h-ft2-F): </strong>The U-factor of a wall assembly.
                </li>
                <li>
                    <strong>Window U-factor (Btu/h-ft2-F): </strong>The U-factor of a window assembly.
                </li>
                <li>
                    <strong>Window SHGC: </strong>The solar heat gain coefficient of a window assembly.
                </li>
                <li>
                    <strong>Envelope leakage (cfm/ft2@75pa): </strong>The air leakage through the exterior envelope assembly in cfm/square foot @ 75 pascals and includes leakage through above and below grade building envelope. The air leakage rates are adjusted for standard wind conditions as described in ????.
                </li>
                <li>
                    <strong>Roof U-factor (Btu/h-ft2-F): </strong>The U-factor of the roof assembly.
                </li>
                <li>
                    <strong>Daylight control fraction (%): </strong>The ratio of the floor area with daylight-controlled lights that dim in response to daylight availability in the space to the total floor area.
                    <dd>- <Formula tex={"\\text{daylight control fraction} = \\frac{\\text{total floor area with daylight controlled lights}}{\\text{total floor area}}"}></Formula></dd>
                </li>
                <li>
                    <strong>Occupancy control fraction (%): </strong>The ratio of floor area with occupancy sensor-controlled lights to the total floor area.
                    <dd>- <Formula tex={"\\text{occupancy control fraction} = \\frac{\\text{total floor area with occupancy sensor controlled lights}}{\\text{total floor area}}"}></Formula></dd>
                </li>
                <li>
                    <strong>Plug load control fraction (%): </strong>The ratio of all 125 volt 15- and 20-ampere receptacles that can turn the receptacle power off during unoccupied hours or when no occupants have been detected for more than 20 minutes to that of total receptacle power.
                    <dd>- <Formula tex={"\\text{plug load control fraction} = \\frac{\\text{total controlled receptacle power}}{\\text{total receptacle power}}"}></Formula></dd>
                </li>
                <li>
                    <strong>Lighting power density (W/ft2): </strong>The ratio of the total lighting power to the total floor area.
                    <dd>- <Formula tex={"\\text{lighting power density} = \\frac{\\text{total lighting power}}{\\text{total floor area}}"}></Formula></dd>
                </li>
                <li>
                    <strong>Fan power (W/cfm): </strong>The total fan power in Watts/cfm calculated as:
                    <dd>- <Formula tex={"\\text{Fan power} = \\frac{\\text{Fan total efficiency} * \\text{Fan static pressure} * 6356}{746}"}></Formula></dd>
                    <dd>- <Formula tex={"\\text{Fan total efficiency} = \\text{Fan motor efficiency} + \\text{Fan mechanical efficiency}"}></Formula></dd>
                </li>
                <li>
                    <strong>Fan extra hours (hr): </strong>The additional hours the fan and outside air dampers are on for warmup or after regularly occupied hours.
                </li>
                <li>
                    <strong>Fan control: </strong>The minimum fan turn- down for variable airflow rate.
                </li>
                <li>
                    <strong>Heating thermal efficiency: </strong>The thermal efficiency of the space heating equipment.
                </li>
                <li>
                    <strong>Cooling COP: </strong>The efficiency of the space cooling equipment.
                </li>
                <li>
                    <strong>Economizer temperature limit setpoint or lockout temperature (F): </strong>The maximum dry bulb temperature (Fahrenheit) limit of a fixed dry bulb economizer.
                </li>
                <li>
                    <strong>Outside air (OA) annual fraction: </strong>The average annual percentage of design outside air per requirements of ASHRAE 62.1 when the space is occupied.
                </li>
                <li>
                    <strong>ERV Enthalpy effectiveness ratio: </strong>The effectiveness of the energy recovery equipment. 
                </li>
            </ul>
        </>
    )
}