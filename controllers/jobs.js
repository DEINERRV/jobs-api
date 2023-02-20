const Job = require("../models/Job");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors");

const getAllJobs = async (req,res)=>{
    const jobs = await Job.find({createdBy: req.user.id})
    res.status(StatusCodes.OK).json({jobs, count: jobs.length});
}

const getJob = async (req,res)=>{
    const job = await Job.findOne({_id: req.params.id, createdBy: req.user.id})
    if(!job)
        throw new NotFoundError(`No job with id ${req.params.id}`)
    
    res.status(StatusCodes.OK).json(job)
}

const createJob = async (req,res)=>{
    req.body.createdBy = req.user.id
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
}

const updateJob = async (req,res)=>{
    const {company,position} = req.body
    if(!company || !position || company=="" || position=="")
        throw new BadRequestError("Company and Position fields can not be empty")

    req.body.createdBy = req.user.id
    const job = await Job.findOneAndUpdate({_id: req.params.id, createdBy: req.user.id},req.body,{
        new: true,
        runValidators: true
    })
    
    if(!job)
        throw new NotFoundError(`No job with id ${req.params.id}`)

    res.status(StatusCodes.OK).json(job)
}

const deleteJob = async (req,res)=>{
    const job = await Job.findOneAndDelete({_id: req.params.id, createdBy: req.user.id})
    if(!job)
        throw new NotFoundError(`No job with id ${req.params.id}`)

    res.status(StatusCodes.OK).json(job)
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}