const { default: styled } = require("styled-components");

const Wrapper = styled.div`
    width: 350px;
    padding: 15px;
    margin: 10px 0 ;
    border-radius :8px;
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;
    align-items: center;
    position: relative;
    &:: before {
        content: '';
        position: absolute;
        width: 10px;
        height: 20px;
        background-color: red;
        top: 0;
        left: 0;
        display: ${props => props.importance === 'necessary' ? 'block' : 'none' }
    }
    box-shadow: #00000047 0px 0px 9px 2px;
    @media (max-width: 600px) {
        width: auto
    }
`
export default Wrapper;