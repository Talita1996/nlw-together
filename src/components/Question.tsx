import '../styles/question.scss';
import { ReactNode } from 'react';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
}

export function Question({
    content,
    author, // Desestruturação do type para pegar somente as informações que serão necessárias
    children,
}: QuestionProps) {
    return (
        <div className="question">
            <p>{ content }</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    { children }
                </div>
            </footer>
        </div>
    );
}