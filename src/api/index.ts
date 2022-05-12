interface IMakeRequest {
    url?: string,
    method?: string,
    body?: any
}

class Api {
    URL: string;

    constructor(public baseUrl: string) {
        this.URL = baseUrl
    }

    public get<T>(url: string = ''): Promise<T> {
        url = this.URL + url
        return makeRequest({url})
    }

    public post<T>(url: string = '', body: any): Promise<T> {
        url = this.URL + url
        return makeRequest({url, body, method: 'post'})
    }
}

const makeRequest = <T>({url = '', method = 'get', body}: IMakeRequest): Promise<T> => {
    const token: string | null = localStorage.getItem('token')
    const headers = new Headers()

    const config: RequestInit = {
        method
    };

    if (token) headers.set('Authorization', token)

    if (body) {
        if (body.hasOwnProperty('email')) body.email = body.email.toLowerCase()
        if (body instanceof FormData) {
            config.body = JSON.stringify(body)
            headers.set('Content-Type', 'multipart/form-data');
        } else {
            headers.set('Content-Type', 'application/json')
            config.body = JSON.stringify(body)
        }
        config.body = body
    }
    config.headers = headers

    return fetch(<string>process.env.APP_URL + url, config)
        .then((response: Response) => response.json())
}

export default Api