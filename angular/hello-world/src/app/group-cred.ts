export class GroupCred {
    public groupId : string
    public readPermi: boolean
    public writePermi: boolean
    public modifyPermi: boolean
    public predName: string
    constructor(){
        this.readPermi=false
        this.writePermi=false
        this.modifyPermi=false
    }
}
