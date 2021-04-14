import styled from '@emotion/styled';

export const Formulario = styled.form`
    max-width:600px;
    width:95%;
    margin: 5rem auto 0 auto;
`;

export const Campo = styled.div`
    margin-bottom:2rem;
    display:flex;
    align-items:center;

    label{
        flex: 0 0 150px; // el primer 0 dice si va a crecer o no, el segundo si se va a encojer y el 150px le da el width en flexbox
        font-size:1.8rem
    }

    input{
        flex: 1; //Toma todo el espacio disponible restante de lo que toma el label(150px)
        padding:1rem;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width:100%;
    padding:1.5rem;
    text-align:center;
    color:#FFF;
    font-size:1.8rem;
    text-transform:uppercase;
    border:none;
    font-family:"Pt Sans", sans-serif;
    font-weight:700;

    &:hover{
        cursor:pointer;
    }
`;

export const Error = styled.p`
    background-color:red;
    padding:1rem;
    font-family:'Pt Sans', sans-serif;
    font-weight:700;
    font-size:1.4rem;
    color:#FFF;
    text-align:center;
    text-transform:uppercase;
    margin:2rem 0;
`;