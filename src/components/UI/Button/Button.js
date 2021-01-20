const { default: styled } = require("styled-components");

const Button = styled.button`
    padding: 10px;
    background-color: ${props => props.primary ? '#206fe1' : '#e91e63'};
    color: #fff;
    border: 0;
    margin: 0 10px;
    outline: none;
    transition: 0.3s ease-in-out;
    border-radius: 8px;
    &:hover {
        background-color: ${props => props.primary ? '#20a4e1' : '#ff0057'};
        cursor: pointer;
    }
    @media (max-width: 600px) {
        margin: 0 5px;
    }
`;
export default Button;