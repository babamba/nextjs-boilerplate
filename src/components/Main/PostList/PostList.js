import React from 'react';
import * as styled from './styled';

export default function PostList({ posts = [] }){
    const postList = posts.map((post)=>{
        return <PostItem key={post.id} post={post}/>;
    });

    return <styled.PostList>{postList}</styled.PostList>;
}

export function PostItem({ post = null }){
    return(
        <styled.PostItem>
            {post.title && <styled.Title>{post.title}</styled.Title>}
        </styled.PostItem>
    )
}