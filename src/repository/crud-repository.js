class CrudRepository{
    constructor(model){
        this.model=model;
    }
    async create(data){
        try{
            console.log("crud repository ",data);
            const result= await this.model.create(data);
            return result;
        }catch(error){
            console.log("Something went wrong in the crud repo",error);
            throw error;
        }
    }
    async destroy(id){
        try{
            const result= await this.model.findByIdAndRemove(id);
            return result;
        }catch(error){
            console.log("Something went wrong in the crud repo",error);
            throw error;
        }
    }
    async get(id){
        try{
            console.log("hiii");
            const result= await this.model.findById(id);
            console.log("hvresult== ",result);
            return result;
        }catch(error){
            console.log("Something went wrong in the crud repo",error);
            throw error;
        }
    }
    async getAll(){
        try{
            const result= await this.model.find({});
            return result;
        }catch(error){
            console.log("Something went wrong in the crud repo");
            throw error;
        }
    }
    async update(id,data){
        try{
            const result= await this.model.findByIdAndUpdate(id,data,{new:true});
            return result;
        }catch(error){
            console.log("Something went wrong in the crud repo");
            throw error;
        }
    }
}

export default CrudRepository;