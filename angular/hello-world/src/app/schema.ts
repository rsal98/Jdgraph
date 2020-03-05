export class Schema {
    predicate: string;
        attrtype: string;
        list: boolean;
        count: boolean;
        index: boolean;
        upsert: boolean;
        reverse: boolean;
        daytimevalue: string;
        lang: boolean;
        stringindexval: string;
        fulltext: boolean;
        trigram: boolean
    
        constructor(){
                this.list=false;
                this.count=false;
                this.index=false;
                this.upsert=false;
                this.reverse=false;
                this.lang=false;
                this.fulltext=false;
                this.trigram=false;
                this.attrtype="none"; 
        }
}
