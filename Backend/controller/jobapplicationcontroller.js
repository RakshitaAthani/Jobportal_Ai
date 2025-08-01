import jobsapplicationmodel from "../models/jobsapplication.js";
import jobmodel from "../models/jobsmodel.js";
import usermodel from "../models/usermodel.js";


export const applyjob=async(req,res)=>{
    try {
        const jobid=req.params.jobid;
        const userid=req.params.userid;

        if(!jobid || !userid){
            return res.status(400).json({error:"jobid or userid missing in params"})
        }

        //check with that userid user exist or not ,if not exist userid not  valid
        const user=await usermodel.findById(userid);
        if(!user){
            return res.status(404).json({error:"userid in valid"})
        }

        //check with that jobid job exist or not ,if not exist jobid not  valid
        const job=await jobmodel.findById(jobid);
        if(!job){
            return res.status(404).json({error:"jobid in valid"})
        }

        const newappliction=new jobsapplicationmodel({...req.body,jobid:jobid,userid:userid});
        await newappliction.save();
        return res.status(200).json({message:"job applied successfully",application:newappliction});
    } catch (error) {
        return res.status(500).json({error:'internal server error'+error.message});
    }
}

export const getapplicationsoflogineduser=async(req,res)=>{
    try {
        let userid=req.params.userid;
        if(!userid){
            return res.status(400).json({error:"userid missing in params"})
        }
        //check usedr exist db or not
        let user=await usermodel.findById(userid);
        if(!user){
            return res.status(404).json({error:"user not found"})
        }

        let applications=await jobsapplicationmodel.find({userid:userid}).populate('jobid').populate('userid');
        return res.status(200).json({message:"applications fetched successfully",applications:applications})
    } catch (error) {
        return res.status(500).json({error:'internal server error'+error.message});
    }
}
export const getapplicationofparticularjob=async(req,res)=>{
    try {
        let jobid=req.params.jobid;
        if(!jobid){
            return res.status(400).json({error:"jobid missing in params"})
        }
        let job=await jobmodel.findById(jobid)
        if(!job){
            return res.status(404).json({error:"job not found"})
        }
        const applications=await jobsapplicationmodel.find({jobid:jobid}).populate('jobid').populate('userid');
        return res.status(200).json({message:"applications fetched successfully",applications:applications})
    } catch (error) {
        return res.status(500).json({error:'internal server error'+error.message});
    }
}
export const updateapplication = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: 'Application ID is required' });
    }
    const updatedapplication = await jobsapplicationmodel.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated document
      runValidators: true // run schema validations
    });

    if (!updatedapplication) {
      return res.status(404).json({ error: 'Application not found, update failed' });
    }

    return res.status(200).json({
      message: 'Application updated successfully',
      application: updatedapplication
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
};
export const deleteapplication=async(req,res)=>{
   try {
     let id=req.params.id;
     if(!id){
         return res.status(400).json({error:'id is required'});
     }
     let deleteedapplication=await jobsapplicationmodel.findByIdAndDelete(id);
     if(!deleteedapplication){
        return res.status(404).json({error:"application not found deleted failed"})
     }
     return res.status(200).json({message:"application deleted successfully",deleteapplication:deleteedapplication})
   } catch (error){
return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
   } 
    