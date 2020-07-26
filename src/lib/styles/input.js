import styled from 'styled-components';

export const Input = styled.input`
    width: 100%;
    padding: 0.5rem 0.9rem;

    font-family: ${(props) => props.theme.adminFont};
    font-size: 0.95rem;
    font-weight: normal;

    outline: none;
    border: 1px solid #ddd;
    border-radius: 4px;
`;
