import styled from 'styled-components';

export const HeaderContainerAll = styled.header`
    width: 100%;
    height: 80px;
    background: #FFFFFF;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media (max-width: 768px) {
        height: 60px; // Ajusta a altura para telas menores
    }
`;

export const BoxAdd = styled.div<{ return: boolean }>`
    width: ${props => (props.return ? `92%` : `100%`)};
    height: 100%;
    padding: ${props => (props.return ? `0 10rem 0 2rem` : `0 10rem`)};
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        width: 100%; // Ajusta a largura para telas menores
        padding: 0 2rem; // Ajusta o padding para telas menores
        flex-direction: column; // Ajusta a direção do flex para coluna em telas menores
    }

    h5 {
        font-family: Montserrat, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 1.5rem;
        color: #4F46BB;

        @media (max-width: 768px) {
            font-size: 1.2rem; // Reduz o tamanho da fonte para telas menores
        }
    }

    button {
        width: 12rem;
        height: 2rem;
        background: #4F46BB;
        border: none;
        border-radius: 2rem;

        display: flex;
        align-items: center;
        justify-content: space-around;

        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 1rem;
        color: #FFFFFF;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }

        @media (max-width: 768px) {
            width: 100%; // Ajusta a largura do botão para telas menores
            margin-top: 1rem; // Adiciona uma margem superior para separar o botão de outros elementos
        }
    }
`;

export const BoxReturn = styled.div`
    width: 8%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media (max-width: 768px) {
        width: 100%; // Ajusta a largura para telas menores
        justify-content: center; // Centraliza o conteúdo para telas menores
    }

    img {
        cursor: pointer;
    }
`;