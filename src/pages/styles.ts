import styled from 'styled-components';

export const ContainerHome = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 2rem;

    @media (max-width: 768px) {
        padding-top: 1rem;
    }
`;

export const ContentHome = styled.div`
    width: 80%;
    height: 8rem;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 3.4rem;

    @media (max-width: 768px) {
        width: 90%;
        padding: 1rem 2rem;
        flex-direction: column;
    }
`;

export const BoxNameEnterprise = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;

    span {
        font-family: Inter, sans-serif;
        font-weight: 700;
        font-size: 1.3rem;
        color: #302E45;
        margin-right: 1.2rem;

        @media (max-width: 768px) {
            font-size: 1rem;
        }
    }

    img {
        cursor: pointer;
        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.8);
        }

        & + img {
            margin-left: 0.75rem;
        }
    }
`;

export const ContentLupa = styled.div`
    width: 80%;
    height: 2.5rem;
    border-bottom: 2px solid #BBB8D9;

    input {
        border: none;
        width: 90%;
        height: 100%;
        margin-left: 5px;
        right: 0;

        @media (max-width: 768px) {
            width: 100%;
            margin-left: 0;
        }
    }

    div {
        height: 100%;
        display: flex;
        align-items: flex-end;
        cursor: pointer;

        img {
            margin-right: 1.4rem;
        }

        p {
            font-family: Inter, sans-serif;
            font-weight: 400;
            font-size: 1rem;
            color: #302E45;

            @media (max-width: 768px) {
                font-size: 0.8rem;
            }
        }
    }
`;

export const ContentStatus = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25px;
        width: fit-content;
        padding: 5px 15px;
        border: 1px solid #BBB8D9;
        border-radius: 25px;

        font-family: Inter, sans-serif;
        font-weight: 400;
        font-size: 0.8rem;
        color: #302E45;

        @media (max-width: 768px) {
            font-size: 0.7rem;
            padding: 3px 10px;
        }

        & + div {
            margin-left: 15px;
        }
    }
`;

export const ContentIcons = styled.div`
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const ContainerLupa = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }
`;
