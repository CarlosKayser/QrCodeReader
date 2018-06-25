export class Mensagem{

    public id: number;
    private frase: string;
    private sha1sum: string;
    private dataHora: Date;

    constructor(id: number = null, frase: string, sha1sum: string, dataHora: Date){
        this.id = id;
        this.frase = frase;
        this.sha1sum = sha1sum;
        this.dataHora = dataHora;
    }

    public getFrase(){
        return this.frase;
    }

    public getDatahora(){
        return this.dataHora;
    }

    public getSha1Sum(){
        return this.sha1sum;
    }

    public getId(){
        return this.id;
    }

    public setFrase(frase: string){
        this.frase = frase;
    }

    public setDatahora(dataHora: Date){
        this.dataHora = dataHora;
    }

    public setSha1Sum(sha1sum: string){
        this.sha1sum = sha1sum;
    }

}