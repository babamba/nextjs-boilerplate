import { onRequestGet } from './request';

export const onGetPosts = async() => {
    const url = "/posts";
    const { status, data } = await onRequestGet({ url });

    return { status, data };
}