export default interface INetworkRequest {
    type: string;
    method: string;
    url: string;
    constructor (url: string, { method, type }: { method: string, type: string }): this;
    body(data: any): this;
    headers(data: Headers): this;
    setHeader(key: string, value: string): this;
    onReady(callback: (event: Event) => void): void;
    send(): Promise<any>;
    emit(event: string, data: any): void;
    on(event: string, callback: (data: any) => void): void;
}
