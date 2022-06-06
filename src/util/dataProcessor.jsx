import data from "../store/data_setting.json";

export function convert_num_to_percent(num){
  return parseFloat(num).toFixed(1)+"%"
}

export function format_num_to_string(num){
  return num.toLocaleString('en-US', {minimumFractionDigits: 2})
}

export function getSelectedScenarioInfo(scenarioList, selection){
  //get the scenario from a scenario list based on the selection {"value": "value", "label": "label"}
  let selectedScenario = scenarioList.filter(scenario => scenario["id"] === selection["value"])[0]
  return selectedScenario
}

export function getDefaultRates(rate){
  //get the utility metric rates
  return data["rates"][rate]
}

export function getConversionFactor(fromUnit, toUnit){
  //get the conversion factor for a unit
  return data["unit_conversion"][fromUnit][toUnit]
}

export function getProjectBaselineScenario(scenarioList){
  //get the baseline scenario of the project - baseline
  let selectedScenario = scenarioList.filter(scenario => scenario["id"] === "baseline")[0]
  return selectedScenario
}

export function getProjectMaxTechScenario(scenarioList){
    //get the max tech scenario of the project - max_tech
    let selectedScenario = scenarioList.filter(scenario => scenario["id"] === "max_tech")[0]
    return selectedScenario
}

export function convert_scenario_list_to_option_list(scenario_list, fullExport = true){
  let case_list = scenario_list.cases
  if(fullExport){
    let option_list = case_list.filter(scenario => scenario["status"] === "active" 
    || scenario["id"] === "baseline" 
    || scenario["id"] === "max_tech").map(function(scenario){
      return {"value": scenario["id"], "label": scenario["name"]}
    })
    return option_list
  }else{
    let option_list = case_list.filter(scenario => scenario["status"] === "active" ).map(function(scenario){
      return {"value": scenario["id"], "label": scenario["name"]}
    })
    return option_list
  }

}

export function fixed_2(num){
  return Math.round(num * 100) / 100;
}

export function getAnalysisTypeUnit(analysisType){
  return data['analysis_type'][analysisType]['unit']
}

export function getData(key, bldgType, climateZone){
  return extractKeyValuePair(key, bldgType, climateZone)
}

//this function retrieve the standard options
export function getStandardData(bldgType, climateZone) {
  return extractKeyValuePair('standard', bldgType, climateZone)
}

//this function retrieve the hvac options
export function getHVACData(bldgType, climateZone){
  return extractKeyValuePair('hvac', bldgType, climateZone)
}

export function getBuildingTypeData(){
  return extractKeyValuePair('bldgType')
}

export function getClimateZoneData(){
  return extractKeyValuePair('climate')
}

export function getParameterMetaData(){
  return data['meta']
}

export function getAnalysisType(){
  return extractKeyValuePair('analysis_type')
}

export function getProjectBaseline(buildingType, climateZone){
  let  defaultData = data['project_baseline'][buildingType['value']][climateZone['value']]
  return defaultData
}

export function getProjectMaxTech(buildingType, climateZone){
  let  defaultData = data['project_max_tech'][buildingType['value']][climateZone['value']]
  return defaultData
}

export function getProjectWorstCase(buildingType, climateZone){
  let defaultData = data['project_worst_case'][buildingType['value']][climateZone['value']]
  return defaultData
}

export function getValuesByKeys(keys, scenario){
  let keyValues = []
  for(let i=0; i<keys.length; i++){
    keyValues.push(scenario[keys[i]])
  }
  return keyValues
}

export function getListOfParametersExceptionHVACAndStandard(){
  let meta = data['meta']
  let parameterList = Object.keys(meta)
  return parameterList.filter(parameter => parameter !== "HVAC" && parameter !== "standard")
}

//this function retrieve the default data from a standard
export function getDefaultDataForStandard(value, buildingType, climateZone) {
  //todo though unlikely, need a check in case we cannot find the default data
  let defaultData = data["standard"][buildingType['value']][climateZone['value']][value]["data"];
  return defaultData;
}

