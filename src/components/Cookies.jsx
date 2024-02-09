


import CookieConsent from 'react-cookie-consent'


export const Cookie = ()=>{

    return (
        <div>
                <CookieConsent

                    location='bottom'
                    buttonText="Accept All Cookies"
                    cookieName='myCookieConsent'
                    style={{background:'linear-gradient(140deg,cyan,aquamarine)', height:"150px", color:"black",boxShadow:"8px 8px black" ,width:"300px",left:"60px",top:"250px",borderRadius:"8px"}}
                    buttonStyle={{ color: "black", fontSize: "16px",boxShadow:"2px 2px black" ,borderRadius:"8px" }}
                    expires={150}
                    >
                    welcome cutie , Hope you are as Elegant as always
                </CookieConsent>
        </div>
    )
}
