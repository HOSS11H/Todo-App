const { default: styled } = require("styled-components");

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top:20%;
    @media (min-width: 768px) {
        min-height: 100vh;
        padding-top: 0;
    }
`

export default Layout;