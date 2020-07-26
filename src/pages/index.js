import React from 'react';
import { inject, observer } from 'mobx-react';
import { onGetPosts } from 'lib/api';

// helmet
import { Helmet } from 'components';
import { defaultHelmet as helmet } from 'config';

// container
import IndexContainer from 'container/index';

function IndexPage({ status, data, store : { mainStore }}) {
    React.useMemo(()=>{
        if(status === 200){
            mainStore.setPosts(data);
        }
    }, [])

    return (
        <>
            <Helmet helmet={helmet} />
            <IndexContainer />
        </>
    );
}

// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export async function getServerSideProps({ query }) {
    const { status, data } = await onGetPosts();

    return {
        props: { 
            status,
            data
        }
    }
}

export default inject('store')(observer(IndexPage));
