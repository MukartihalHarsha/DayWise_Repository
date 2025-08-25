import React, { useRef } from 'react'

const UnController = () => {

    const selectRef=useRef(null)
    const checkboxRef=useRef(null)
    const inputRef=useRef(null)

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("Input value: ",inputRef.current.value)
        console.log("Select value: ",selectRef.current.value)
        console.log("CheckBox value",checkboxRef.current.value)
    }

  return (
    <div>
        <h2>UnControlled Form Components - Managing the State through DOM elements</h2>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Name:</p>
                <input ref={inputRef} type="text"/>
 
            </label>

            <label>
                <p>Favorite color:</p>
                <select ref={selectRef}>
                    <option value="red">Red</option>
                                        <option value="green">Green</option>
                    <option value="blue">Blue</option>

                </select>
            </label>


            <label>
                Do you like React?
                <input type="checkbox" ref={checkboxRef}/>
            </label>

            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default UnController