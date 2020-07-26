import React from 'react';
import * as styled from './styled';

export default function Layout({ children }) {
    return (
        <styled.LayoutWrapper>
            <styled.Layout>{children}</styled.Layout>
        </styled.LayoutWrapper>
    );
}
