interface IConfigureRequest {
    url?: string,
    method?: string,
    body?: any
}

class Api {
    private readonly URL: string;

    constructor(private baseUrl: string) {
        this.URL = baseUrl
    }

    public get<T>(url: string = ''): Promise<T> {
        return this.configureRequest({url})
    }

    public post<T>(url: string = '', body: any): Promise<T> {
        return this.configureRequest({url, body, method: 'post'})
    }

    private configureRequest<T>({url = '', method = 'get', body}: IConfigureRequest): Promise<T> {
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
        url = process.env.APP_URL + this.URL + url
        return fetch(<string>url, config)
            .then((response: Response) => response.json())
    }
}

export default Api