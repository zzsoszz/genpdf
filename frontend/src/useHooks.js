import {useEffect, useState} from "react";
function useFetchData(...params) {
    var [data, setData] = useState(null);
    useEffect(() => {
        (async function() {
            try {
                var response = await fetch(...params);
                if (response.ok) {
                    var json = await response.json();
                    setData(json);
                }
            } catch (e) {

            }
        })();
      }
    , []);
    return data;
}


function useFormInput(initValue) {
    var [value, setValue] = useState(initValue);
    var onChange = e => {
        setValue(e.target.value);
    };
    return { value, onChange };
}

export {
    useFetchData,
    useFormInput
}




// async function () {
//     try {
//         var response = await fetch(...params);
//         if (response.ok) {
//             var json = await response.json();
//             setData(json);
//         }
//     } catch (e) {
//
//     }
// }


// url, {
//     method: "POST",
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//     },
//     body: body ? JSON.stringify(body) : ""
// }
