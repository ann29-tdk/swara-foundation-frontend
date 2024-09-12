import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: #fdf6f0;
    color: #000;
    padding: 5%;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    font-weight: 500;
    flex-direction: column;
    text-align: center;
`;

const Heading = styled.h3`
    font-size: 2rem;
    margin-bottom: 0.1rem;
`;

const EndingText = styled.p`
    margin: 4% 0;
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

const Icon = styled.i`
    font-size: 2rem;
    margin: 0.5rem;
`;

const CopyrightText = styled.p`
    margin-top: 2rem;
`;

export default function Footer() {
    return (
        <FooterContainer>
            <Heading>Together, We Create Impact</Heading>
            <EndingText>
                Follow us on Instagram and Facebook to keep updated on what's new and what's hot
            </EndingText>

            <IconContainer>
                <a href='https://www.facebook.com/profile.php?id=100068099547129' style={{textDecoration:'none', color:'black'}}><Icon className="fab fa-facebook" aria-hidden="true"></Icon></a>
                <Icon className="fab fa-instagram" aria-hidden="true"></Icon>
                <Icon className="fas fa-envelope" aria-hidden="true"></Icon>
            </IconContainer>
            <CopyrightText>© Copyright 2024 Swara Foundation</CopyrightText>
        </FooterContainer>
    );
}
