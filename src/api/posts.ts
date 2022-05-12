import Api from './index'

class PostApi extends Api {
    constructor() {
        super('/posts')
    }

    getPosts() {
        this.get()
            .then(res => {
                console.log(res)
            })
            .catch(e=>{
                console.log(e)
            })
    }
}

const postApi = new PostApi()

export default postApi