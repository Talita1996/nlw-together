import { ButtonHTMLAttributes } from "react"; // Importa todos os atributos que o button do HTML pode receber
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { // Tipagem do elemento do botão entre <>
    isOutlined?:boolean
};

export function Button( { isOutlined = false, ...props }: ButtonProps ) {
    return(
        <button 
            className={ `button ${isOutlined ? 'outlined' : '' }`}
            {...props}  // Spread operator
        />
    )
}