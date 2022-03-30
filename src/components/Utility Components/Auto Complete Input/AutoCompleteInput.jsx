import React, { useEffect, useRef, useState } from 'react'
import "./autocompleteinput.css"
import { hash } from "../../../index"

export const AutoCompleteInput = ({ children, position, inputCallback, desired }) => {
  const inputReference = useRef(null)

  const [query, setQuery] = useState(desired ? desired : [])

  useEffect(() => {
    inputReference.current.focus();
  
    return () => {
      
    }
  }, [])

  function updateSearch() {
    const input = inputReference.current.value;
    setQuery(desired ? desired.filter(desire => isSimilar(input, desire) > 0.5) : query)
  }
  

  function sendData(event) {
    if (event.code == 'Enter' || event.type == 'blur') {
      inputCallback(inputReference.current.value);
    }
  }

  return (
    <div className="auto-complete-input" style={position}>
      <input onBlur={sendData} onKeyDown={sendData} onChange={updateSearch} ref={inputReference}/>
      { query.map(desire => <button key={hash(desire)} > {desire} </button>)}
    </div>
  )
}

function isSimilar(input, target) {
  console.log(input, " ", target);
  if (input.length > target.length) {
      return 0;
  }

  let similarityValuePerMatch = 1 / input.length;
  let ranking = 0;
  let inputCharacters = {};
  Array.from(input.toLowerCase()).forEach(char => {
      if (inputCharacters.hasOwnProperty(char)) {
          inputCharacters[char] += 1;
      } else {
          inputCharacters[char] = 1;
      }
  });

  let targetCharacters = {};
  Array.from(target.toLowerCase()).forEach(char => {
      if (targetCharacters.hasOwnProperty(char)) {
          targetCharacters[char] += 1;
      } else {
          targetCharacters[char] = 1;
      }
  });

  console.log(inputCharacters);
  console.log(targetCharacters);

  Object.keys(inputCharacters).forEach(key => {
      if (targetCharacters[key] >= 1 && inputCharacters[key] <= targetCharacters[key]) {
          ranking += similarityValuePerMatch * inputCharacters[key];
      }
  });

  console.log('ranking between ', input, ' and ', target, ': ', ranking);

  return ranking;
}