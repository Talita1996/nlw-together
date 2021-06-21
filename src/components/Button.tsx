import { useState } from "react";

type ButtonProps = {
    text?: string; // A interrogação significa que a propriedade é opcional
    children?: string; // Única propriedade do React que não podemos dar nome
}

export function Button( props: ButtonProps ) {
    //let counter = 0;
    let [counter, setCounter] = useState(0)

    function increment() {
        setCounter(counter + 1);
    }
    return(
        <button onClick={increment}>
            { counter }
        </button>
    )
}