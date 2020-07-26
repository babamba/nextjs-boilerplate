import { action, observable } from 'mobx';
import { onGetPosts } from 'lib/api';

export const initialMainState = {
    posts : []
};

export default class MainStore {
    @observable posts = initialMainState.posts;

    hydrate(serializedStore) {}

    @action setPosts = (posts = []) => {
        this.posts = posts;
    }

    @action getPosts = async() => {
        const { status, data } = await onGetPosts();
        
        if(status === 200){
            this.posts = data;
        }
        return { status, data };
    }
}
