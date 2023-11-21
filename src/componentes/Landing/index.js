import React from "react";
import { InfoContainer, InfoWrapper, InfoRow, Column1,
     TextWrapepr, TopLine, Heading, Subtitle, Column2, ImgWrap, Img } from "./landingElements";

import img from "../../images/reuniones.jpg"


const LandingPage = () => {
    return (
        <>
            <InfoContainer>
                <InfoWrapper>
                    <InfoRow>
                        <Column1>
                            <TextWrapepr>
                                <TopLine>TGP</TopLine>
                                <Heading >¡Gestionar las reuniones nunca fue más fácil!</Heading>
                                <Subtitle>
                                    Nos encargamos de tus reuniones. Las agendamos, gestionamos y nos aseguramos que se puedan realizar
                                </Subtitle>
                            </TextWrapepr>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                            <Img  src={img}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    ); 
}

export default LandingPage;