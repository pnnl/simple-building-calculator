import React from "react";

export default function EndUseDoc(){

    return(
        <>
            <ul>
                <li><strong>ELheat: </strong>Electricity consumption for heating related HVAC equipment (electric resistance heaters, electric reheat coils, humidification).</li>
                <li><strong>ELcool: </strong>Electricity consumption for cooling related HVAC equipment (chillers, DX cooling equipment, heat rejection).</li>
                <li><strong>ELgen: </strong>Electricity consumption for general building systems (interior lighting, exterior lighting, interior equipment, exterior equipment, refrigeration, generators).</li>
                <li><strong>ELaux: </strong>Electricity consumption for auxiliary HVAC equipment (fans, pumps, heat recovery).</li>
                <li><strong>NGheat: </strong>Natural gas consumption for heating related HVAC equipment (boilers, furnaces).</li>
            </ul>
        </>
    )
}
