import React from 'react';
import { inject, observer } from 'mobx-react';

import { 
    Helmet,
    PostList
} from 'components';
import { defaultHelmet as helmet } from 'config';

function IndexContainer({ store : { mainStore }}) {
    const { posts = [] } = mainStore;

    return (
        <>
            <Helmet helmet={helmet}/>
            <PostList posts={posts || []}/>
        </>
    );
}

export default inject('store')(observer(IndexContainer));
