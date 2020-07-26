import React, { useMemo, useEffect } from 'react';

// mobx
import { Provider } from 'mobx-react';
import RootStore from 'stores';

// components
import { Layout } from 'components';

export default function App({ Component, pageProps }) {
    const store = useMemo(() => {
        return new RootStore();
    }, []);

    useEffect(() => {
        const { initialState } = pageProps;
        if (initialState) {
            store.hydrate(initialState);
        }
    }, [store, pageProps]);

    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}
