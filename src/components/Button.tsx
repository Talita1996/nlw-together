import { ButtonHTMLAttributes } from "react"; // Importa todos os atributos que o button do HTML pode receber
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; // Tipagem do elemento do botão entre <>

export function Button( props: ButtonProps ) {
    return(
        <button className="button" {...props} /> // Spread operator
    )
}