// function to create a base plot bar table chart
export function makeBasePlotData(value){
  let x = ["Electricity-General", "Electricity-Auxiliary", "Electricity-Cooling", "Electricity-Heating","Natural Gas-Heating"]
  let y = []
  y.push(value["Electricity-General"])
  y.push(value["Electricity-Auxiliary"])
  y.push(value["Electricity-Cooling"])
  y.push(value["Electricity-Heating"])
  y.push(value["Natural Gas-Heating"])
  return {"base": {x: x, y: y, "name": value["name"], "type": "bar"}}
}

//this function retrieve the default data of a parameter from a standard
export function getDefaultParamDataForStandard(value, buildingType, climateZone, param) {
  //todo though unlikely, need a check in case we cannot find the default data
  let defaultData = data["standard"][buildingType['value']][climateZone['value']][value]["data"][param];
  return defaultData;
}

//this function prepares the tableData
//tableData should be scenarioList
export function makeResponsibleTableData(tableData, floorArea){
  let baseCase = 37.26 //TODO kBtu/sqft - temperary solution
  let tableDataArray = tableData['cases']
  let tableData2DArray = createArray(4, tableDataArray.length) //need to add a row for title (4)
  tableDataArray.forEach(function(scenario, i){
    tableData2DArray[0][i] = scenario['name']
    tableData2DArray[1][i] = format_num_to_string(fixed_2(scenario['eui'] * floorArea))
    tableData2DArray[2][i] = scenario['eui']
    tableData2DArray[3][i] = convert_num_to_percent((baseCase - scenario['eui']) / baseCase * 100)
  })
  return tableData2DArray
}

//this function calculates the savings and saving percentage comparing 
//the base and design models
export function makeTableData(tableData){
  //return table data
  let baseObj = tableData['base']
  let designObj = tableData['design']
  let savingObj = tableData['savings']
  let savingPerObj = tableData['savePercent']

  //set up total value
  baseObj['total'] = 0.0
  designObj['total'] = 0.0
  savingObj['total'] = 0.0
  savingPerObj['total'] = 0.0

  for(let key in savingObj){
    if(key !== 'rowName' && key !== 'total'){
      savingObj[key] = fixed_2(baseObj[key]- designObj[key])
      //round to 1 decimal point
      savingPerObj[key] = fixed_2((baseObj[key] - designObj[key]) / baseObj[key])

      //add total
      baseObj['total'] += baseObj[key]
      designObj['total'] += designObj[key]
    }
  }

  savingObj['total'] = fixed_2(baseObj['total']- designObj['total'])
  savingPerObj['total'] = fixed_2((baseObj['total'] - designObj['total']) / baseObj['total'])
  baseObj['total'] = fixed_2(baseObj['total'])
  designObj['total'] = fixed_2(designObj['total'])
}

//This function makes a default table header
//Do not change the table content. 
export function makeTableColumn(){
  const columns = [
    {
      Header: '',
      accessor: 'rowName',
    },
    {
      Header: 'Electricity',
      columns: [
        {
          Header: 'General',
          accessor: 'Electricity-General'
        },
        {
          Header: 'Auxiliary',
          accessor: 'Electricity-Auxiliary',
        },
        {
          Header: 'Space Cooling',
          accessor: 'Electricity-Cooling',
        },
        {
          Header: 'Space Heating',
          accessor: 'Electricity-Heating',
        },
      ],
    },
    {
      Header: 'Natural Gas',
      columns: [
        // {
        //   Header: 'Service Water Heating',
        //   accessor: 'Natural Gas-SWH'
        // },
        {
          Header: 'Space Heating',
          accessor: 'Natural Gas-Heating'
        }
      ]
    },
    {
      Header: 'Total',
      columns:[
        {
          Header: '',
          accessor:'total'
        }
      ]
    },
  ]
  return columns
}

export function checkCaseName(targetName, data, scenarioID){
  /*
  function checks whether the name in the row is unique in the database.
  It will return the name in a string for the row.
  If the name is not unique, then add a 'copy' to the name to turn it into unique name

  data shall be an array of hash
  row shall be a hash
  */

  //if target name and id matches to the existing scenario, return the targetName
  for(var i=0; i<data.length; i++){
      if(data[i]['name'] === targetName && data[i]['id'] === scenarioID){
          return targetName
      }
  }

  let listOfNames = data.map(r => r['name'])
  return checkCaseNameHelper(targetName, listOfNames)
}

