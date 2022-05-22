import algorithm from '../store/model_coefficients.json';
import {fixed_2} from './dataProcessor';
// may not needed at this development
export function loadAlgorithm(bldg_type, climate_zone) {
    return algorithm[bldg_type][climate_zone]
}

// param is json contains data info from user inputs
// {WWR:0.3, SRR: 0.3...}
export function calculateGen(bldg_type, climate_zone, param, conversion_factor = 1.0){
    let alg_general = algorithm[bldg_type][climate_zone][param['HVAC']['value']]
    if('ELgen' in alg_general){
        return calculateSubTotal(alg_general['ELgen'], param, conversion_factor)
    }
    return 0.0
}

// param is json contains data info from user inputs
// {WWR:0.3, SRR: 0.3...}
export function calculateCool(bldg_type, climate_zone, param, conversion_factor = 1.0){
    let alg_general = algorithm[bldg_type][climate_zone][param['HVAC']['value']]
    if('ELcool' in alg_general){
        return calculateSubTotal(alg_general['ELcool'], param, conversion_factor)
    }
    return 0.0
}

// param is json contains data info from user inputs
// {WWR:0.3, SRR: 0.3...}
export function calculateAux(bldg_type, climate_zone, param, conversion_factor = 1.0){
    let alg_general = algorithm[bldg_type][climate_zone][param['HVAC']['value']]
    //let alg = alg_general['ELaux']
    //let total = 0.0
    // for(const key in alg){
    //     if(key.endsWith('2')){
    //         //if ends with 2, means the parameter is sqaured, e.g UWindow2
    //         let var_name = key.slice(0,-1)
    //         let tempVar = Math.pow(param[var_name],2)*alg[key]
    //         total += tempVar
    //         console.log(key + ": " + param[var_name] + "^2 * " + alg[key] + " = " + tempVar + ";  Total=" + total)
    //     }else if(key.includes('_')){
    //         //in this case, the parameter is times by another paramter, e.g UWindow_UWall
    //         let var_name_array = key.split('_')
    //         let tempVar = param[var_name_array[0]] * param[var_name_array[1]] * alg[key]
    //         total += tempVar
    //         console.log(key +": " + param[var_name_array[0]] + " * " + param[var_name_array[1]] + " * " + alg[key] + " = " + tempVar + ";  Total=" + total)
    //     }else if(key === 'Intercept'){
    //         total += alg[key]
    //         console.log("Intercept: " + alg[key] + ";  Total=" + total)
    //     }else{
    //         let tempVar = param[key] * alg[key]
    //         total += tempVar
    //         console.log(key + ": " +param[key] + " * " + alg[key] + " = " + tempVar + ";  Total=" + total)
    //     }
    // }
    if('ELaux' in alg_general){
         return calculateSubTotal(alg_general['ELaux'], param, conversion_factor)
     }
    return 0.0
}

// param is json contains data info from user inputs
// {WWR:0.3, SRR: 0.3...}
export function calculateNGHeat(bldg_type, climate_zone, param, conversion_factor = 1.0){
    let alg_general = algorithm[bldg_type][climate_zone][param['HVAC']['value']]
    if('NGheat' in alg_general){
        return calculateSubTotal(alg_general['NGheat'], param, conversion_factor)
    }
    return 0.0
}

// param is json contains data info from user inputs
// {WWR:0.3, SRR: 0.3...}
export function calculateELHeat(bldg_type, climate_zone, param, conversion_factor = 1.0){
    let alg_general = algorithm[bldg_type][climate_zone][param['HVAC']['value']]
    if('ELheat' in alg_general){
        return calculateSubTotal(alg_general['ELheat'], param, conversion_factor)
    }
    return 0.0
}

// helper function to calculate the total consumption for an end user
function calculateSubTotal(alg, param, conversion_factor){
    let total = 0.0
    //console.log('----------')
    //console.log(param)
    //console.log(alg)

    // Loop for each feature column in model
    for(const key in alg){
        // Initialize the value for the current feature
        let feature_value = 0.0
        let coefficient_value = alg[key]
        if(key !== 'Intercept'){    
            // Split interactive features using the hyphen e.g UWindow_UWall
            if(key.includes('_')){
               
                let var_name_array = key.split('_')
                feature_value = param[var_name_array[0]] * param[var_name_array[1]]
            } else {
                feature_value = param[key]
            }

            // Handle feature columns that are squared e.g., UWall2
            if(key.endsWith('2')){
                //if ends with 2, means the parameter is squared, e.g UWindow2
                let var_name = key.slice(0,-1)
                feature_value = Math.pow(param[var_name],2)
            }

            total += coefficient_value*feature_value

        } else {
            total += coefficient_value
        }
    }
    //temperary fix for negative values.
    if(total < 0){
        total = 0.0
    }

    return fixed_2(total * conversion_factor)
}
