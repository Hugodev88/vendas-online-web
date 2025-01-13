import styled from 'styled-components';

export const ContainerTooltip = styled.div`
    position: relative;

    &:hover div {
        visibility: visible;
        opacity: 1;
    }
`;

export const ContainerExternal = styled.div`
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: -36px;
    padding: 4px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
`;