// combine the scenario_list and scenarios and convert the data into a csv format
export function downloadDesignScenarioToLocal(scenario_list, scenarios){
  let scenario_list_cases = scenario_list.cases
  //clean up
  const result = []
  let id
  let sys
  for (id in scenario_list_cases){
    let caseResult = {}
    let scenario_case = scenario_list_cases[id]
    for(sys in scenario_case){
      if(sys === "id"){
        //get the scenario data
        let scenario = scenarios[scenario_case[sys]]
        let sId
        for(sId in scenario){
          if(sId === "HVAC"){
            caseResult[sId] = scenario[sId]["label"]
          } else if(sId==="standard"){
            //skip, do nothing
          } else{
            caseResult[sId] = scenario[sId]
          }
        }
      }else{
        caseResult[sys]=scenario_case[sys]
      }
    }
    result.push(caseResult)
  }

  const replacer = (key, value) => value === null? '': value 
  const header = Object.keys(result[0])
  const csv = [
    header.join(","), //header row first
    ...result.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n')

  return csv
}

//local storage related functions
export function downloadDataFromLocal(){
  let dataStorage = {}
  Object.keys(localStorage).forEach(function(key){
    dataStorage[key] = JSON.parse(localStorage.getItem(key))
  })
  return dataStorage
}

//get Electric conversion factor by analysis type
//requires conversion rate and floor area to perform the analysis
export function getElectricConversionFactor(analysisType, floorArea, sourceToSiteRate, electricToCarbonRate, electricityRate){
  let tempElectricFactor = 1.0
  //need to update the base case.
  if(analysisType === 'source_eui'){
    tempElectricFactor = sourceToSiteRate
  }else if(analysisType === 'site_energy'){
    tempElectricFactor = floorArea
  }else if(analysisType === 'source_energy'){
    tempElectricFactor = floorArea * sourceToSiteRate
  }else if(analysisType === 'carbon_emission'){
    tempElectricFactor = electricToCarbonRate
  }else if(analysisType === 'utility_cost'){
    tempElectricFactor = electricityRate
    tempElectricFactor = 1.0
  }
  return tempElectricFactor
}

export function getNatGasConversionFactor(analysisType, floorArea, sourceToSiteRate, natGasToCarbonRate, natGasRate){
  let tempNatGasFactor = 1.0

  //need to update the base case.
  if(analysisType === 'source_eui'){
    tempNatGasFactor = sourceToSiteRate
  }else if(analysisType === 'site_energy'){
    tempNatGasFactor = floorArea
  }else if(analysisType === 'source_energy'){
    tempNatGasFactor = floorArea * sourceToSiteRate
  }else if(analysisType === 'carbon_emission'){
    tempNatGasFactor = natGasToCarbonRate
  }else if(analysisType === 'utility_cost'){
    tempNatGasFactor = natGasRate
  }else{
    tempNatGasFactor = 1.0
  }
  return tempNatGasFactor
}

//HELPER REACT FUNCTIONS
// extract key value pair data (options) from the database
function extractKeyValuePair(dataKey, bldgType=null, climateZone=null){
  let dataObj = data[dataKey]
  let dataArray = []

  //standard will need to identify the bldgeType and climate zone
  if(dataKey === 'standard'){
    dataObj = dataObj[bldgType['value']][climateZone['value']]
  }

  for (const key in dataObj){
    if(dataKey === 'hvac'){
      if (dataObj[key]['climate_zone'].includes(climateZone['value']) && dataObj[key]['bldg_type'].includes(bldgType['value'])){
        dataArray.push({"value": key, "label": dataObj[key]['label']})
      }
    }else{
      dataArray.push({"value": key, "label": dataObj[key]['label']})
    }
  }
  return dataArray
}

//Create dimensional arrays
function createArray(length) {
  var arr = new Array(length || 0),
      i = length;

  if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

// unique name check
function checkCaseNameHelper(caseName, listOfNames){
  let unique = true
  for(let i=0; i<listOfNames.length; i++){
      if(caseName === listOfNames[i]){
          unique = false
      }
  }
  if(unique){
      return caseName
  }else{
      caseName = caseName + ' copy'
      return checkCaseNameHelper(caseName, listOfNames)
  }
}