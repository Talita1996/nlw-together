import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode'
import '../styles/room.scss';
import { useParams } from 'react-router';
import { useRoom } from '../hooks/useRoom';
import { Question } from '../components/Question';
import { database } from '../services/firebase';
import { useHistory } from 'react-router-dom';


type RoomParams = {
    id: string;
}

export function AdminRoom () {

    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if ( window.confirm('Tem certeza que deseja excluir essa pergunta?') ) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={ logoImg } alt="Letmeask" />
                    <div>
                        <RoomCode code={ roomId }/>
                        <Button isOutlined onClick={ handleEndRoom }>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala { title }</h1>
                    { questions.length > 0 && <span>{ questions.length } pergunta(s)</span>}
                </div>

                <div className="question-list">
                    { questions.map( question => { /* A diferença entre o map e o foreach é que o map permite que se retorne algo dentro dele */
                        return (
                            <Question 
                                key = { question.id } // O react exige uma key unica para cada elemento dentro de uma estrutura que está sendo percorrida. O nome disso é algoritmo de reconciliação
                                content = { question.content }
                                author = { question.author }
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={ deleteImg } />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}