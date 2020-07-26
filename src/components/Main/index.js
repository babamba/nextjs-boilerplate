import dynamic from 'next/dynamic';

export const PostList = dynamic(()=>import('./PostList'));