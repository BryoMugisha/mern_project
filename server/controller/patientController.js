import express from "express";
import { PatientModel } from "../models/Patient.js";

const createPatient = async (req, res) => {
    const { name, email, phone, bmi } = req.body;

    try {
        const newPatient = new PatientModel({
            name,
            email,
            phone,
            bmi,
            postedBy: req.user._id,
        });

        const result = await newPatient.save();
        return res.status(201).json({ success: true, ...result._doc });
    }   
    catch (err) {
        return res.status(500).json(err.message);
    }
   
};

const getPatients = async (req, res) => {
    try {
        const patients = await PatientModel.find({postedBy: req.user._id})
        return res.status(200). json({success: true, patients})
    }  
    catch(err){
        return res.status(500).json({error: err.message})
    }     
}

const getPatient = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(401).json({error: "No Id specified"})
    }
    try {
        const patients = await PatientModel.findOne({_id: id})
        return res.status(200). json({success: true, ...patients._doc})
    }  
    catch(err){
        return res.status(500).json({error: err.message})
    }        
}

const updatePatient = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(401).json({error: "No Id specified"})
    }
    try {
        const result = await PatientModel.findByIdAndUpdate({_id: id}, {...req.body}, {new: true})
        return res.status(200).json({success: true, ...result._doc})
    }  
    catch(err) {
        return res.status(500).json({error: err.message})
    }        
}

const deletePatient = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(401).json({error: "No Id specified"})
    }
    try {
        const patient = await PatientModel.findOne({_id: id})
        if(!patient) {
            return res.status(401). json({error: "No Record Existed"})
        }
        const deleteRecord = await PatientModel.findByIdAndDelete({_id: id})
        const patients = await PatientModel.find({postedBy: req.user._id})
        return res.status(200). json({success: true, patients})
    }  
    catch(err) {
        return res.status(500).json({error: err.message})
    }        
}

export {createPatient, getPatients, getPatient, updatePatient, deletePatient}