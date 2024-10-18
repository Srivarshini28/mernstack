const { default: Header } = require("./Header");

function Home(){
    return(
        <>
        <cenetr>
            <h1>This is home page!!!</h1>
        </cenetr>
        <Headers sample='ddd' currentPage='Home'></Headers>
        </>
    )
};


export default Home;