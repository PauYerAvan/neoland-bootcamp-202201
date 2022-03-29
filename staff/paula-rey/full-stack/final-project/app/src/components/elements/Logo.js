import logo from '../../assets/logo.png'

export function Logo({className=''}) {
    
    return <>
    <figure className = {`logo ${className}`}>
        <img src={logo} alt="logo"/>
    </figure>
    </>

}

// .logo
//     display: flex
//     flex-direction: row
//     width: 10px