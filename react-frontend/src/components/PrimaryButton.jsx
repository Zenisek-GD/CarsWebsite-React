import React from "react";

const PrimaryButton = ({label, onclick, type = "button"}) =>{
    return (
        <button type={type} onClick={onclick} className="bg-blue-700 txt-white font-semibold py-2 px-4 rounded-lg transition duration-200">
            {label}
        </button>
    );
    
}

export default PrimaryButton;