import React from 'react';
import CustomListGroupItem from 'customListGroupItem'

function SearchList({ filteredScenario }) {
    const filtered = filteredScenario.map((scenario, index) => (
        <CustomListGroupItem valueStatus={scenario} index={index} key={index}/>
      )).sort(order)
    return (
      <div>
        {filtered}
      </div>
    );
  }

export default SearchList;