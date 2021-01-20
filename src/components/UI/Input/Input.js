const { default: styled } = require("styled-components");

const Input = styled.input`
    color: #000;
    font-size: 18px;
    font-weight: 400;
    outline:none;
    border: 0;
    border-bottom: 1px solid #333;
    background: transparent;
    padding: 10px 0 10px 20px;
    position: relative;
    border-radius: 2px;
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    
`;
export default Input;